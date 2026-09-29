import { PLAYER_CATEGORY_IDS, type CardSelection, type PlayerCategoryId } from "@tabu/shared";
import { CATEGORY_ICONS, CATEGORY_LABELS, categorySummary } from "../lib/categories";

interface Props {
  selection: CardSelection;
  isHost: boolean;
  pending: boolean;
  onChange: (selection: CardSelection) => void;
}

export default function CategorySelector({ selection, isHost, pending, onChange }: Props) {
  const custom = selection.mode === "CUSTOM";
  const selected = custom ? selection.categories : [];

  function toggle(id: PlayerCategoryId) {
    const next = selected.includes(id) ? selected.filter((item) => item !== id) :
      PLAYER_CATEGORY_IDS.filter((item) => selected.includes(item) || item === id);
    if (next.length > 0) onChange({ mode: "CUSTOM", categories: next });
  }

  return (
    <section className="lobby-section category-section" aria-labelledby="categories-title">
      <div className="section-heading"><h2 id="categories-title">Kart Kategorileri</h2></div>
      {isHost ? <>
        <div className="category-modes" role="group" aria-label="Kart seçimi modu">
          <button className={`category-mode${!custom ? " selected" : ""}`} type="button" aria-pressed={!custom} disabled={pending} onClick={() => onChange({ mode: "GENERAL" })}>✓ Genel</button>
          <button className={`category-mode${custom ? " selected" : ""}`} type="button" aria-pressed={custom} disabled={pending} onClick={() => onChange({ mode: "CUSTOM", categories: ["DAILY"] })}>Özelleştir</button>
        </div>
        <div className={`category-grid-wrap${custom ? " open" : ""}`} aria-hidden={!custom}>
        <div className="category-grid" role="group" aria-label="Oynanacak kategoriler">
          {PLAYER_CATEGORY_IDS.map((id) => <button
            className={`category-tile category-${id.toLowerCase()}${selected.includes(id) ? " selected" : ""}`}
            key={id} type="button" aria-pressed={selected.includes(id)} disabled={!custom || pending || (selected.length === 1 && selected.includes(id))}
            onClick={() => toggle(id)}
          ><span className="category-icon" aria-hidden="true">{CATEGORY_ICONS[id]}</span><span>{CATEGORY_LABELS[id]}</span><span className="category-check" aria-hidden="true">{selected.includes(id) ? "✓" : "+"}</span></button>)}
        </div></div>
      </> : <p className="category-readonly">Kartlar: <strong>{categorySummary(selection)}</strong></p>}
    </section>
  );
}
