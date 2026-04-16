type Props = {
  data: any;
};

export default function Insights({ data }: Props) {
  const painPoints: string[] = Array.isArray(data?.painPoints) ? data.painPoints : [];
  const benefits: string[] = Array.isArray(data?.benefits) ? data.benefits : [];
  const keywords: string[] = Array.isArray(data?.keywords) ? data.keywords : [];

  return (
    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(168,85,247,0.08)] hover:scale-[1.02] transition duration-300">
      <h2 className="text-xl font-semibold mb-4">What Users Are Saying</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-medium mb-2 text-red-400">Pain Points</h3>
          {painPoints.length === 0 ? (
            <p className="text-sm text-gray-400">No major issues</p>
          ) : (
            <div className="space-y-1">
              {painPoints.map((p: string, i: number) => (
                <p key={i}>
                  {"\u2022"} {p}
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2 text-green-400">Benefits</h3>
          {benefits.length === 0 ? (
            <p className="text-sm text-gray-400">No data available</p>
          ) : (
            <div className="space-y-1">
              {benefits.map((b: string, i: number) => (
                <p key={i}>
                  {"\u2022"} {b}
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2 text-blue-400">Keywords</h3>
          {keywords.length === 0 ? (
            <p className="text-sm text-gray-400">No data available</p>
          ) : (
            <div className="space-y-1">
              {keywords.map((k: string, i: number) => (
                <p key={i}>
                  {"\u2022"} {k}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
