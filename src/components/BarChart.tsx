const fmt = (n: number, d = 2) => Number(n).toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function BarChart({ data, color = '#0ea5e9' }: {
  data: { label: string; value: number }[];
  color?: string;
}) {
  const W = 600, H = 260;
  const pad = { l: 56, r: 20, t: 24, b: 46 };
  const max = Math.max(...data.map(d => d.value), 1);
  const plotW = W - pad.l - pad.r, plotH = H - pad.t - pad.b;
  const bw = plotW / data.length;

  const grid = [], bars = [], labels: JSX.Element[] = [];
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + plotH * (1 - i / 4);
    const val = max * i / 4;
    grid.push(<line key={`g${i}`} x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="#e2e8f0" strokeWidth="1" />);
    grid.push(<text key={`gt${i}`} x={pad.l - 9} y={y + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#94a3b8">{val.toFixed(1)}</text>);
  }
  data.forEach((d, i) => {
    const h = (d.value / max) * plotH;
    const x = pad.l + i * bw + bw * 0.22;
    const y = pad.t + plotH - h;
    bars.push(<rect key={`b${i}`} x={x} y={y} width={bw * 0.56} height={Math.max(h, 1)} rx="7" fill={color} />);
    bars.push(<text key={`bt${i}`} x={x + bw * 0.28} y={y - 7} textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">{fmt(d.value, 1)}</text>);
    labels.push(<text key={`l${i}`} x={pad.l + i * bw + bw / 2} y={H - pad.b + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">{d.label}</text>);
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }} role="img" aria-label="Grafik batang">
      {grid}{bars}{labels}
      <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="12" fontWeight="800" fill="#94a3b8">Percobaan ke-</text>
      <text x="14" y={pad.t + plotH / 2} textAnchor="middle" fontSize="12" fontWeight="800" fill="#94a3b8"
        transform={`rotate(-90 14 ${pad.t + plotH / 2})`}>Nilai</text>
    </svg>
  );
}