import type { GeneratedPayload } from "@/lib/generated";

type Props = {
  data: GeneratedPayload | null;
};

function clampScore(value: unknown, fallback = 50) {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return fallback;
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
          className="bg-linear-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function Scores({ data }: Props) {
  const conversion = clampScore(data?.scores?.conversion, 50);
  const clarity = clampScore(data?.scores?.clarity, 50);
  const emotion = clampScore(data?.scores?.emotion, 50);

  return (
    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_25px_rgba(168,85,247,0.08)] hover:scale-[1.02] transition duration-300">
      <h2 className="text-xl font-semibold mb-4">Performance Score</h2>

      <div className="space-y-4">
        <Bar label="Conversion" value={conversion} />
        <Bar label="Clarity" value={clarity} />
        <Bar label="Emotion" value={emotion} />
      </div>
    </div>
  );
}
