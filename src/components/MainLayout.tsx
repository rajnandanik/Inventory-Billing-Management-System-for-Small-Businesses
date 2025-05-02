
import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import {
  Package,
  FileText,
  Users,
  ShoppingCart,
  Wallet,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
      variant: "default",
    });
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Invoices",
      href: "/invoices",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Customers",
      href: "/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Sales",
      href: "/sales",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <Sidebar items={sidebarItems} />
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 transform bg-gray-900/80 transition duration-200 ease-in-out ${
          isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileSidebar}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition duration-200 ease-in-out ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <Sidebar items={sidebarItems} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={toggleMobileSidebar}
                className="p-2 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 md:hidden"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="ml-4 md:ml-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition duration-150 ease-in-out"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                <Bell className="h-5 w-5" />
              </button>
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                  onClick={handleLogout}
                >
                  <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center text-white">
                    {user?.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline">{user?.name}</span>
                  <LogOut className="h-4 w-4 md:ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
