import { useEffect, useState } from "react";
import { Sidebar } from "../layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { getNotifications } from "../api/notifications"; // <- import your API function

type Notification = {
  _id: string;
  message: string;
  timestamp: string;
  type?: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNotifications();
      setNotifications(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-72">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" /> Notifications
        </h1>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification._id}
              className={`p-4 border rounded-lg shadow-sm ${
                notification.type === "low-stock" ? "bg-red-100 border-red-400" : ""
              }`}
            >
              <p className="text-gray-800 font-medium">{notification.message}</p>
              <p className="text-gray-500 text-sm mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
