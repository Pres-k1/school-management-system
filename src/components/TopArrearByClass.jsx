import { ExclamationTriangleFill, EnvelopeFill } from "react-bootstrap-icons";
import { topArrears } from "../data/feesData";

function TopArrearsByClass() {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Top Arrears by Class</h6>
          <ExclamationTriangleFill className="text-warning" size={16} />
        </div>

        <div className="d-flex flex-column gap-3 flex-grow-1">
          {topArrears.map((row) => (
            <div key={row.className}>
              <div className="d-flex justify-content-between small mb-1">
                <span className="fw-medium">{row.className}</span>
                <span className="fw-semibold" style={{ color: "#f59e0b" }}>
                  {row.amount}
                </span>
              </div>
              <div className="progress mb-1" style={{ height: 6 }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${row.percent}%`, backgroundColor: "#f59e0b" }}
                  aria-valuenow={row.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className="text-muted" style={{ fontSize: 12 }}>
                {row.students} students outstanding
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-light border-0 mt-3 d-flex align-items-center justify-content-center gap-2 fw-medium text-primary">
          <EnvelopeFill size={14} />
          Send Reminders to All
        </button>
      </div>
    </div>
  );
}

export default TopArrearsByClass;