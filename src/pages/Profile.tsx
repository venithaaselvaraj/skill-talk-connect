import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, Star, Calendar, Settings, Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  
  // Mock user data - In real app, this would come from Supabase
  const [userProfile, setUserProfile] = useState({
    fullName: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate full-stack developer with 5+ years of experience. I love teaching React, Node.js, and helping others build amazing web applications. When I'm not coding, you can find me playing guitar or hiking.",
    hourlyRate: 50,
    avatar: "",
    skills: ["React", "Node.js", "TypeScript", "Python", "PostgreSQL"],
    rating: 4.8,
    totalSessions: 127,
    totalStudents: 89,
    joinDate: new Date("2023-01-15"),
  });

  const [newSkill, setNewSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailMessages: true,
    emailReminders: true,
    pushNotifications: true,
  });

  const handleSaveProfile = () => {
    // TODO: Save to Supabase
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !userProfile.skills.includes(newSkill.trim())) {
      setUserProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    // TODO: Save to Supabase
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">My Profile</h1>
            <p className="text-xl text-muted-foreground">
              Manage your profile, skills, and account settings
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={userProfile.avatar} alt={userProfile.fullName} />
                        <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                          {userProfile.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl">{userProfile.fullName}</CardTitle>
                        <CardDescription className="text-lg">
                          Full-Stack Developer & Mentor
                        </CardDescription>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 font-medium">{userProfile.rating}</span>
                          </div>
                          <span className="text-muted-foreground">
                            {userProfile.totalSessions} sessions
                          </span>
                          <span className="text-muted-foreground">
                            {userProfile.totalStudents} students
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          value={userProfile.fullName}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, fullName: e.target.value }))}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={userProfile.location}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={userProfile.hourlyRate}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) || 0 }))}
                      disabled={!isEditing}
                      className="max-w-32"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleSaveProfile}
                        className="bg-gradient-primary text-white shadow-elegant hover:shadow-glow"
                      >
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Skills</CardTitle>
                  <CardDescription>
                    Manage the skills you offer to teach others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm py-2 px-3">
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-4 w-4 hover:bg-destructive hover:text-white"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a new skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <Button onClick={handleAddSkill} className="bg-gradient-primary text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailBookings" className="text-base">Email for Session Bookings</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails when someone books a session with you
                        </p>
                      </div>
                      <Switch
                        id="emailBookings"
                        checked={notifications.emailBookings}
                        onCheckedChange={(checked) => handleNotificationChange('emailBookings', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailMessages" className="text-base">Email for New Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when you receive new chat messages
                        </p>
                      </div>
                      <Switch
                        id="emailMessages"
                        checked={notifications.emailMessages}
                        onCheckedChange={(checked) => handleNotificationChange('emailMessages', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailReminders" className="text-base">Session Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email reminders before your sessions
                        </p>
                      </div>
                      <Switch
                        id="emailReminders"
                        checked={notifications.emailReminders}
                        onCheckedChange={(checked) => handleNotificationChange('emailReminders', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications" className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable browser push notifications for real-time updates
                        </p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Your account details and membership information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Member Since</p>
                      <p className="text-sm text-muted-foreground">
                        {userProfile.joinDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;