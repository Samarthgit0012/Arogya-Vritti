import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";
import PeriodTracker from "@/components/PeriodTracker";
import { ArrowLeft, User, Settings, Shield, Droplet } from "lucide-react";

const Profile = () => {
  // Mock user data - in a real app this would come from your backend
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call your backend API
    setUser(formData);
    setIsEditing(false);
    toast("Profile Updated", {
      description: "Your profile information has been saved.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft size={20} />
            <span className="ml-1">Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-700">Profile & Settings</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center">
              <User size={16} className="mr-2" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield size={16} className="mr-2" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="period" className="flex items-center">
              <Droplet size={16} className="mr-2 text-pink-500" />
              <span>Period Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Settings size={16} className="mr-2" />
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and emergency contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={isEditing ? formData.name : user.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={isEditing ? formData.email : user.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={isEditing ? formData.phone : user.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input 
                        id="emergencyContact"
                        name="emergencyContact"
                        value={isEditing ? formData.emergencyContact : user.emergencyContact}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input 
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={isEditing ? formData.emergencyPhone : user.emergencyPhone}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 space-x-4">
                    {isEditing ? (
                      <>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </>
                    ) : (
                      <Button type="button" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and account security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input type="password" id="current-password" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input type="password" id="new-password" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input type="password" id="confirm-password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="period">
            <PeriodTracker />
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>
                  Customize your app experience and notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Preference settings will be implemented in a future update.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
