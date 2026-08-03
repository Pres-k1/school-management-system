import "../styles/Statscard.styles.css";

function StatsCards({ totalCount = 0, newAdmissionsCount = 0, suspendedCount = 0 }) {
  const cards = [
    {
      key: "total",
      label: "Total Students",
      value: totalCount.toLocaleString(),
      note: "+4.2% from last term",
      icon: "👥",
      tone: "blue",
    },
    {
      key: "new",
      label: "New Admissions",
      value: newAdmissionsCount.toLocaleString(),
      note: "Registered this term",
      icon: "🧑‍🎓",
      tone: "green",
    },
    {
      key: "suspended",
      label: "Suspended",
      value: suspendedCount.toLocaleString(),
      note: "Awaiting Disciplinary Board",
      icon: "🚫",
      tone: "red",
    },
  ];

  return (
    <section className="stats-cards">
      {cards.map((card) => (
        <div className="stat-card" key={card.key}>
          <div className={`stat-icon tone-${card.tone}`}>{card.icon}</div>
          <div className="stat-body">
            <span className="stat-label">{card.label}</span>
            <span className="stat-value">{card.value}</span>
            <span className={`stat-note ${card.tone === "red" ? "warn" : ""}`}>{card.note}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;
