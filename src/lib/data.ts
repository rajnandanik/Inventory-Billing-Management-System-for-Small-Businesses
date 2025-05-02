
// Mock data for the inventory and billing system

// Product categories
export const categories = [
  "Electronics",
  "Clothing",
  "Food & Beverages",
  "Stationery",
  "Furniture",
  "Kitchen Appliances",
  "Toys",
  "Beauty Products",
  "Health & Fitness",
  "Books",
];

// Sample inventory items
export const inventoryItems = [
  {
    id: "INV001",
    name: "Laptop",
    category: "Electronics",
    sku: "ELEC-LAP-001",
    costPrice: 45000,
    sellingPrice: 55000,
    stock: 15,
    reorderLevel: 5,
    barcode: "784283947284",
    lastUpdated: "2023-04-15",
  },
  {
    id: "INV002",
    name: "T-Shirt",
    category: "Clothing",
    sku: "CLO-TSH-001",
    costPrice: 250,
    sellingPrice: 499,
    stock: 50,
    reorderLevel: 10,
    barcode: "784283947285",
    lastUpdated: "2023-04-14",
  },
  {
    id: "INV003",
    name: "Coffee Beans",
    category: "Food & Beverages",
    sku: "FB-COF-001",
    costPrice: 400,
    sellingPrice: 650,
    stock: 30,
    reorderLevel: 8,
    barcode: "784283947286",
    lastUpdated: "2023-04-13",
  },
  {
    id: "INV004",
    name: "Notebook",
    category: "Stationery",
    sku: "STA-NB-001",
    costPrice: 50,
    sellingPrice: 120,
    stock: 100,
    reorderLevel: 20,
    barcode: "784283947287",
    lastUpdated: "2023-04-12",
  },
  {
    id: "INV005",
    name: "Office Chair",
    category: "Furniture",
    sku: "FUR-CHR-001",
    costPrice: 3500,
    sellingPrice: 5999,
    stock: 8,
    reorderLevel: 3,
    barcode: "784283947288",
    lastUpdated: "2023-04-11",
  },
  {
    id: "INV006",
    name: "Microwave Oven",
    category: "Kitchen Appliances",
    sku: "KIT-MWO-001",
    costPrice: 6000,
    sellingPrice: 8999,
    stock: 12,
    reorderLevel: 4,
    barcode: "784283947289",
    lastUpdated: "2023-04-10",
  },
];

// Sample customers
export const customers = [
  {
    id: "CUST001",
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Main St, Anytown",
    totalPurchases: 24500,
    lastPurchase: "2023-04-10",
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9876543211",
    address: "456 Oak St, Anytown",
    totalPurchases: 15700,
    lastPurchase: "2023-04-05",
  },
  {
    id: "CUST003",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "9876543212",
    address: "789 Pine St, Anytown",
    totalPurchases: 32000,
    lastPurchase: "2023-04-08",
  },
];

// Sample invoices
export const invoices = [
  {
    id: "INV2023001",
    customerId: "CUST001",
    customerName: "John Doe",
    date: "2023-04-10",
    items: [
      { id: "INV001", name: "Laptop", quantity: 1, price: 55000 },
      { id: "INV004", name: "Notebook", quantity: 2, price: 120 },
    ],
    subtotal: 55240,
    tax: 9943.2,
    discount: 500,
    total: 64683.2,
    status: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV2023002",
    customerId: "CUST002",
    customerName: "Jane Smith",
    date: "2023-04-05",
    items: [
      { id: "INV002", name: "T-Shirt", quantity: 3, price: 499 },
      { id: "INV003", name: "Coffee Beans", quantity: 2, price: 650 },
    ],
    subtotal: 2797,
    tax: 503.46,
    discount: 100,
    total: 3200.46,
    status: "Paid",
    paymentMethod: "Cash",
  },
  {
    id: "INV2023003",
    customerId: "CUST003",
    customerName: "Bob Johnson",
    date: "2023-04-08",
    items: [
      { id: "INV005", name: "Office Chair", quantity: 1, price: 5999 },
      { id: "INV006", name: "Microwave Oven", quantity: 1, price: 8999 },
    ],
    subtotal: 14998,
    tax: 2699.64,
    discount: 1000,
    total: 16697.64,
    status: "Pending",
    paymentMethod: "Bank Transfer",
  },
];

// Dashboard analytics data
export const analyticsData = {
  salesOverview: {
    today: 25400,
    yesterday: 18900,
    thisWeek: 98700,
    lastWeek: 85600,
    thisMonth: 342000,
    lastMonth: 315000,
  },
  inventoryStatus: {
    totalItems: 250,
    lowStock: 15,
    outOfStock: 3,
    overStocked: 8,
  },
  topSellingProducts: [
    { name: "Laptop", sales: 15, revenue: 825000 },
    { name: "Office Chair", sales: 12, revenue: 71988 },
    { name: "T-Shirt", sales: 45, revenue: 22455 },
    { name: "Coffee Beans", sales: 32, revenue: 20800 },
    { name: "Microwave Oven", sales: 8, revenue: 71992 },
  ],
  recentTransactions: [
    {
      id: "TR001",
      customer: "John Doe",
      amount: 64683.2,
      date: "2023-04-10",
      status: "Completed",
    },
    {
      id: "TR002",
      customer: "Jane Smith",
      amount: 3200.46,
      date: "2023-04-05",
      status: "Completed",
    },
    {
      id: "TR003",
      customer: "Bob Johnson",
      amount: 16697.64,
      date: "2023-04-08",
      status: "Pending",
    },
    {
      id: "TR004",
      customer: "Alice Brown",
      amount: 8500,
      date: "2023-04-07",
      status: "Completed",
    },
    {
      id: "TR005",
      customer: "Charlie Green",
      amount: 12000,
      date: "2023-04-06",
      status: "Failed",
    },
  ],
};

// Role types
export const roles = [
  { id: "admin", name: "Admin", description: "Full access to all features" },
  { id: "manager", name: "Manager", description: "Access to most features except settings and user management" },
  { id: "employee", name: "Employee", description: "Limited access to billing and inventory" },
];

// Mock user for authentication demo
export const users = [
  {
    id: "USR001",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real application, passwords should be hashed
    role: "admin",
  },
  {
    id: "USR002",
    name: "Manager User",
    email: "manager@example.com",
    password: "manager123",
    role: "manager",
  },
  {
    id: "USR003",
    name: "Employee User",
    email: "employee@example.com",
    password: "employee123",
    role: "employee",
  },
];
