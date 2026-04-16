type Props = {
  data: any;
};

export default function Preview({ data }: Props) {
  const landing = data?.landing ?? {};
  const headline = landing.headline ?? "";
  const subheadline = landing.subheadline ?? "";
  const benefits: string[] = Array.isArray(landing.benefits) ? landing.benefits : [];
  const cta = landing.cta ?? "";

  const testimonials: Array<{ name?: string; review?: string }> = Array.isArray(
    data?.testimonials,
  )
    ? data.testimonials
    : [];

  return (
    <div className="bg-white text-black rounded-2xl overflow-hidden">
      <div className="p-10 text-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <h1 className="text-3xl font-bold mb-2">{headline}</h1>
        <p className="mb-4">{subheadline}</p>
        <button className="bg-white text-black px-6 py-2 rounded-full">
          {cta}
        </button>
      </div>

      <div className="p-8 grid md:grid-cols-3 gap-4">
        {benefits.map((b: string, i: number) => (
          <div key={i} className="p-4 border rounded-lg">
            <p className="font-medium">{b}</p>
          </div>
        ))}
      </div>

      <div className="p-8 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-center">What Users Say</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t, i: number) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow">
              <p className="mb-2">"{t.review}"</p>
              <p className="text-sm text-gray-500">- {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

