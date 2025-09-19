import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MessageCircle, Calendar, Filter } from "lucide-react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - In real app, this would come from Supabase
  const skillProviders = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "",
      skill: "Web Development",
      category: "Technology",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 45,
      description: "Full-stack developer specializing in React, Node.js, and modern web technologies.",
      tags: ["React", "Node.js", "TypeScript", "MongoDB"],
      available: true,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "",
      skill: "Graphic Design",
      category: "Design",
      rating: 4.8,
      reviews: 89,
      hourlyRate: 35,
      description: "Creative designer with 8+ years experience in branding and digital design.",
      tags: ["Photoshop", "Illustrator", "Branding", "UI/UX"],
      available: true,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "",
      skill: "Data Science",
      category: "Technology",
      rating: 4.9,
      reviews: 156,
      hourlyRate: 60,
      description: "Data scientist with expertise in machine learning and statistical analysis.",
      tags: ["Python", "R", "Machine Learning", "Statistics"],
      available: false,
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "",
      skill: "Digital Marketing",
      category: "Marketing",
      rating: 4.7,
      reviews: 203,
      hourlyRate: 40,
      description: "Marketing strategist helping businesses grow through digital channels.",
      tags: ["SEO", "Google Ads", "Social Media", "Analytics"],
      available: true,
    },
    {
      id: 5,
      name: "Lisa Thompson",
      avatar: "",
      skill: "Photography",
      category: "Creative",
      rating: 4.8,
      reviews: 92,
      hourlyRate: 50,
      description: "Professional photographer specializing in portraits and product photography.",
      tags: ["Portrait", "Product", "Lighting", "Editing"],
      available: true,
    },
    {
      id: 6,
      name: "Alex Martinez",
      avatar: "",
      skill: "Music Production",
      category: "Creative",
      rating: 4.9,
      reviews: 74,
      hourlyRate: 55,
      description: "Music producer and sound engineer with studio experience.",
      tags: ["Logic Pro", "Mixing", "Mastering", "Composition"],
      available: true,
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "creative", label: "Creative" },
    { value: "business", label: "Business" },
  ];

  const filteredProviders = skillProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
                           provider.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Skill Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Discover talented individuals and learn new skills
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills, people, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProviders.length} skill provider{filteredProviders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Skill Provider Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-elegant transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={provider.avatar} alt={provider.name} />
                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                      {provider.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {provider.name}
                    </CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {provider.skill}
                    </CardDescription>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{provider.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({provider.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {provider.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {provider.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-lg font-bold text-primary">
                    ${provider.hourlyRate}/hr
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${provider.available ? 'bg-success' : 'bg-destructive'}`}></div>
                    <span className="text-xs text-muted-foreground">
                      {provider.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button 
                    className="flex-1 bg-gradient-primary text-white shadow-elegant hover:shadow-glow"
                    disabled={!provider.available}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">
              No skill providers found matching your criteria
            </p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;