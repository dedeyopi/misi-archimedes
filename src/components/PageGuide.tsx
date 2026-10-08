export default function PageGuide({ title, lines, ico = '🧭' }: {
  title: string;
  lines: string[] | string;
  ico?: string;
}) {
  return (
    <div className="guide">
      <div className="ico">{ico}</div>
      <div>
        <h4>{title}</h4>
        {Array.isArray(lines)
          ? <ul>{lines.map((l, i) => <li key={i} dangerouslySetInnerHTML={{ __html: l }} />)}</ul>
          : <p>{lines}</p>}
      </div>
    </div>
  );
}