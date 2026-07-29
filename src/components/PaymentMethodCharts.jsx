import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { paymentMethods, paymentMethodsTotal } from "../data/feesData";

function PaymentMethodsChart() {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body">
        <h6 className="fw-bold mb-3">Payment Methods</h6>

        <div className="d-flex align-items-center">
          <div style={{ width: 140, height: 140, position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethods}
                  dataKey="value"
                  innerRadius={45}
                  outerRadius={65}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div
              className="position-absolute top-50 start-50 translate-middle text-center"
              style={{ pointerEvents: "none" }}
            >
              <div className="text-muted" style={{ fontSize: 11 }}>
                TOTAL
              </div>
              <div className="fw-bold" style={{ fontSize: 15 }}>
                {paymentMethodsTotal}
              </div>
            </div>
          </div>

          <div className="ms-3 d-flex flex-column gap-2">
            {paymentMethods.map((method) => (
              <div key={method.name} className="d-flex align-items-center gap-2 small">
                <span
                  className="rounded-circle"
                  style={{ width: 8, height: 8, backgroundColor: method.color, display: "inline-block" }}
                />
                <span>
                  {method.name} ({method.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodsChart;