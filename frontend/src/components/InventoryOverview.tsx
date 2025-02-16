import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const overviewData = {
  totalStock: 650,
  lowStockItems: 12,
  outOfStockItems: 5,
};

export function InventoryOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Inventory Overview</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Update Inventory
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Stock Items</p>
              <p className="text-2xl font-bold text-primary">{overviewData.totalStock}</p>
            </div>
          </div>

          <div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
              <p className="text-2xl font-bold text-yellow-500">{overviewData.lowStockItems}</p>
            </div>
          </div>

          <div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-bold text-red-500">{overviewData.outOfStockItems}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
