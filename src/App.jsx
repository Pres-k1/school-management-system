import "bootstrap/dist/css/bootstrap.min.css";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from "recharts";
import { PieChart, Pie } from "recharts";
import Modal from "./components/modal";
import { useState } from "react";
import {
  FileEarmarkText,
  PlusCircleFill,
  Wallet2,
  Bank2,
  ExclamationTriangleFill,
  GraphUpArrow,
  EnvelopeFill,
  Phone,
  CashStack,
  ChevronLeft,
  ChevronRight,
  FilterCircle,
} from "react-bootstrap-icons";

// ---------- DATA ----------
const summaryStats = {
  totalExpected: { label: "Total Expected", value: "UGX 1.2B", tag: "EXPECTED" },
  totalCollected: { label: "Total Collected", value: "UGX 850M", tag: "70.8% RECEIVED", progress: 70.8 },
  totalArrears: { label: "Total Arrears", value: "UGX 350M", tag: "URGENT" },
  collectionRate: {
    label: "Collection Rate",
    value: "15.4%",
    tag: "+15% GROWTH",
    subLabel: "Compared to Term 1, 2024",
  },
};

const collectionTrends = [
  { month: "JAN", amount: 120 },
  { month: "FEB", amount: 160 },
  { month: "MAR", amount: 230 },
  { month: "APR", amount: 300 },
  { month: "MAY", amount: 210 },
];

const paymentMethods = [
  { name: "Bank", value: 60, color: "#2563eb" },
  { name: "Mobile", value: 25, color: "#38bdf8" },
  { name: "Cash", value: 15, color: "#f59e0b" },
];
const paymentMethodsTotal = "850M";

const topArrears = [
  { className: "Senior 4 (General)", amount: "UGX 85M", students: 12, percent: 92 },
  { className: "Senior 1 (Arts)", amount: "UGX 62M", students: 24, percent: 78 },
  { className: "Primary 7", amount: "UGX 45M", students: 8, percent: 58 },
  { className: "Senior 2", amount: "UGX 38M", students: 15, percent: 46 },
  { className: "Senior 6 (Science)", amount: "UGX 24M", students: 5, percent: 30 },
];

const recentTransactions = [
  { date: "May 24, 2024", student: "Nakato Sarah", className: "Senior 4A", method: "Bank", amount: "1,250,000" },
  { date: "May 24, 2024", student: "Okello John", className: "Senior 2B", method: "Mobile Money", amount: "850,000" },
  { date: "May 23, 2024", student: "Musoke David", className: "Senior 1A", method: "Bank", amount: "2,100,000" },
  { date: "May 23, 2024", student: "Kato Peter", className: "Primary 7", method: "Cash", amount: "500,000" },
];
const transactionsMeta = { shown: 4, total: 124 };

// ---------- SMALL HELPERS ----------
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

function MethodIcon({ method }) {
  if (method === "Bank") return <Bank2 className="text-primary" size={14} />;
  if (method === "Mobile Money") return <Phone style={{ color: "#f59e0b" }} size={14} />;
  return <CashStack className="text-success" size={14} />;
}

// ---------- MAIN APP ----------
function App() {
  const [showModal, setShowModal]=useState(false);
  const { totalExpected, totalCollected, totalArrears, collectionRate } = summaryStats;
  const maxAmount = Math.max(...collectionTrends.map((d) => d.amount));

  return (
    <div style={{ backgroundColor: "#f5f6fa", minHeight: "100vh" }} className="p-3 p-md-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <div className="text-muted small mb-1">Aging - PSMS Uganda</div>
          <h3 className="fw-bold mb-1">School Fees Overview</h3>
          <div className="small">
            <span className="text-muted">Current Period: </span>
            <span className="text-primary fw-medium">Term 2, 2024</span>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3">
            <FileEarmarkText size={16} />
            Generate Reports
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2 px-3" onClick={() => setShowModal(true)}>
            <PlusCircleFill size={16} />
            Collect Fee
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <IconBadge bg="#e8edfd" color="#3b5bfd"><Wallet2 size={20} /></IconBadge>
                <span className="small fw-semibold text-muted">{totalExpected.tag}</span>
              </div>
              <div className="text-muted small mb-1">{totalExpected.label}</div>
              <div className="fs-4 fw-bold">{totalExpected.value}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <IconBadge bg="#e8edfd" color="#3b5bfd"><Bank2 size={20} /></IconBadge>
                <span className="small fw-semibold text-success">{totalCollected.tag}</span>
              </div>
              <div className="text-muted small mb-1">{totalCollected.label}</div>
              <div className="fs-4 fw-bold mb-2">{totalCollected.value}</div>
              <div className="progress" style={{ height: 6 }}>
                <div className="progress-bar" style={{ width: `${totalCollected.progress}%`, backgroundColor: "#3b5bfd" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <IconBadge bg="#fef3e2" color="#f59e0b"><ExclamationTriangleFill size={18} /></IconBadge>
                <span className="small fw-semibold text-warning">{totalArrears.tag}</span>
              </div>
              <div className="text-muted small mb-1">{totalArrears.label}</div>
              <div className="fs-4 fw-bold" style={{ color: "#f59e0b" }}>{totalArrears.value}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <IconBadge bg="#e3f9f2" color="#0ea472"><GraphUpArrow size={18} /></IconBadge>
                <span className="small fw-semibold text-success">{collectionRate.tag}</span>
              </div>
              <div className="text-muted small mb-1">{collectionRate.label}</div>
              <div className="fs-4 fw-bold">{collectionRate.value}</div>
              <div className="text-muted small">{collectionRate.subLabel}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Collection Trends</h6>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={collectionTrends} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={28}>
                    <LabelList
                      dataKey="amount"
                      position="top"
                      formatter={(v) => (v === maxAmount ? `${v}M` : "")}
                      style={{ fill: "#111827", fontSize: 12, fontWeight: 600 }}
                    />
                    {collectionTrends.map((entry, index) => (
                      <Cell key={index} fill={entry.amount === maxAmount ? "#2563eb" : "#c7d7fe"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Payment Methods</h6>
              <div className="d-flex align-items-center">
                <div style={{ width: 140, height: 140, position: "relative" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={paymentMethods} dataKey="value" innerRadius={45} outerRadius={65} startAngle={90} endAngle={-270} stroke="none">
                        {paymentMethods.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ pointerEvents: "none" }}>
                    <div className="text-muted" style={{ fontSize: 11 }}>TOTAL</div>
                    <div className="fw-bold" style={{ fontSize: 15 }}>{paymentMethodsTotal}</div>
                  </div>
                </div>
                <div className="ms-3 d-flex flex-column gap-2">
                  {paymentMethods.map((method) => (
                    <div key={method.name} className="d-flex align-items-center gap-2 small">
                      <span className="rounded-circle" style={{ width: 8, height: 8, backgroundColor: method.color, display: "inline-block" }} />
                      <span>{method.name} ({method.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
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
                      <span className="fw-semibold" style={{ color: "#f59e0b" }}>{row.amount}</span>
                    </div>
                    <div className="progress mb-1" style={{ height: 6 }}>
                      <div className="progress-bar" style={{ width: `${row.percent}%`, backgroundColor: "#f59e0b" }} />
                    </div>
                    <div className="text-muted" style={{ fontSize: 12 }}>{row.students} students outstanding</div>
                  </div>
                ))}
              </div>
              <button className="btn btn-light border-0 mt-3 d-flex align-items-center justify-content-center gap-2 fw-medium text-primary">
                <EnvelopeFill size={14} />
                Send Reminders to All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
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
              <button className="btn btn-light btn-sm border" aria-label="Previous page"><ChevronLeft size={14} /></button>
              <button className="btn btn-light btn-sm border" aria-label="Next page"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
        <Modal
        isOpen={showModal}
        type="confirm"
        title="Confirm fee collection"
        message="Are you sure you want to record this fee payment? This action can't be undone."
        confirmText="Yes, collect fee"
        cancelText="Cancel"
        onConfirm={() => {
          // this is where you'll actually save/record the payment later
          console.log("Fee collected!");
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default App;