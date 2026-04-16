export default function Insights({ data }: any) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold mb-4">📊 Insights</h2>

      {/* Pain Points */}
      <div className="mb-4">
        <h3 className="text-red-400 font-semibold mb-2">Pain Points</h3>
        {data?.painPoints?.length ? (
          data.painPoints.map((p: string, i: number) => (
            <p key={i}>❌ {p}</p>
          ))
        ) : (
          <p className="text-gray-500">No pain points found</p>
        )}
      </div>

      {/* Benefits */}
      <div className="mb-4">
        <h3 className="text-green-400 font-semibold mb-2">Benefits</h3>
        {data?.benefits?.length ? (
          data.benefits.map((b: string, i: number) => (
            <p key={i}>✅ {b}</p>
          ))
        ) : (
          <p className="text-gray-500">No benefits found</p>
        )}
      </div>

      {/* Keywords */}
      <div>
        <h3 className="text-blue-400 font-semibold mb-2">Keywords</h3>
        {data?.keywords?.length ? (
          <p>{data.keywords.join(", ")}</p>
        ) : (
          <p className="text-gray-500">No keywords</p>
        )}
      </div>
    </div>
  );
}