import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navbar } from "../layout/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DatabaseForm = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [dbType, setDbType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formValues = watch();

  // Check if all required fields are filled
  const isFormValid = () => {
    if (!dbType) return false;
    if (dbType === "mongo") {
      return !!formValues.connectionString;
    }
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
  
    // Simulate a network request delay (e.g., 2 seconds)
    setTimeout(() => {
      setLoading(false);
      setIsDialogOpen(true); // Show dialog
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-center p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Connect to Database</h2>
          
          {/* Database Type Selection */}
          <label className="block text-gray-700 font-medium">Database Type</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={dbType}
            onChange={(e) => {
              setDbType(e.target.value);
              reset();
            }}
          >
            <option value="">Select Database Type</option>
            <option value="mysql">MySQL</option>
            <option value="postgres">PostgreSQL</option>
            <option value="mongo">MongoDB</option>
            <option value="oracle">Oracle</option>
            <option value="mssql">MSSQL</option>
          </select>

          {/* Show Inputs Based on Selected Database Type */}
          {dbType && (
            <>
              {dbType !== "mongo" && (
                <>
                  <label className="block text-gray-700 font-medium">Host</label>
                  <input {...register("host", { required: true })} type="text" className="w-full p-2 border rounded mb-4" placeholder="Enter host" />

                  <label className="block text-gray-700 font-medium">Port</label>
                  <input {...register("port", { required: true })} type="number" className="w-full p-2 border rounded mb-4" placeholder="Enter port" />

                  <label className="block text-gray-700 font-medium">User</label>
                  <input {...register("user", { required: true })} type="text" className="w-full p-2 border rounded mb-4" placeholder="Enter username" />

                  <label className="block text-gray-700 font-medium">Password</label>
                  <input {...register("password", { required: true })} type="password" className="w-full p-2 border rounded mb-4" placeholder="Enter password" />

                  <label className="block text-gray-700 font-medium">Database Name</label>
                  <input {...register("database", { required: true })} type="text" className="w-full p-2 border rounded mb-4" placeholder="Enter database name" />
                </>
              )}

              {dbType === "mongo" && (
                <>
                  <label className="block text-gray-700 font-medium">Connection String</label>
                  <input {...register("connectionString", { required: true })} type="text" className="w-full p-2 border rounded mb-4" placeholder="Enter MongoDB connection string" />
                </>
              )}
            </>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={!isFormValid() || loading}
          >
            {loading ? "Connecting..." : "Connect"}
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Database Connected</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600">Your database has been successfully connected!</p>
          <Button className="w-full" onClick={() => setIsDialogOpen(false)}>OK</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatabaseForm;
