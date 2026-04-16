type Props = {
  data: any;
};

export default function TopProblem({ data }: Props) {
  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
      <h2 className="text-xl font-semibold mb-4">Biggest Conversion Insight</h2>

      <div className="mb-4">
        <p className="text-red-400 font-medium">Problem</p>
        <p className="text-lg">{data?.topProblem}</p>
      </div>

      <div>
        <p className="text-green-400 font-medium">Recommendation</p>
        <p className="text-lg">{data?.recommendation}</p>
      </div>
    </div>
  );
}

