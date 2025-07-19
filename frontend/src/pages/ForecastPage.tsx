import { useState, useEffect } from "react";
import { Navbar } from "../layout/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadCloud, Trash2, Loader2 } from "lucide-react";
import { uploadDataset, fetchUserDatasets } from "../api/uploadDataset";
import { useNavigate } from "react-router-dom";
import { useReportContext } from "../ReportContext";

export default function ForecastsPage() {
  const [isMarketDialogOpen, setIsMarketDialogOpen] = useState(false);
  const [isSalesDialogOpen, setIsSalesDialogOpen] = useState(false);
  const [marketBasketFile, setMarketBasketFile] = useState<File | null>(null);
  const [salesForecastFile, setSalesForecastFile] = useState<File | null>(null);
  const [salesForecastFilename, setSalesForecastFilename] = useState<string | null>(null);
  const [marketBasketFilename, setMarketBasketFilename] = useState<string | null>(null);
  const [loadingType, setLoadingType] = useState<"market" | "sales" | null>(null);
  const navigate = useNavigate();

  const { setReport } = useReportContext();

  useEffect(() => {
    const loadUserDatasets = async () => {
      try {
        const response = await fetchUserDatasets();
        const { datasets } = response.data;

        if (datasets?.sales) {
          const filename = datasets.sales.split("/").pop();
          setSalesForecastFilename(filename);
        }

        if (datasets?.mba) {
          const filename = datasets.mba.split("/").pop();
          setMarketBasketFilename(filename);
        }
      } catch (error) {
        console.error("Failed to load user datasets", error);
      }
    };

    loadUserDatasets();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0] || null;
    if (
      file &&
      ![
        "application/vnd.ms-excel",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      alert("Only CSV and Excel files are allowed.");
      return;
    }

    if (type === "market") {
      setMarketBasketFile(file);
      setMarketBasketFilename(null);
    }

    if (type === "sales") {
      setSalesForecastFile(file);
      setSalesForecastFilename(null);
    }
  };

  const handlePredict = async (type: "market" | "sales") => {
    const selectedFile = type === "market" ? marketBasketFile : salesForecastFile;
    const selectedFilename = type === "market" ? marketBasketFilename : salesForecastFilename;
    const forecastType = type === "market" ? "mba" : "sales";

    if (!selectedFile && !selectedFilename) {
      alert(
        `Please upload a ${type === "market" ? "Market Basket" : "Sales Forecast"} dataset before predicting.`
      );
      return;
    }

    try {
      setLoadingType(type);
      type === "market" ? setIsMarketDialogOpen(true) : setIsSalesDialogOpen(true);

      const response = selectedFile
        ? await uploadDataset(selectedFile, forecastType)
        : { status: 200, data: { forecastType, pdfUrl: `/api/report/${forecastType}` } }; // Fallback if already uploaded

      if (response.status === 200) {
        const { forecastType, pdfUrl } = response.data;
        setReport({ forecastType, pdfUrl });
        navigate("/report");
      }
    } catch (error) {
      alert("Failed to upload dataset. Please try again.");
      console.error(error);
    } finally {
      setLoadingType(null);
    }
  };

  const removeFile = (type: string) => {
    if (type === "market") {
      setMarketBasketFile(null);
      setMarketBasketFilename(null);
    }
    if (type === "sales") {
      setSalesForecastFile(null);
      setSalesForecastFilename(null);
    }
  };

  return (
    <div className="min-h-screen  dark:bg-background ">
      <Navbar />
      <div className="p-8 lg:ml-52 xl:ml-72 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Forecasts</h1>

        {/* Market Basket Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-white">Market Basket Analysis</h2>
          <div className="flex items-center gap-4">
            <label className="flex-1 flex items-center justify-between p-4 border-2 border-dashed rounded-lg bg-white shadow-sm hover:border-blue-400 transition cursor-pointer dark:bg-gray-100">
              {marketBasketFile ? (
                <span className="text-gray-800">{marketBasketFile.name}</span>
              ) : marketBasketFilename ? (
                <span className="text-gray-800">{marketBasketFilename}</span>
              ) : (
                <span className="text-gray-500 flex items-center gap-2">
                  <UploadCloud className="w-6 h-6 text-gray-400" /> Upload File
                </span>
              )}
              <input
                type="file"
                className="hidden"
                accept=".csv, .xls, .xlsx"
                onChange={(e) => handleFileChange(e, "market")}
              />
            </label>
            {(marketBasketFile || marketBasketFilename) && (
              <Button variant="ghost" onClick={() => removeFile("market")} className="p-2">
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            )}
            <Button
              onClick={() => handlePredict("market")}
              disabled={(!marketBasketFile && !marketBasketFilename) || loadingType === "market"}
            >
              {loadingType === "market" && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
              Predict
            </Button>
          </div>
        </div>

        {/* Sales Forecast Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-white">Sales Forecasting</h2>
          <div className="flex items-center gap-4">
            <label className="flex-1 flex items-center justify-between p-4 border-2 border-dashed rounded-lg bg-white shadow-sm dark:text-white hover:border-blue-400 transition cursor-pointer dark:bg-gray-100">
              {salesForecastFile ? (
                <span className="text-gray-800">{salesForecastFile.name}</span>
              ) : salesForecastFilename ? (
                <span className="text-gray-800">{salesForecastFilename}</span>
              ) : (
                <span className="text-gray-500 flex items-center gap-2">
                  <UploadCloud className="w-6 h-6 text-gray-400" /> Upload File
                </span>
              )}
              <input
                type="file"
                className="hidden"
                accept=".csv, .xls, .xlsx"
                onChange={(e) => handleFileChange(e, "sales")}
              />
            </label>
            {(salesForecastFile || salesForecastFilename) && (
              <Button variant="ghost" onClick={() => removeFile("sales")} className="p-2">
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            )}
            <Button
              onClick={() => handlePredict("sales")}
              disabled={(!salesForecastFile && !salesForecastFilename) || loadingType === "sales"}
            >
              {loadingType === "sales" && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
              Predict
            </Button>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={isMarketDialogOpen} onOpenChange={setIsMarketDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
            <DialogTitle className="text-center">Market Basket Model Running...</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600">Your report is being generated.</p>
          <Button className="w-full mt-4" onClick={() => setIsMarketDialogOpen(false)}>
            OK
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isSalesDialogOpen} onOpenChange={setIsSalesDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
            <DialogTitle className="text-center">Sales Forecast Model Running...</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600">Your report is being generated.</p>
          <Button className="w-full mt-4" onClick={() => setIsSalesDialogOpen(false)}>
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
