import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
//import { Button } from '@/components/ui/button';
//import { ChevronDown } from 'lucide-react';
import type { EarningsData } from '../types/dashboard';

const data: EarningsData = {
  totalEarnings: 569548.49,
  fashionEarnings: 277943.50,
  beautyEarnings: 291604.99
};

export function EarningsOverview() {
  return (
    <Card className='h-[100%]'>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Earnings Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-bold">
                ${data.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Fashion Items</p>
              <p className="text-xl font-bold">
                ${data.fashionEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Beauty Products</p>
              <p className="text-xl font-bold">
                ${data.beautyEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}