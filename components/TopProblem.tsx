type Props = {
  data: any;
};

export default function TopProblem({ data }: Props) {
  const topProblem =
    typeof data?.topProblem === "string" && data.topProblem.trim()
      ? data.topProblem
      : "No major issues found";

  const recommendation =
    typeof data?.recommendation === "string" && data.recommendation.trim()
      ? data.recommendation
      : "No recommendation available.";

  return (
    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(168,85,247,0.08)] hover:scale-[1.02] transition duration-300">
      <h2 className="text-xl font-semibold mb-4">Biggest Conversion Blocker</h2>

      <div className="mb-4">
        <p className="text-red-400 font-medium">Problem</p>
        <p className="text-lg">{topProblem}</p>
      </div>

      <div>
        <h3 className="text-sm text-gray-400 mb-2">How to Fix It</h3>
        <p className="text-green-400 font-medium">Recommendation</p>
        <p className="text-lg">{recommendation}</p>
      </div>
    </div>
  );
}
