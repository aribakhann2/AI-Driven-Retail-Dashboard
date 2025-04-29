import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface EarningsOverviewProps {
  totalEarnings?: number;
  topRevenueProducts?: { product_name: string; revenue_generated: number }[];
}

export function EarningsOverview({
  totalEarnings,
  topRevenueProducts = []
}: EarningsOverviewProps) {
  const top1 = topRevenueProducts[0];
  const top2 = topRevenueProducts[1];

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
                ${totalEarnings?.toLocaleString('en-US', { minimumFractionDigits: 2 }) ?? 'N/A'}
              </p>
            </div>
          </div>

          {top1 && (
            <div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{top1.product_name}</p>
              
                <p className="text-xl font-bold">
                  ${Number(top1.revenue_generated).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          )}

          {top2 && (
            <div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{top2.product_name}</p>
                <p className="text-xl font-bold">
                  ${Number(top2.revenue_generated).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
