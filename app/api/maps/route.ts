import { NextResponse } from "next/server";

export const runtime = "nodejs";

type MapsRequestBody = {
  mapsUrl?: unknown;
};

type PlaceDetails = {
  place_id: string;
  name?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: Array<{
    author_name?: string;
    rating?: number;
    text?: string;
    relative_time_description?: string;
  }>;
  formatted_address?: string;
  website?: string;
};

function extractPlaceId(mapsUrl: string) {
  try {
    const parsed = new URL(mapsUrl);
    const directId = parsed.searchParams.get("place_id");
    if (directId) {
      return directId.trim();
    }

    return "";
  } catch {
    return "";
  }
}

function extractSearchQuery(mapsUrl: string) {
  try {
    const parsed = new URL(mapsUrl);
    const urlText = `${parsed.pathname} ${parsed.search} ${parsed.hash}`.toLowerCase();

    const placeMatch = parsed.pathname.match(/\/place\/([^/]+)/i);
    if (placeMatch?.[1]) {
      return decodeURIComponent(placeMatch[1]).replace(/\+/g, " ");
    }

    const q = parsed.searchParams.get("q") || parsed.searchParams.get("query");
    if (q) return q.trim();

    if (urlText.includes("place")) {
      return decodeURIComponent(parsed.pathname.split("/place/")[1] || "").replace(/\+/g, " ");
    }

    return "";
  } catch {
    return "";
  }
}

async function resolveMapsUrl(mapsUrl: string) {
  try {
    const response = await fetch(mapsUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });

    return response.url || mapsUrl;
  } catch {
    return mapsUrl;
  }
}

async function googleFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  const json = (await res.json().catch(() => null)) as T | null;

  if (!res.ok) {
    throw new Error(typeof json === "object" && json && "error_message" in json
      ? String((json as Record<string, unknown>).error_message || "Google Places request failed")
      : "Google Places request failed");
  }

  return json as T;
}

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_API_KEY (set it in .env.local)" },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => null)) as MapsRequestBody | null;
  const mapsUrl = typeof body?.mapsUrl === "string" ? body.mapsUrl.trim() : "";

  if (!mapsUrl) {
    return NextResponse.json(
      { error: "Please provide a Google Maps URL." },
      { status: 400 },
    );
  }

  try {
    const resolvedUrl = await resolveMapsUrl(mapsUrl);
    const query = extractSearchQuery(resolvedUrl);
    const placeId = extractPlaceId(resolvedUrl);

    if (!query && !placeId) {
      return NextResponse.json(
        { error: "Could not read a place name from the Google Maps URL." },
        { status: 400 },
      );
    }

    let place: PlaceDetails | undefined;

    if (placeId) {
      try {
        const detailsUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
        detailsUrl.searchParams.set("place_id", placeId);
        detailsUrl.searchParams.set("fields", "place_id,name,rating,user_ratings_total,reviews,formatted_address,website");
        detailsUrl.searchParams.set("key", apiKey);

        const details = await googleFetch<{
          status?: string;
          result?: PlaceDetails;
          error_message?: string;
        }>(detailsUrl.toString());

        place = details.result;
      } catch {
        place = undefined;
      }
    }

    if (!place && query) {
      const findPlaceUrl = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
      findPlaceUrl.searchParams.set("input", query);
      findPlaceUrl.searchParams.set("inputtype", "textquery");
      findPlaceUrl.searchParams.set("fields", "place_id,name,rating,user_ratings_total,formatted_address,website");
      findPlaceUrl.searchParams.set("key", apiKey);

      const findPlace = await googleFetch<{
        status?: string;
        candidates?: PlaceDetails[];
        error_message?: string;
      }>(findPlaceUrl.toString());

      place = findPlace.candidates?.[0];

      if (!place?.place_id) {
        const textSearchUrl = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
        textSearchUrl.searchParams.set("query", query);
        textSearchUrl.searchParams.set("key", apiKey);

        const textSearch = await googleFetch<{
          status?: string;
          results?: PlaceDetails[];
          error_message?: string;
        }>(textSearchUrl.toString());

        place = textSearch.results?.[0];
      }
    }

    if (!place?.place_id) {
      return NextResponse.json(
        { error: "No place found for that Google Maps link." },
        { status: 404 },
      );
    }

    const detailsUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    detailsUrl.searchParams.set("place_id", place.place_id);
    detailsUrl.searchParams.set("fields", "name,rating,user_ratings_total,reviews,formatted_address,website");
    detailsUrl.searchParams.set("key", apiKey);

    const details = await googleFetch<{
      status?: string;
      result?: PlaceDetails;
      error_message?: string;
    }>(detailsUrl.toString());

    const result = details.result;
    const reviews = Array.isArray(result?.reviews) ? result.reviews : [];

    return NextResponse.json({
      place: {
        name: result?.name || place.name || query,
        rating: result?.rating ?? place.rating ?? null,
        userRatingsTotal: result?.user_ratings_total ?? place.user_ratings_total ?? null,
        formattedAddress: result?.formatted_address ?? null,
        website: result?.website ?? null,
      },
      reviews: reviews.map((review) => ({
        name: review.author_name || "Google User",
        review: review.text || "",
        rating: review.rating ?? 0,
        time: review.relative_time_description || "",
      })),
      source: "google-maps",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch Google Maps data.";
    return NextResponse.json(
      { error: message },
      { status: 502 },
    );
  }
}
