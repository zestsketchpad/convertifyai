import { AIData } from "@/types";

type Props = {
  data?: AIData;
};

export default function Preview({ data }: Props) {
  const headline = data?.headline ?? "Your Headline";
  const subheadline = data?.subheadline ?? "Your subheadline";
  const benefits = data?.benefits ?? [];
  const painPoints = data?.painPoints ?? [];
  const transformedPain = data?.transformedPain ?? [];
  const testimonials = data?.testimonials ?? [];
  const cta = data?.cta ?? "Get Started";

  return (
    <div className="mt-10 space-y-16">

      {/* HERO */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-700 to-blue-600 rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {headline}
        </h1>

        <p className="text-gray-200">{subheadline}</p>

        <button className="mt-6 px-6 py-3 bg-black rounded">
          {cta}
        </button>
      </section>

      {/* BENEFITS */}
      <section>
        <h2 className="text-2xl mb-6">Why Choose Us</h2>

        {benefits.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-gray-900 p-6 rounded hover:scale-105 transition"
              >
                {b}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No benefits available</p>
        )}
      </section>

      {/* PAIN → SOLUTION */}
      <section>
        <h2 className="text-2xl mb-6">We Fixed What You Hate</h2>

        {painPoints.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((p, i) => (
              <div key={i} className="bg-gray-900 p-6 rounded">
                <p className="text-red-400">❌ {p}</p>
                <p className="text-green-400 mt-2">
                  ✅ {transformedPain[i] ?? "Improved solution"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No issues found</p>
        )}
      </section>

      {/* TESTIMONIALS */}
      <section>
        <h2 className="text-2xl mb-6">What Users Say</h2>

        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-900 p-6 rounded italic"
              >
                "{t}"
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No testimonials available</p>
        )}
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-purple-700 rounded-xl">
        <h2 className="text-2xl mb-4">Ready to Transform?</h2>

        <button className="px-8 py-3 bg-black rounded">
          {cta}
        </button>
      </section>

    </div>
  );
}