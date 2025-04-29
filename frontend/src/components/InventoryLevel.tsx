import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface RawInventoryData {
  product_name: string;
  stock_quantity: number;
}

interface InventoryData {
  productName: string;
  stockQuantity: number;
}

interface InventoryLevelProps {
  data: RawInventoryData[];
}

export function InventoryLevel({ data }: InventoryLevelProps) {
  if (!data || data.length === 0) {
    return <div>No inventory data available</div>;
  }

  const formattedData: InventoryData[] = data.map(item => ({
    productName: item.product_name,
    stockQuantity: item.stock_quantity
  }));

  return (
    <div>
      <Card className="sm:col-span-2">
        <CardHeader>
          <CardTitle>Top Inventory Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedData}
                margin={{ top: 10, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="productName"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  style={{ fontSize: '12px' }}
                />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip
                  wrapperStyle={{ fontSize: '13px' }}
                  formatter={(value: number) => `${value} units`}
                />
                <Bar
                  dataKey="stockQuantity"
                  fill="#1a5654"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
