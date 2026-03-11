export default function ExportSuccess({ result }) {
  return (
    <section className="export-success panel-card">
      <p className="eyebrow">Export status</p>
      <h3>Calendar file downloaded</h3>
      <p>{result.message}</p>
      <div className="success-metrics">
        <span>{result.eventCount} recurring events in {result.filename}</span>
        <a href={result.deepLink} target="_blank" rel="noreferrer">Open Google Calendar import</a>
      </div>
      <p className="export-preview">{result.preview}</p>
    </section>
  );
}