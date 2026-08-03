import "../styles/Bottompanel.styles.css";

function BottomPanels() {
  return (
    <section className="bottom-panels">
      <div className="panel panel-promo">
        <div className="panel-promo-text">
          <h3>Automate Termly Reports</h3>
          <p>
            Generate performance summaries for your entire class in just three clicks,
            and link student records directly to examination boards.
          </p>
          <button className="btn-light">Explore Feature</button>
        </div>
        <div className="panel-promo-icon">📄</div>
      </div>

      <div className="panel panel-help">
        <div className="panel-help-icon">🎧</div>
        <h3>Need Assistance?</h3>
        <p>Contact our technical support for help with bulk student uploads.</p>
        <a href="#" className="panel-help-link">Get Help Now</a>
      </div>
    </section>
  );
}

export default BottomPanels;
