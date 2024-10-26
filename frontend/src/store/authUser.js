import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSignUp: false,
  isCheckingAuth:true,
  isLoggingOut:false,
  isLogin:false,
  signup: async (credentials) => {
    set({ isSignUp: true });
    try {
      const response = await axios.post("/api/auth/signup", credentials);
      set({ user: response.data.user, isSignUp: false });
      toast.success("Account created successfully");
      return true
    } catch (error) {
      // Catch custom error message thrown from backend
      const errorMessage = error.response?.data?.message || "SignUp Failed";
      toast.error(errorMessage);
      set({ user: null, isSignUp: false });
      return false
    }
  },
  login: async (credentials) => {
    set({isLogin:true})
    try{
      const response=await axios.post("/api/auth/login",credentials)
      set({user:response.data.user,isLogin:false})
      toast.success("Login Successfull")

    }catch(error){
      const errorMessage=error.response?.data?.message || "Login Failed"
      toast.error(errorMessage)
      set({isLogin:false,user:null})

    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      // Catch custom error message thrown from backend
      const errorMessage = error.response?.data?.message || "LogOut Failed";
      toast.error(errorMessage);
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
      
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
      
    }
  },
}));
