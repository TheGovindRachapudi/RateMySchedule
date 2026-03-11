import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { formatPercent } from "../utils/formatting";

export default function RegistrationSheet({ items, scheduleName }) {
  const [copied, setCopied] = useState(false);

  async function copyNumbers() {
    await navigator.clipboard.writeText(items.map((item) => item.unique).join("\n"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function copyRichText() {
    const text = items
      .map((item) => `${item.order}. ${item.unique} ${item.courseId} (${item.fillPercent}% full - ${item.note})`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="sheet-card panel-card">
      <div className="panel-heading">
        <div>
          <p className="landing-eyebrow">Registration helper</p>
          <h3>{scheduleName} cheat sheet</h3>
        </div>
      </div>

      <div className="sheet-list">
        {items.map((item) => (
          <div key={item.unique} className="sheet-row">
            <strong>{item.order}. {item.unique}</strong>
            <span>{item.courseId}</span>
            <small>{formatPercent(item.fillPercent)} full - {item.note}</small>
          </div>
        ))}
      </div>

      <div className="button-row">
        <button type="button" className={`secondary-button copy-button ${copied ? "copied" : ""}`} onClick={copyNumbers}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy all numbers"}
        </button>
        <button type="button" className="secondary-button" onClick={copyRichText}>Copy as text</button>
      </div>
    </section>
  );
}