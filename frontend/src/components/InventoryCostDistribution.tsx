import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import type {InventoryCosts } from '@/types/dashboard';


const inventoryCosts: InventoryCosts = {
  holdingCosts: 5000,
  orderingCosts: 3000,
  shortageCosts: 1000
};

const COLORS = ['#1a5654', '#abff91', '#5cd95b'];

export default function InventoryCostDistribution(){
    return(
        <div>
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
    )
}