import DashboardHeader from "./DashboardHeader";
import StatCards from "./StatCards";
import CollectionTrendsChart from "./CollectionTrendsChart";
import PaymentMethodsChart from "./PaymentMethodsChart";
import TopArrearsByClass from "./TopArrearsByClass";
import RecentTransactions from "./RecentTransactions";

function FeesDashboard() {
  return (
    <div style={{ backgroundColor: "#f5f6fa", minHeight: "100vh" }} className="p-3 p-md-4">
      <DashboardHeader />
      <StatCards />

      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-4">
          <CollectionTrendsChart />
        </div>
        <div className="col-12 col-xl-4">
          <PaymentMethodsChart />
        </div>
        <div className="col-12 col-xl-4">
          <TopArrearsByClass />
        </div>
      </div>

      <RecentTransactions />
    </div>
  );
}
export default FeesDashboard;