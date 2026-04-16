type Props = {
  data: any;
};

export default function Insights({ data }: Props) {
  const painPoints: string[] = Array.isArray(data?.painPoints) ? data.painPoints : [];
  const benefits: string[] = Array.isArray(data?.benefits) ? data.benefits : [];
  const keywords: string[] = Array.isArray(data?.keywords) ? data.keywords : [];

  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
      <h2 className="text-xl font-semibold mb-4">User Insights</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-medium mb-2 text-red-400">Pain Points</h3>
          {painPoints.length === 0 ? (
            <p className="text-sm text-gray-400">No major issues</p>
          ) : (
            <div className="space-y-1">
              {painPoints.map((p: string, i: number) => (
                <p key={i}>• {p}</p>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2 text-green-400">Benefits</h3>
          <div className="space-y-1">
            {benefits.map((b: string, i: number) => (
              <p key={i}>• {b}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2 text-blue-400">Keywords</h3>
          <div className="space-y-1">
            {keywords.map((k: string, i: number) => (
              <p key={i}>• {k}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

