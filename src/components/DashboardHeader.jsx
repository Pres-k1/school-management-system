import { FileEarmarkText, PlusCircleFill } from "react-bootstrap-icons";

function DashboardHeader({ breadcrumb = "Aging - PSMS Uganda", period = "Term 2, 2024" }) {
  return (
    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
      <div>
        <div className="text-muted small mb-1">{breadcrumb}</div>
        <h3 className="fw-bold mb-1">School Fees Overview</h3>
        <div className="small">
          <span className="text-muted">Current Period: </span>
          <span className="text-primary fw-medium">{period}</span>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3">
          <FileEarmarkText size={16} />
          Generate Reports
        </button>
        <button className="btn btn-primary d-flex align-items-center gap-2 px-3">
          <PlusCircleFill size={16} />
          Collect Fee
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;