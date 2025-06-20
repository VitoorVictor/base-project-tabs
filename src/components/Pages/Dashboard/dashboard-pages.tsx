import { Header } from "../../CustomHeader";

export function DashboardContent() {
  return (
    <div className="space-y-4 bg-background p-4">
      <Header title="Dashboard" subtitle="Gerencie os indicadores do sistema" />
      <div className="flex flex-1 h-full flex-col gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-background-alt" />
          <div className="aspect-video rounded-xl bg-background-alt" />
          <div className="aspect-video rounded-xl bg-background-alt" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-background-alt md:min-h-min" />
      </div>
    </div>
  );
}
