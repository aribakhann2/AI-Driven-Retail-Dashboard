import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

interface ReportsSectionProps {
  forecastType: string;
  reportUrl: string;
}

export const ReportsSection: React.FC<ReportsSectionProps> = ({ forecastType, reportUrl }) => {
  if (!reportUrl) return null;

  return (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {forecastType} Report
          </h2>
          <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="text-blue-600 hover:underline flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
        <div className="w-full h-[600px] border rounded">
          <iframe
            src={reportUrl}
            title={`${forecastType} Report`}
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </CardContent>
    </Card>
  );
};
