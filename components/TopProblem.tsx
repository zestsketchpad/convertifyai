export default function TopProblem({ data }: any) {
  return (
    <div className="bg-red-900/40 p-6 rounded-xl shadow mt-6 border border-red-700">
      <h2 className="text-xl font-bold mb-2">🔥 Biggest Issue</h2>

      <p className="text-lg">
        {data?.topProblem || "No major issue detected"}
      </p>

      <div className="mt-4">
        <h3 className="text-green-400 font-semibold">💡 Recommendation</h3>
        <p>
          {data?.recommendation || "No recommendation available"}
        </p>
      </div>
    </div>
  );
}