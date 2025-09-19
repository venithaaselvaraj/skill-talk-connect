import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Users, MessageCircle, Calendar, Star, Video, Mail } from "lucide-react";
import heroImage from "@/assets/hero-skillswap.jpg";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Skill Marketplace",
      description: "Browse and discover talented individuals offering various skills, from coding to cooking.",
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Connect instantly with skill providers through our live messaging system.",
    },
    {
      icon: Video,
      title: "Live Sessions",
      description: "Book and attend live video sessions with automatic speech-to-text transcription.",
    },
    {
      icon: Calendar,
      title: "Session Management",
      description: "Schedule, reschedule, and manage all your learning sessions in one place.",
    },
    {
      icon: Mail,
      title: "Smart Notifications",
      description: "Get instant email notifications for bookings, messages, and session reminders.",
    },
    {
      icon: Star,
      title: "Rating System",
      description: "Build trust through our comprehensive rating and review system.",
    },
  ];

  const topSkills = [
    { name: "Web Development", count: 1250, color: "bg-blue-500" },
    { name: "Graphic Design", count: 890, color: "bg-purple-500" },
    { name: "Data Science", count: 745, color: "bg-green-500" },
    { name: "Digital Marketing", count: 623, color: "bg-orange-500" },
    { name: "Photography", count: 567, color: "bg-pink-500" },
    { name: "Music Production", count: 445, color: "bg-yellow-500" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  🚀 Now with Live Video Sessions
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Exchange Skills,{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Build Dreams
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-md">
                  Connect with talented individuals worldwide. Learn new skills, teach what you know, 
                  and grow together through live interactive sessions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/marketplace">
                  <Button size="lg" className="bg-gradient-primary text-white shadow-elegant hover:shadow-glow transition-all duration-300">
                    Explore Skills
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Start Teaching
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Skills Available</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">25K+</p>
                  <p className="text-sm text-muted-foreground">Sessions Completed</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
                alt="People collaborating and learning together"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Why Choose SkillSwap?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines the best of social learning with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Most Popular Skills</h2>
            <p className="text-xl text-muted-foreground">
              Discover what's trending in our skill marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSkills.map((skill, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">
                        {skill.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {skill.count} skilled professionals
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                View All Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of learners and teachers who are already exchanging skills and building their dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Browse Skills
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;