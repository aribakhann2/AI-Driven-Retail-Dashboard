import { Sidebar } from "../layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

const mockNotifications = [
  { id: 1, message: "Database successfully connected.", timestamp: "2025-03-20 10:15 AM" },
  { id: 2, message: "Sales forecast dataset uploaded.", timestamp: "2025-03-20 10:45 AM" },
  { id: 3, message: "Market basket dataset uploaded.", timestamp: "2025-03-20 11:00 AM" },
  { id: 4, message: "Model is running for sales forecast.", timestamp: "2025-03-20 11:30 AM" },
  { id: 5, message: "Low inventory warning: Product XYZ.", timestamp: "2025-03-20 12:00 PM" },
];

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-72">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" /> Notifications
        </h1>
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <Card key={notification.id} className="p-4 border rounded-lg shadow-sm">
              <p className="text-gray-800 font-medium">{notification.message}</p>
              <p className="text-gray-500 text-sm mt-1">{notification.timestamp}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
