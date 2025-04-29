import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

// Type definition for a single weekly sales record
interface WeeklySalesData {
  year: number;
  week_number: number;
  total_sales_amount: string;
}

// Props for the SalesChart component
interface SalesChartProps {
  weeklySalesLast4Weeks?: WeeklySalesData[]; // optional for safety
}

export function SalesChart({ weeklySalesLast4Weeks = [] }: SalesChartProps) {
  // Safely transform backend data
  const transformedData = weeklySalesLast4Weeks.map((entry, index) => ({
    week: `Week ${index + 1}`,
    sales: parseFloat(entry?.total_sales_amount ?? '0'),
  }));

  const hasData = transformedData.length > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weekly Sales (Last 4 Weeks)</CardTitle>
        <Select defaultValue="this-month">
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="3-months">3 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#38bdf8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-muted-foreground mt-20">
              No sales data available for the last 4 weeks.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
