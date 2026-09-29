const FORBIDDEN_PLACEHOLDERS = [0, 1, 2, 3, 4];

export default function CensoredCard() {
  return (
    <article className="tabu-card tabu-card-censored" aria-label="Sansürlenmiş Tabu kartı">
      <div className="tabu-card-top"><p>ANLATILACAK KELİME</p><h2>*****</h2></div>
      <div className="tabu-card-words"><p>SÖYLEME!</p><ul>{FORBIDDEN_PLACEHOLDERS.map((index) => <li key={index}>*****</li>)}</ul></div>
    </article>
  );
}
