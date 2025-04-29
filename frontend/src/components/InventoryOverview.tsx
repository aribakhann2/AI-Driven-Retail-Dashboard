import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import axios from 'axios';

interface InventoryData {
  total_products: number;
  low_stock: number;
  out_of_stock: number;
}

interface InventoryOverviewProps {
  data?: InventoryData[];
}

export function InventoryOverview({ data = [] }: InventoryOverviewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [stockLevel, setStockLevel] = useState('');

  const handleUpdateInventory = () => {
    if (!productName || !stockLevel) return;

    axios.post('http://localhost:5000/api/db/update-stock', {
      productName,
      newQuantity: Number(stockLevel),
    })
      .then(() => {
        setIsDialogOpen(false);
        setIsSuccessDialogOpen(true);
        setStockLevel('');
        setProductName('');
      })
      .catch(error => {
        console.error('Error updating inventory:', error);
        setIsDialogOpen(false);
        setIsErrorDialogOpen(true);
      });
  };

  const inventoryData = data[0] || {};
  const totalProducts = inventoryData?.total_products ?? 0;
  const lowStock = inventoryData?.low_stock ?? 0;
  const outOfStock = inventoryData?.out_of_stock ?? 0;

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
            <p className="text-sm font-medium text-muted-foreground">Total Stock Items</p>
            <p className="text-2xl font-bold text-primary">{totalProducts}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
            <p className="text-2xl font-bold text-yellow-500">{lowStock}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
            <p className="text-2xl font-bold text-red-500">{outOfStock}</p>
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
            className="mb-2"
          />

          <Input
            placeholder="New Stock Level"
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
          <p className="text-center text-green-600">The inventory has been successfully updated!</p>
          <Button className="w-full" onClick={() => setIsSuccessDialogOpen(false)}>
            OK
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Failed</DialogTitle>
          </DialogHeader>
          <p className="text-center text-red-600">There was an error updating the inventory. Please try again.</p>
          <Button className="w-full" onClick={() => setIsErrorDialogOpen(false)}>
            OK
          </Button>
        </DialogContent>
      </Dialog>

    </Card>
  );
}
