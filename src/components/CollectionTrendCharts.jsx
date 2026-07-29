import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from "recharts";
import { collectionTrends } from "../data/feesData";

function CollectionTrendsChart() {
  const maxAmount = Math.max(...collectionTrends.map((d) => d.amount));

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body">
        <h6 className="fw-bold mb-3">Collection Trends</h6>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={collectionTrends} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={28}>
              <LabelList
                dataKey="amount"
                position="top"
                formatter={(v) => (v === maxAmount ? `${v}M` : "")}
                style={{ fill: "#111827", fontSize: 12, fontWeight: 600 }}
              />
              {collectionTrends.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.amount === maxAmount ? "#2563eb" : "#c7d7fe"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CollectionTrendsChart;