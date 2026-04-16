import { AIData } from "@/types";

type Props = {
  data?: AIData;
};

export default function Scores({ data }: Props) {
  const scores = data?.scores ?? {};

  const entries: [string, number][] = [
    ["conversion", scores.conversion ?? 0],
    ["clarity", scores.clarity ?? 0],
    ["emotion", scores.emotion ?? 0],
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-xl mt-6">
      <h2 className="text-xl font-bold mb-4">📈 Scores</h2>

      {entries.map(([key, value]) => (
        <div key={key} className="mb-4">
          <p className="capitalize mb-1">
            {key}: {value}%
          </p>

          <div className="w-full bg-gray-800 h-3 rounded">
            <div
              className="bg-purple-500 h-3 rounded"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}