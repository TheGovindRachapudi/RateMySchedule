import { CalendarDays, LoaderCircle } from "lucide-react";

export default function ExportButton({ onExport, loading }) {
  return (
    <button type="button" className="hero-primary-cta export-button" onClick={onExport} disabled={loading}>
      {loading ? <LoaderCircle size={18} className="spin" /> : <CalendarDays size={18} />}
      {loading ? "Exporting..." : "Export to Calendar"}
    </button>
  );
}