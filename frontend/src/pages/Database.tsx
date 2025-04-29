import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navbar } from "../layout/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const DatabaseForm = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [dbType, setDbType] = useState("mysql");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [connectedDb, setConnectedDb] = useState<any>(null);
  const formValues = watch();

  useEffect(() => {
    const fetchConnectedDatabase = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/db/string");
        setConnectedDb(response.data);
      } catch (error) {
        console.error("Error fetching connected database", error);
      }
    };

    fetchConnectedDatabase();
  }, []);

  const isFormValid = () => {
    if (!dbType) return false;
    return (
      formValues.host &&
      formValues.port &&
      formValues.user &&
      formValues.password &&
      formValues.database
    );
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/db/connect", data);
      setConnectedDb(response.data);
      toast.success("Database connected successfully!");
      setIsDialogOpen(true);
    } catch (error: any) {
      toast.error(`Connection failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const disconnectDatabase = async () => {
    try {
      await axios.post("http://localhost:5000/api/db/disconnect");
      setConnectedDb(null);
      toast.success("Database disconnected successfully!");
    } catch (error: any) {
      toast.error(`Error disconnecting database: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-8 lg:ml-72 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Database Connection</h1>

        {/* Connected Database Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Connected Database</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 p-4 border-2 border-dashed rounded-lg bg-white shadow-sm">
              {connectedDb ? (
                <>
                  <p className="text-gray-800">{connectedDb.connectionString}</p>
                  <Button
                    onClick={disconnectDatabase}
                    variant="ghost"
                    className="p-2 mt-4 bg-red-500 text-white rounded-full"
                  >
                    <FaTrash className="w-6 h-6" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <p className="text-gray-500">No database connected.</p>
              )}
            </div>
          </div>
        </div>

        {/* Database Connection Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Connect to Database</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md w-full"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Host</label>
                <input
                  {...register("host", { required: true })}
                  type="text"
                  disabled={!!connectedDb}
                  className="w-full p-2 border rounded"
                  placeholder="Enter host"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">User</label>
                <input
                  {...register("user", { required: true })}
                  type="text"
                  disabled={!!connectedDb}
                  className="w-full p-2 border rounded"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Password</label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  disabled={!!connectedDb}
                  className="w-full p-2 border rounded"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Database</label>
                <input
                  {...register("database", { required: true })}
                  type="text"
                  disabled={!!connectedDb}
                  className="w-full p-2 border rounded"
                  placeholder="Enter database name"
                />
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  type="submit"
                  disabled={loading || !!connectedDb}
                  className="w-full max-w-xs"
                >
                  {loading ? "Connecting..." : "Connect"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Dialog for Connection Confirmation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="flex flex-col items-center justify-center">
            <DialogTitle className="text-center">Database Connected</DialogTitle>
            <p className="text-center text-gray-600">You have successfully connected to the database.</p>
            <Button className="w-full mt-4" onClick={() => setIsDialogOpen(false)}>
              OK
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatabaseForm;
