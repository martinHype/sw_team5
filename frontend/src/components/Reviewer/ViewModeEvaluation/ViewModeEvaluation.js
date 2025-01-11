import React from "react";

const ViewModeEvaluation = ({ data }) => {
    const statusColors = {
        "Publikovať v predloženej forme": "#4CAF50", // Green
        "Publikovať po zapracovaní pripomienok": "#FF9800", // Orange
        "Neprijať pre publikovanie": "#F44336", // Red
    };
  return (
    <div style={styles.container}>
      {/* Evaluation Section */}
      <h3>Hodnotenie práce</h3>
      <div>
        <p>
          <strong>Aktuálnosť a náročnosť práce:</strong> {data.actuality_difficulty}
        </p>
        <p>
          <strong>Zorientovanie sa študenta v danej problematike:</strong> {data.orientation_in_theme}
        </p>
        <p>
          <strong>Práca zodpovedá šablóne určenej pre ŠVK:</strong> {data.work_corresponding_template}
        </p>
        <p>
          <strong>Chyby:</strong>
        </p>
        <ul>
            {data.missing_slovak_or_english_title ? (
                <li>Chýba názov práce v slovenskom alebo anglickom jazyku</li>
            ) : null}
            {data.missing_slovak_or_english_abstract !== undefined && (
                <li>Chýba abstrakt v slovenskom alebo anglickom jazyku</li>
            )}
            {data.missing_abstract_length ? (
                <li>Abstrakt nespĺňa rozsah 100 - 150 slov</li>
            ) : null}
            {data.missing_part ? (
                <li>Chýbajú “Úvod”, “Výsledky a diskusia” alebo “Záver”</li>
            ) : null}
            </ul>
      </div>

      {/* Strengths */}
      <div>
        <h4>Prínos (silné stránky) práce</h4>
        <p>{data.positive_review}</p>
      </div>

      {/* Weaknesses */}
      <div>
        <h4>Nedostatky (slabé stránky) práce</h4>
        <p>{data.negative_review}</p>
      </div>

      {/* Final Decision */}
      <div style={styles.finalDecision}>
        <h3>Záverečný posudok</h3>
        <p>
        <h2 style={{ color: statusColors[data.acticle_status_name] }}>{data.acticle_status_name}</h2>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    
  },
  finalDecision: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f4f8fb",
  },
};

export default ViewModeEvaluation;