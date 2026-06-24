import DashboardStats from "@/components/admin/DashboardStats";
import DashboardCharts from "@/components/admin/DashboardCharts";

export default function DashboardPage() {
  const dashboardStats = {

    blogs: 10,
    staffs: 12,
    messages: 20,
    events: 45,
  };

  return (
    <>
      <DashboardStats stats={dashboardStats} />

      <DashboardCharts stats={dashboardStats} />
    </>
  );
}