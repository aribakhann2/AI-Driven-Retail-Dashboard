import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';

const overviewData = {
  totalStock: 650,
  lowStockItems: 12,
  outOfStockItems: 5,
};

export function InventoryOverview() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [stockLevel, setStockLevel] = useState('');

  const handleUpdateInventory = () => {
    setIsDialogOpen(false);
    setIsSuccessDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Inventory Overview</CardTitle>
        <Button onClick={() => setIsDialogOpen(true)}>
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

      {/* Inventory Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Inventory</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            placeholder="Stock Level"
            type="number"
            value={stockLevel}
            onChange={(e) => setStockLevel(e.target.value)}
          />
          <Button onClick={handleUpdateInventory} className="w-full mt-2">
            Update
          </Button>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inventory Updated</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600">The inventory has been successfully updated!</p>
          <Button className="w-full" onClick={() => setIsSuccessDialogOpen(false)}>
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
