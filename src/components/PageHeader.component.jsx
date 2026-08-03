import "../styles/PageHeader.styles.css";

function PageHeader({ onAddStudent, onExport }) {
  return (
    <section className="page-header">
      <div>
        <h1>Student Directory</h1>
        <p>Manage all enrolled students, their academic status, and fee records.</p>
      </div>
      <div className="page-header-actions">
        <button className="btn-outline" onClick={onExport}>
          <span>↓</span> Export List
        </button>
        <button className="btn-primary" onClick={onAddStudent}>
          <span>+</span> Add New Student
        </button>
      </div>
    </section>
  );
}

export default PageHeader;
