// services/authService.ts


export interface AuthResponse {
    token: string;
    user?: {
      _id?: string;
      name?: string;
      email?: string;
    };
  }
  
  interface LoginData {
    email: string;
    password: string;
  }
  
  interface SignupData extends LoginData {
    name: string;
    confirmPassword: string;
  }
  
  export const authenticateUser = async (
    isLogin: boolean,
    userData: LoginData | SignupData
  ): Promise<AuthResponse> => {
    // Use the base URL from the environment variable
    const baseUrl = "http://localhost:5000";
    console.log(baseUrl); // Check the baseUrl to ensure it's correct
  
    // Set the endpoint based on login/signup
    const endpoint = isLogin ? `${baseUrl}/auth/login` : `${baseUrl}/api/auth/register`;
  
    // Log userData to check it's being passed correctly
    console.log(JSON.stringify(userData)); // Log the data being sent
  
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure the header is set to JSON
      },
      body: JSON.stringify(userData), // Send the data as JSON
    });
  
    const data = await response.json();
    console.log(data); // Log the response to debug
  
    if (!response.ok) {
      throw new Error(data.error || "Authentication failed");
    }
  
    // Store in localStorage
    localStorage.setItem("token", data.token);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  
    return data;
  };
  export const logoutUser = (): void => {
    // Remove JWT and user info from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  
    // Optionally: navigate to login or show a message
    // e.g., window.location.href = "/login";
    // or return a success indicator if used programmatically
  
    console.log("User logged out successfully.");
    
  };
  export const getUsername = async (): Promise<string> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
  
    const response = await fetch("http://localhost:5000/auth/username", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    
    if (!response.ok) return "Guest";
    const data = await response.json();
    return data.name || "Guest";
   
  };
  