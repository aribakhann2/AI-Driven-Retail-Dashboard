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
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
     
      <main className="p-4 lg:p-8 lg:ml-72">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <EarningsOverview />
          </div>
          <div>
            <InventoryOverview />
          </div>
        </div>
        {/* Second Row - Main Content */}
        <div className="grid gap-6 lg:grid-cols-2 my-10">
        <div className="space-y-6">
        <SalesChart/>
          
            </div>
            <div className="space-y-6">
            <InventoryLevel/>
              
            </div>
           
        </div>
        <div className="grid gap-6 lg:grid-cols-2 my-10">
        <div className="space-y-6">
        <StockOut/>
          
            </div>
            <div className="space-y-6">
        <InventoryCostDistribution/>
          
            </div>
            
        </div>
        <div className="flex my-10">
        <div className="flex-1">  <LeadTime/></div>
        <div className="flex-2 p-4 "> <ClientAnalysis/></div>
        
        </div>
       
       <CustomerInsights/>
       
      </main>
    </div>
  );
}


