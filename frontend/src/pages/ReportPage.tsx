import React, { useEffect, useState } from "react";
import { Navbar } from "../layout/Navbar";
import { Button } from "@/components/ui/button";
import { getReports } from "../api/report";
import { toast } from "react-toastify";

const ReportPage: React.FC = () => {
  const [reportData, setReportData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const reports = await getReports();
        setReportData(reports || {}); // fallback to empty object if undefined
      } catch (error) {
        console.error("Error fetching reports", error);
        toast.error("Error fetching reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="p-8 lg:ml-72 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Forecast Reports</h1>

        {/* Sales Forecasting Report */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">Sales Forecasting</h2>
          {reportData.sales_report ? (
            <a href={reportData.sales_report} target="_blank" rel="noopener noreferrer">
              <Button>Download Sales Report</Button>
            </a>
          ) : (
            <p className="text-gray-500 dark:text-gray-100">No Sales Report available yet.</p>
          )}
        </div>

        {/* Market Basket Report */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">Market Basket Analysis</h2>
          {reportData.mba_report ? (
            <a href={reportData.mba_report} target="_blank" rel="noopener noreferrer">
              <Button>Download Market Basket Report</Button>
            </a>
          ) : (
            <p className="text-gray-500 dark:text-gray-100">No Market Basket Report available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
