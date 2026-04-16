type Props = {
  data: any;
};

export default function Preview({ data }: Props) {
  const landing = data?.landing ?? {};
  const headline = landing.headline ?? "";
  const subheadline = landing.subheadline ?? "";
  const benefits: string[] = Array.isArray(landing.benefits) ? landing.benefits : [];
  const cta = landing.cta ?? "";

  const rawTestimonials: Array<{ name?: unknown; review?: unknown }> = Array.isArray(
    data?.testimonials,
  )
    ? data.testimonials
    : [];

  const testimonials = rawTestimonials
    .map((t) => ({
      name:
        typeof t?.name === "string" && t.name.trim() ? t.name.trim() : "Anonymous",
      review: typeof t?.review === "string" ? t.review.trim() : "",
    }))
    .filter((t) => t.review.length > 0);

  return (
    <div className="bg-white text-black rounded-2xl overflow-hidden">
      <div className="p-12 text-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-500 text-white">
        <h1 className="text-4xl font-bold mb-3">{headline}</h1>
        <p className="mb-6 opacity-90">{subheadline}</p>

        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
          {cta}
        </button>
      </div>

      <div className="p-8 grid md:grid-cols-3 gap-4">
        {benefits.length === 0 ? (
          <div className="md:col-span-3 p-5 border border-gray-200 rounded-xl bg-white/60">
            <p className="text-gray-600 text-center">No benefits generated</p>
          </div>
        ) : (
          benefits.map((b: string, i: number) => (
            <div
              key={i}
              className="p-5 border border-gray-200 rounded-xl hover:scale-105 transition shadow-sm"
            >
              <p className="font-medium">{b}</p>
            </div>
          ))
        )}
      </div>

      <div className="p-8 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-center">What Users Say</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.length === 0 ? (
            <div className="md:col-span-2 p-5 bg-white rounded-xl shadow-md">
              <p className="text-gray-600 text-center">No testimonials generated</p>
            </div>
          ) : (
            testimonials.map((t, i: number) => (
              <div
                key={i}
                className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition"
              >
                <p className="mb-2">"{t.review}"</p>
                <p className="text-sm text-gray-500">- {t.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
