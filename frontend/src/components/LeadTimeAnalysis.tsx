import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { InventoryData} from '@/types/dashboard';

const inventoryLevels: InventoryData[] = [
  { productName: 'Product A', quantity: 100, stockoutRate: 25, turnoverRate: 4.0, leadTime: 7 },
  { productName: 'Product B', quantity: 150, stockoutRate: 65, turnoverRate: 3.5, leadTime: 5 },
  { productName: 'Product C', quantity: 120, stockoutRate: 55, turnoverRate: 4.2, leadTime: 8 },
  { productName: 'Product D', quantity: 80, stockoutRate: 60, turnoverRate: 3.8, leadTime: 5 },
  { productName: 'Product E', quantity: 200, stockoutRate: 45, turnoverRate: 4.5, leadTime: 6 }
];

export default function LeadTime(){
    return(
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
    )
}