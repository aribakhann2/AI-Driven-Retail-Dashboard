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
import type { InventoryData} from '@/types/dashboard';

const inventoryLevels: InventoryData[] = [
  { productName: 'Product A', quantity: 100, stockoutRate: 25, turnoverRate: 4.0, leadTime: 7 },
  { productName: 'Product B', quantity: 150, stockoutRate: 65, turnoverRate: 3.5, leadTime: 5 },
  { productName: 'Product C', quantity: 120, stockoutRate: 55, turnoverRate: 4.2, leadTime: 8 },
  { productName: 'Product D', quantity: 80, stockoutRate: 60, turnoverRate: 3.8, leadTime: 5 },
  { productName: 'Product E', quantity: 200, stockoutRate: 45, turnoverRate: 4.5, leadTime: 6 }
];

export function InventoryLevel() {
  return (
    <div>
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
    </div>
  )}