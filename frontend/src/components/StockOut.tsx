import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import type { InventoryData} from '@/types/dashboard';

const inventoryLevels: InventoryData[] = [
  { productName: 'Product A', quantity: 100, stockoutRate: 25, turnoverRate: 4.0, leadTime: 7 },
  { productName: 'Product B', quantity: 150, stockoutRate: 65, turnoverRate: 3.5, leadTime: 5 },
  { productName: 'Product C', quantity: 120, stockoutRate: 55, turnoverRate: 4.2, leadTime: 8 },
  { productName: 'Product D', quantity: 80, stockoutRate: 60, turnoverRate: 3.8, leadTime: 5 },
  { productName: 'Product E', quantity: 200, stockoutRate: 45, turnoverRate: 4.5, leadTime: 6 }
];

export default function StockOut() {
  return (
         <Card className='h-[100%]'>
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
  )
}

