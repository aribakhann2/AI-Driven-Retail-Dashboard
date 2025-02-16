import { Navbar } from '../layout/Navbar';
import { SalesChart } from '../components/SalesChart';
import { ClientAnalysis } from '../components/ClientAnalysis';
import { EarningsOverview } from '../components/EarningsOverview';
import { InventoryReports } from '../components/InventoryReports';
import { PredictiveAnalytics } from '../components/PredictiveAnalytics';
import { InventoryOverview } from '../components/InventoryOverview';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="p-4 lg:p-8 lg:ml-72">
        <div className="grid gap-6">
          {/* First Row - Key Metrics */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <EarningsOverview />
            </div>
            <div>
              <InventoryOverview />
            </div>
          </div>

          {/* Second Row - Main Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Inventory Management */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Inventory Management</h2>
              <InventoryReports />
            </div>

            {/* Right Column - Predictive Analytics */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Predictive Analytics</h2>
                <PredictiveAnalytics />
              </div>
              <SalesChart />
              <ClientAnalysis />
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}