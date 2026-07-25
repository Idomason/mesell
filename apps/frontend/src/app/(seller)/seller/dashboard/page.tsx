import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardChartsClient from "@/components/seller/dashboard-charts/DashboardChartsClient";

export default function Page() {
  return (
    <div className="w-full font-sans">
      <div className="py-4 flex items-center justify-between">
        <h1 className="text-2xl text-primary font-semibold tracking-wide">
          Overview
        </h1>

        <div className="bg-white rounded-lg">
          <Select defaultValue="last-week">
            <SelectTrigger className="w-full max-w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DashboardChartsClient />
    </div>
  );
}
