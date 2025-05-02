
import React from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { analyticsData, inventoryItems } from "@/lib/data";
import { ArrowUp, ArrowDown, Package, FileText, Users, DollarSign } from "lucide-react";

// Mock data for charts
const salesData = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 3200 },
  { name: "May", total: 2800 },
  { name: "Jun", total: 3500 },
  { name: "Jul", total: 4000 },
];

const Dashboard = () => {
  // Calculate items with low stock
  const lowStockItems = inventoryItems.filter(
    (item) => item.stock <= item.reorderLevel
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export</Button>
            <Button>New Invoice</Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-50 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Revenue
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                ₹{analyticsData.salesOverview.thisMonth.toLocaleString()}
              </div>
              <div className="flex items-center mt-1">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <div className="text-xs text-green-500 font-medium">
                  8.5% from last month
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-50 rounded-full">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Invoices
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">124</div>
              <div className="flex items-center mt-1">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <div className="text-xs text-green-500 font-medium">
                  12% from last month
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-50 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Customers
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">84</div>
              <div className="flex items-center mt-1">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <div className="text-xs text-green-500 font-medium">
                  5.3% from last month
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-50 rounded-full">
                  <Package className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Inventory Items
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                {inventoryItems.length}
              </div>
              <div className="flex items-center mt-1">
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                <div className="text-xs text-red-500 font-medium">
                  {lowStockItems.length} items low in stock
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="colorTotal"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3F83F8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3F83F8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#3F83F8"
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.topSellingProducts}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 20,
                      bottom: 40,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#1E429F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions & Low Stock */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium">{transaction.customer}</div>
                      <div className="text-sm text-gray-500">
                        {transaction.date}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-right">
                        ₹{transaction.amount.toLocaleString()}
                      </div>
                      <div
                        className={`text-sm text-right ${
                          transaction.status === "Completed"
                            ? "text-green-500"
                            : transaction.status === "Pending"
                            ? "text-amber-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockItems.length > 0 ? (
                <div className="space-y-4">
                  {lowStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.category}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-right">
                          {item.stock} in stock
                        </div>
                        <div className="text-sm text-red-500 text-right">
                          Reorder Level: {item.reorderLevel}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">No low stock items</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
