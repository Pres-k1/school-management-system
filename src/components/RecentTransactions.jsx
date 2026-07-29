import { Bank2, Phone, CashStack, ChevronLeft, ChevronRight, FilterCircle } from "react-bootstrap-icons";
import { recentTransactions, transactionsMeta } from "../data/feesData";

function MethodIcon({ method }) {
  if (method === "Bank") return <Bank2 className="text-primary" size={14} />;
  if (method === "Mobile Money") return <Phone style={{ color: "#f59e0b" }} size={14} />;
  return <CashStack className="text-success" size={14} />;
}

function RecentTransactions() {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Recent Fee Transactions</h6>
          <button className="btn btn-light btn-sm d-flex align-items-center gap-2 border">
            <FilterCircle size={14} />
            All Methods
          </button>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr className="text-muted small text-uppercase">
                <th className="fw-semibold border-0" style={{ fontSize: 11 }}>Date</th>
                <th className="fw-semibold border-0" style={{ fontSize: 11 }}>Student Name</th>
                <th className="fw-semibold border-0" style={{ fontSize: 11 }}>Class</th>
                <th className="fw-semibold border-0" style={{ fontSize: 11 }}>Payment Method</th>
                <th className="fw-semibold border-0 text-end" style={{ fontSize: 11 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, i) => (
                <tr key={i} className="border-top">
                  <td className="small text-muted">{tx.date}</td>
                  <td className="small fw-medium">{tx.student}</td>
                  <td className="small text-muted">{tx.className}</td>
                  <td className="small">
                    <span className="d-inline-flex align-items-center gap-2">
                      <MethodIcon method={tx.method} />
                      {tx.method}
                    </span>
                  </td>
                  <td className="small fw-semibold text-end">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
          <span className="text-muted small">
            Showing {transactionsMeta.shown} of {transactionsMeta.total} transactions
          </span>
          <div className="d-flex gap-1">
            <button className="btn btn-light btn-sm border" aria-label="Previous page">
              <ChevronLeft size={14} />
            </button>
            <button className="btn btn-light btn-sm border" aria-label="Next page">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RecentTransactions;