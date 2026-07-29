import { Wallet2, Bank2, ExclamationTriangleFill, GraphUpArrow } from "react-bootstrap-icons";
import { summaryStats } from "../data/feesData";

function IconBadge({ children, bg, color }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-3"
      style={{ width: 40, height: 40, backgroundColor: bg, color }}
    >
      {children}
    </div>
  );
}

function StatCards() {
  const { totalExpected, totalCollected, totalArrears, collectionRate } = summaryStats;

  return (
    <div className="row g-3 mb-4">
      {/* Total Expected */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <IconBadge bg="#e8edfd" color="#3b5bfd">
                <Wallet2 size={20} />
              </IconBadge>
              <span className="small fw-semibold text-muted" style={{ letterSpacing: 0.5 }}>
                {totalExpected.tag}
              </span>
            </div>
            <div className="text-muted small mb-1">{totalExpected.label}</div>
            <div className="fs-4 fw-bold">{totalExpected.value}</div>
          </div>
        </div>
      </div>

      {/* Total Collected */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <IconBadge bg="#e8edfd" color="#3b5bfd">
                <Bank2 size={20} />
              </IconBadge>
              <span className="small fw-semibold text-success" style={{ letterSpacing: 0.5 }}>
                {totalCollected.tag}
              </span>
            </div>
            <div className="text-muted small mb-1">{totalCollected.label}</div>
            <div className="fs-4 fw-bold mb-2">{totalCollected.value}</div>
            <div className="progress" style={{ height: 6 }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${totalCollected.progress}%`, backgroundColor: "#3b5bfd" }}
                aria-valuenow={totalCollected.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Total Arrears */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <IconBadge bg="#fef3e2" color="#f59e0b">
                <ExclamationTriangleFill size={18} />
              </IconBadge>
              <span className="small fw-semibold text-warning" style={{ letterSpacing: 0.5 }}>
                {totalArrears.tag}
              </span>
            </div>
            <div className="text-muted small mb-1">{totalArrears.label}</div>
            <div className="fs-4 fw-bold" style={{ color: "#f59e0b" }}>
              {totalArrears.value}
            </div>
          </div>
        </div>
      </div>

      {/* Collection Rate */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <IconBadge bg="#e3f9f2" color="#0ea472">
                <GraphUpArrow size={18} />
              </IconBadge>
              <span className="small fw-semibold text-success" style={{ letterSpacing: 0.5 }}>
                {collectionRate.tag}
              </span>
            </div>
            <div className="text-muted small mb-1">{collectionRate.label}</div>
            <div className="fs-4 fw-bold">{collectionRate.value}</div>
            <div className="text-muted small">{collectionRate.subLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCards;