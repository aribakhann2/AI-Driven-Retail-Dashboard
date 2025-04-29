import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./socket"; // 👉 import the shared socket instance
import { useReportContext } from "./ReportContext";

type QueryData = {
  [key: string]: any[];
};

const SocketManager = ({ setQueryData }: { setQueryData: React.Dispatch<React.SetStateAction<QueryData>> }) => {
  const [socketStatus, setSocketStatus] = useState<string>("Connecting...");
  const { setReport } = useReportContext();
  const navigate = useNavigate();

  useEffect(() => {
    const onConnect = () => {
      console.log("Socket connected ✅", socketStatus);
      setSocketStatus("Connected ✅");
    };

    const onDbUpdate = (data: { type: string; data: any }) => {
      console.log("Received data from socket:", data);
      localStorage.setItem(data.type, JSON.stringify(data.data));
      setQueryData((prev) => ({ ...prev, [data.type]: data.data }));
    };

    const onPdfReady = (data: any) => {
      const { forecastType, reportUrl } = data;
      setReport({ forecastType, pdfUrl: reportUrl });
      navigate("/reports");
    };

    const onDisconnect = () => {
      setSocketStatus("Disconnected ❌");
    };

    socket.on("connect", onConnect);
    socket.on("db_update", onDbUpdate);
    socket.on("pdf_ready", onPdfReady);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("db_update", onDbUpdate);
      socket.off("pdf_ready", onPdfReady);
      socket.off("disconnect", onDisconnect);
    };
  }, [navigate, setQueryData, setReport]); // Fine now

  return null;
};

export default SocketManager;
