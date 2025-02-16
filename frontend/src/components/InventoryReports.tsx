import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import type { InventoryData, InventoryCosts } from '@/types/dashboard';

const inventoryLevels: InventoryData[] = [
  { productName: 'Product A', quantity: 100, stockoutRate: 25, turnoverRate: 4.0, leadTime: 7 },
  { productName: 'Product B', quantity: 150, stockoutRate: 65, turnoverRate: 3.5, leadTime: 5 },
  { productName: 'Product C', quantity: 120, stockoutRate: 55, turnoverRate: 4.2, leadTime: 8 },
  { productName: 'Product D', quantity: 80, stockoutRate: 60, turnoverRate: 3.8, leadTime: 5 },
  { productName: 'Product E', quantity: 200, stockoutRate: 45, turnoverRate: 4.5, leadTime: 6 }
];

const inventoryCosts: InventoryCosts = {
  holdingCosts: 5000,
  orderingCosts: 3000,
  shortageCosts: 1000
};

const COLORS = ['#1a5654', '#abff91', '#5cd95b'];

export function InventoryReports() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* First Row */}
      <Card className="sm:col-span-2">
        <CardHeader>
          <CardTitle>Inventory Levels by Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryLevels}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#1a5654" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Second Row */}
      <Card>
        <CardHeader>
          <CardTitle>Stockout Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryLevels.map((product) => (
              <div key={product.productName} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{product.productName}</span>
                  <span>{product.stockoutRate}%</span>
                </div>
                <Progress value={product.stockoutRate} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Time Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryLevels.map((product) => (
              <div key={product.productName} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{product.productName}</span>
                  <span>{product.leadTime} Days</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(product.leadTime / 10) * 100}%`,
                      backgroundColor: '#5cd95b'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Third Row */}
      <Card className="sm:col-span-2">
        <CardHeader>
          <CardTitle>Inventory Costs Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Holding Costs', value: inventoryCosts.holdingCosts },
                    { name: 'Ordering Costs', value: inventoryCosts.orderingCosts },
                    { name: 'Shortage Costs', value: inventoryCosts.shortageCosts }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[0] }} />
                <span>Holding</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[1] }} />
                <span>Ordering</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[2] }} />
                <span>Shortage</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}