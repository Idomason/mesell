import DailyOrders from "@/components/seller/dashboard-charts/DailyOrders";
import DailyRevenue from "@/components/seller/dashboard-charts/DailyRevenue";
import NewCustomers from "@/components/seller/dashboard-charts/NewCustomers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const dynamic = "force-dynamic";

export default function page() {
  return (
    <div className="w-fiull font-sans">
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
      <div className="flex items-center gap-4">
        <DailyRevenue />
        <DailyOrders />
        <NewCustomers />
      </div>
    </div>
  );
}
