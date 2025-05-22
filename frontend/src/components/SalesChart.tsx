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
        
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis
  domain={([min, max]) => {
    const padding = (max - min) * 0.2;
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }}
  tickCount={6}
  tickFormatter={(value) => `${Math.round(value)}`} // Optional for cleaner display
/>


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
