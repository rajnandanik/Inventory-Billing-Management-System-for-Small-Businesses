
import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { inventoryItems, categories } from "@/lib/data";
import { Plus, MoreHorizontal, FileEdit, Trash2, Search } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  reorderLevel: number;
  barcode: string;
  lastUpdated: string;
}

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>(inventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "",
    sku: "",
    costPrice: 0,
    sellingPrice: 0,
    stock: 0,
    reorderLevel: 0,
    barcode: "",
  });

  // Filter items based on search term, category, and stock level
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm);

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && item.stock <= item.reorderLevel) ||
      (stockFilter === "out" && item.stock === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleAddItem = () => {
    const id = `INV${String(items.length + 1).padStart(3, "0")}`;
    const currentDate = new Date().toISOString().split("T")[0];

    const itemToAdd: InventoryItem = {
      id,
      name: newItem.name || "",
      category: newItem.category || "",
      sku: newItem.sku || "",
      costPrice: Number(newItem.costPrice) || 0,
      sellingPrice: Number(newItem.sellingPrice) || 0,
      stock: Number(newItem.stock) || 0,
      reorderLevel: Number(newItem.reorderLevel) || 0,
      barcode: newItem.barcode || "",
      lastUpdated: currentDate,
    };

    setItems([...items, itemToAdd]);
    setNewItem({
      name: "",
      category: "",
      sku: "",
      costPrice: 0,
      sellingPrice: 0,
      stock: 0,
      reorderLevel: 0,
      barcode: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditItem = () => {
    if (!currentItem) return;

    const updatedItems = items.map((item) =>
      item.id === currentItem.id
        ? { ...currentItem, lastUpdated: new Date().toISOString().split("T")[0] }
        : item
    );

    setItems(updatedItems);
    setIsEditDialogOpen(false);
    setCurrentItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>
              Manage your products and stock levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, SKU, or barcode"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <div className="w-40">
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-32">
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Stock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="low">Low Stock</SelectItem>
                      <SelectItem value="out">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Cost Price</TableHead>
                    <TableHead>Selling Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>₹{item.costPrice}</TableCell>
                        <TableCell>₹{item.sellingPrice}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span
                              className={cn(
                                "rounded-full h-2 w-2 mr-2",
                                item.stock === 0
                                  ? "bg-red-500"
                                  : item.stock <= item.reorderLevel
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                              )}
                            />
                            <span>{item.stock}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.lastUpdated}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentItem(item);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <FileEdit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center h-24 text-gray-500"
                      >
                        No items found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newItem.sku}
                  onChange={(e) =>
                    setNewItem({ ...newItem, sku: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="costPrice">Cost Price</Label>
                <Input
                  id="costPrice"
                  type="number"
                  value={newItem.costPrice}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      costPrice: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="sellingPrice">Selling Price</Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  value={newItem.sellingPrice}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      sellingPrice: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newItem.stock}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      stock: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="reorderLevel">Reorder Level</Label>
                <Input
                  id="reorderLevel"
                  type="number"
                  value={newItem.reorderLevel}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      reorderLevel: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  value={newItem.barcode}
                  onChange={(e) =>
                    setNewItem({ ...newItem, barcode: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddItem}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>
              Update the details for this product
            </DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="edit-name">Item Name</Label>
                  <Input
                    id="edit-name"
                    value={currentItem.name}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={currentItem.category}
                    onValueChange={(value) =>
                      setCurrentItem({ ...currentItem, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-sku">SKU</Label>
                  <Input
                    id="edit-sku"
                    value={currentItem.sku}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        sku: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-costPrice">Cost Price</Label>
                  <Input
                    id="edit-costPrice"
                    type="number"
                    value={currentItem.costPrice}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        costPrice: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-sellingPrice">Selling Price</Label>
                  <Input
                    id="edit-sellingPrice"
                    type="number"
                    value={currentItem.sellingPrice}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        sellingPrice: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-stock">Stock Quantity</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={currentItem.stock}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        stock: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-reorderLevel">Reorder Level</Label>
                  <Input
                    id="edit-reorderLevel"
                    type="number"
                    value={currentItem.reorderLevel}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        reorderLevel: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-barcode">Barcode</Label>
                  <Input
                    id="edit-barcode"
                    value={currentItem.barcode}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        barcode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleEditItem}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Inventory;
