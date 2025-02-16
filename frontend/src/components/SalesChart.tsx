import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { SalesData } from '../types/dashboard';

const data: SalesData[] = [
  { week: 'Week 1', 'Clothing and Accessories': 18, 'Cosmetics and Skincare': 12, 'Others': 0 },
  { week: 'Week 2', 'Clothing and Accessories': 30, 'Cosmetics and Skincare': 15, 'Others': 8 },
  { week: 'Week 3', 'Clothing and Accessories': 38, 'Cosmetics and Skincare': 25, 'Others': 20 },
  { week: 'Week 4', 'Clothing and Accessories': 30, 'Cosmetics and Skincare': 15, 'Others': 40 },
];

export function SalesChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bestselling Product</CardTitle>
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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Clothing and Accessories" stroke="#abff91" />
              <Line type="monotone" dataKey="Cosmetics and Skincare" stroke="#1a5654" />
              <Line type="monotone" dataKey="Others" stroke="#5cd95b" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
