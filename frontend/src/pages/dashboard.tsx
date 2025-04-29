import { Navbar } from "../layout/Navbar";
import { SalesChart } from "../components/SalesChart";
import { ClientAnalysis } from "../components/ClientAnalysis";
import { EarningsOverview } from "../components/EarningsOverview";
import { InventoryOverview } from "../components/InventoryOverview";
import { InventoryLevel } from "@/components/InventoryLevel";
import StockOut from "@/components/StockOut";
import InventoryCostDistribution from "@/components/InventoryCostDistribution";
import LeadTime from "@/components/LeadTimeAnalysis";
import { CustomerInsights } from "@/components/CustomerInsights";

// Define the type of props expected
interface DashboardProps {
  queryData: Record<string, any>;
}

export default function Dashboard({ queryData }: DashboardProps) {
  const {
    monthlyEarnings,
    stockSummary,
    topStockoutRateProducts,
    inventoryCostDistribution,
    topLeadConvertedProducts,
    genderDistribution,
    leadBreakdown,
    socialEngagement,
    topRevenueProducts,
    topStockQuantityProducts,
    weeklySalesLast4Weeks

  } = queryData;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="p-4 lg:p-8 lg:ml-72">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <EarningsOverview
              totalEarnings={parseFloat(monthlyEarnings?.[0]?.total_earnings_last_month || '0')}
              topRevenueProducts={topRevenueProducts?.map((p: { product_name: string; revenue_generated: string }) => ({
                product_name: p.product_name,
                revenue_generated: parseFloat(p.revenue_generated)
              }))}
            />
          </div>
          <div>
          <InventoryOverview data={stockSummary} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 my-10">
          <div className="space-y-6">
            <SalesChart weeklySalesLast4Weeks={weeklySalesLast4Weeks} />
          </div>
          <div className="space-y-6">
            <InventoryLevel data={topStockQuantityProducts} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 my-10">
          <div className="space-y-6">
          <StockOut
  data={topStockoutRateProducts?.map((product: { product_name: string; stockout_percentage: string }) => ({
    product_name: product.product_name,
    stockout_percentage: parseFloat(product.stockout_percentage)
  }))}
/>

          </div>
          <div className="space-y-6">
          <InventoryCostDistribution
  data={{
    holdingCosts: parseFloat(inventoryCostDistribution?.[0]?.total_holding_cost || '0'),
    orderingCosts: parseFloat(inventoryCostDistribution?.[0]?.total_ordering_cost || '0'),
    shortageCosts: 0 // if you don’t have this from backend, set a default
  }}
/>

          </div>
        </div>

        <div className="flex my-10">
          <div className="flex-1">
            <LeadTime data={topLeadConvertedProducts} />
          </div>
          <div className="flex-2 p-4">
          <ClientAnalysis
  genderDistribution={{
    male: parseFloat(genderDistribution?.find((g: any) => g.gender === 'Male')?.percentage || '0'),
    female: parseFloat(genderDistribution?.find((g: any) => g.gender === 'Female')?.percentage || '0'),
    others: parseFloat(genderDistribution?.find((g: any) => g.gender === 'Other')?.percentage || '0')
  }}
/>

          </div>
        </div>

        <CustomerInsights
  socialEngagement={socialEngagement} // Pass the backend social engagement data
  leadBreakdown={leadBreakdown} // Pass the lead breakdown data
/>
      </main>
    </div>
  );
}
