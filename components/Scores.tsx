type Props = {
  data: any;
};

function clampScore(value: unknown) {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function Scores({ data }: Props) {
  const scores = data?.scores ?? {};
  const conversion = clampScore(scores.conversion);
  const clarity = clampScore(scores.clarity);
  const emotion = clampScore(scores.emotion);

  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
      <h2 className="text-xl font-semibold mb-4">Performance Score</h2>

      <div className="space-y-4">
        <Bar label="Conversion" value={conversion} />
        <Bar label="Clarity" value={clarity} />
        <Bar label="Emotion" value={emotion} />
      </div>
    </div>
  );
}

