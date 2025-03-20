import { useState } from "react";
import { Navbar } from "../layout/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadCloud, Trash2, Loader2 } from "lucide-react"; // Icons

export default function ForecastsPage() {
  const [isMarketDialogOpen, setIsMarketDialogOpen] = useState(false);
  const [isSalesDialogOpen, setIsSalesDialogOpen] = useState(false);
  const [marketBasketFile, setMarketBasketFile] = useState<File | null>(null);
  const [salesForecastFile, setSalesForecastFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0] || null;
    if (file && !["application/vnd.ms-excel", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(file.type)) {
      alert("Only CSV and Excel files are allowed.");
      return;
    }
    if (type === "market") setMarketBasketFile(file);
    if (type === "sales") setSalesForecastFile(file);
  };

  const handlePredict = (type: string) => {
    if (type === "market" && !marketBasketFile) {
      alert("Please upload a Market Basket dataset before predicting.");
      return;
    }
    if (type === "sales" && !salesForecastFile) {
      alert("Please upload a Sales Forecast dataset before predicting.");
      return;
    }
    type === "market" ? setIsMarketDialogOpen(true) : setIsSalesDialogOpen(true);
  };

  const removeFile = (type: string) => {
    if (type === "market") setMarketBasketFile(null);
    if (type === "sales") setSalesForecastFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 lg:ml-72 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Forecasts</h1>

        {/* Market Basket Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Market Basket Analysis</h2>
          <div className="flex items-center gap-4">
            <label className="flex-1 flex items-center justify-between p-4 border-2 border-dashed rounded-lg bg-white shadow-sm hover:border-blue-400 transition cursor-pointer">
              {marketBasketFile ? (
                <span className="text-gray-800">{marketBasketFile.name}</span>
              ) : (
                <span className="text-gray-500 flex items-center gap-2">
                  <UploadCloud className="w-6 h-6 text-gray-400" /> Upload File
                </span>
              )}
              <input type="file" className="hidden" accept=".csv, .xls, .xlsx" onChange={(e) => handleFileChange(e, "market")} />
            </label>
            {marketBasketFile && (
              <Button variant="ghost" onClick={() => removeFile("market")} className="p-2">
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            )}
            <Button onClick={() => handlePredict("market")} disabled={!marketBasketFile}>
              Predict
            </Button>
          </div>
        </div>

        {/* Sales Forecast Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Sales Forecasting</h2>
          <div className="flex items-center gap-4">
            <label className="flex-1 flex items-center justify-between p-4 border-2 border-dashed rounded-lg bg-white shadow-sm hover:border-blue-400 transition cursor-pointer">
              {salesForecastFile ? (
                <span className="text-gray-800">{salesForecastFile.name}</span>
              ) : (
                <span className="text-gray-500 flex items-center gap-2">
                  <UploadCloud className="w-6 h-6 text-gray-400" /> Upload File
                </span>
              )}
              <input type="file" className="hidden" accept=".csv, .xls, .xlsx" onChange={(e) => handleFileChange(e, "sales")} />
            </label>
            {salesForecastFile && (
              <Button variant="ghost" onClick={() => removeFile("sales")} className="p-2">
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            )}
            <Button onClick={() => handlePredict("sales")} disabled={!salesForecastFile}>
              Predict
            </Button>
          </div>
        </div>
      </div>

      {/* Dialogs for Prediction */}
      <Dialog open={isMarketDialogOpen} onOpenChange={setIsMarketDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
            <DialogTitle className="text-center">Market Basket Model Running...</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600">Your report is being generated.</p>
          <Button className="w-full mt-4" onClick={() => setIsMarketDialogOpen(false)}>OK</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isSalesDialogOpen} onOpenChange={setIsSalesDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
            <DialogTitle className="text-center">Sales Forecast Model Running...</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600">Your report is being generated.</p>
          <Button className="w-full mt-4" onClick={() => setIsSalesDialogOpen(false)}>OK</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
