import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import type { CustomerMetrics } from '../types/dashboard';

const customerData: CustomerMetrics = {
  conversionRate: 65,
  acquisitionCost: 25,
  platformEngagement: [
    { platform: 'Platform A', engagement: 15, month: 'August' },
    { platform: 'Platform B', engagement: 20, month: 'August' },
    { platform: 'Platform C', engagement: 12, month: 'August' },
    { platform: 'Platform D', engagement: 25, month: 'August' },
    { platform: 'Platform A', engagement: 18, month: 'September' },
    { platform: 'Platform B', engagement: 22, month: 'September' },
    { platform: 'Platform C', engagement: 15, month: 'September' },
    { platform: 'Platform D', engagement: 28, month: 'September' }
  ]
};

const COLORS = ['#1a5654', '#abff91', '#5cd95b'];

const conversionData = [
  { name: 'Leads', value: 75 },
  { name: 'Qualified', value: 50 },
  { name: 'Converted', value: 25 }
];

export function CustomerInsights() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Lead Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
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
              {conversionData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={customerData.platformEngagement}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="#1a5654" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      
    </div>
  );
}
