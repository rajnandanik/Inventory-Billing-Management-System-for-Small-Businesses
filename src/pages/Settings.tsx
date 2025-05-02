
import React from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            {user?.role === "admin" && (
              <TabsTrigger value="admin">Admin Settings</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user?.email} type="email" />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Enable dark theme for the application
                    </p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Compact View</p>
                    <p className="text-sm text-muted-foreground">
                      Show more items on screen with compact spacing
                    </p>
                  </div>
                  <Switch id="compact-view" />
                </div>
                
                <div className="pt-2">
                  <Button onClick={handleSave}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Low Stock Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when items are running low
                    </p>
                  </div>
                  <Switch id="low-stock-alerts" defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Invoice Reminders</p>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders for unpaid invoices
                    </p>
                  </div>
                  <Switch id="invoice-reminders" defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new features and updates
                    </p>
                  </div>
                  <Switch id="system-updates" defaultChecked />
                </div>
                
                <div className="pt-2">
                  <Button onClick={handleSave}>Save Notification Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="pt-2">
                  <Button onClick={handleSave}>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {user?.role === "admin" && (
            <TabsContent value="admin" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">User Management</p>
                      <p className="text-sm text-muted-foreground">
                        Control access to system features
                      </p>
                    </div>
                    <Button variant="outline">Manage Users</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">System Backup</p>
                      <p className="text-sm text-muted-foreground">
                        Configure automatic backups
                      </p>
                    </div>
                    <Button variant="outline">Configure Backups</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Import/Export Data</p>
                      <p className="text-sm text-muted-foreground">
                        Transfer system data
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline">Import</Button>
                      <Button variant="outline">Export</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
