import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MessageCircle, FileText, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Session {
  id: string;
  title: string;
  instructor: {
    name: string;
    avatar: string;
    rating: number;
  };
  date: Date;
  duration: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  skill: string;
  price: number;
  description: string;
  hasTranscript?: boolean;
  rating?: number;
}

const Sessions = () => {
  const { toast } = useToast();
  
  // Mock data - In real app, this would come from Supabase
  const sessions: Session[] = [
    {
      id: "1",
      title: "React Hooks & State Management Deep Dive",
      instructor: {
        name: "Sarah Chen",
        avatar: "",
        rating: 4.9,
      },
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: 90,
      status: 'upcoming',
      skill: "Web Development",
      price: 45,
      description: "Learn modern React patterns with hooks, context, and state management best practices.",
    },
    {
      id: "2",
      title: "UI/UX Design Principles for Developers",
      instructor: {
        name: "Marcus Johnson",
        avatar: "",
        rating: 4.8,
      },
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last week
      duration: 120,
      status: 'completed',
      skill: "Design",
      price: 35,
      description: "Master the fundamentals of user interface and user experience design.",
      hasTranscript: true,
      rating: 5,
    },
    {
      id: "3",
      title: "Data Science with Python Fundamentals",
      instructor: {
        name: "Emma Rodriguez",
        avatar: "",
        rating: 4.9,
      },
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // In 3 days
      duration: 150,
      status: 'upcoming',
      skill: "Data Science",
      price: 60,
      description: "Introduction to data analysis, visualization, and machine learning with Python.",
    },
    {
      id: "4",
      title: "Advanced Photography Composition",
      instructor: {
        name: "Lisa Thompson",
        avatar: "",
        rating: 4.8,
      },
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      duration: 105,
      status: 'completed',
      skill: "Photography",
      price: 50,
      description: "Learn professional composition techniques and lighting setups.",
      hasTranscript: true,
      rating: 4,
    },
  ];

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleJoinSession = (sessionId: string) => {
    toast({
      title: "Joining Session",
      description: "Video session functionality will be implemented with WebRTC and Supabase.",
    });
  };

  const handleViewTranscript = (sessionId: string) => {
    toast({
      title: "Opening Transcript",
      description: "Speech-to-text transcripts will be generated during live sessions.",
    });
  };

  const StatusBadge = ({ status }: { status: Session['status'] }) => {
    const variants = {
      upcoming: "bg-blue-100 text-blue-800",
      completed: "bg-success/20 text-success",
      cancelled: "bg-destructive/20 text-destructive",
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const SessionCard = ({ session }: { session: Session }) => (
    <Card className="hover:shadow-elegant transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{session.title}</CardTitle>
            <CardDescription>{session.description}</CardDescription>
          </div>
          <StatusBadge status={session.status} />
        </div>
        
        <div className="flex items-center space-x-4 pt-2">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={session.instructor.avatar} alt={session.instructor.name} />
              <AvatarFallback className="bg-gradient-primary text-white text-sm">
                {session.instructor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{session.instructor.name}</p>
              <div className="flex items-center">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground ml-1">
                  {session.instructor.rating}
                </span>
              </div>
            </div>
          </div>
          
          <Badge variant="secondary">{session.skill}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(session.date)}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {session.duration} min
          </div>
          <div className="flex items-center font-medium text-primary">
            ${session.price}
          </div>
        </div>
        
        <div className="flex space-x-2">
          {session.status === 'upcoming' && (
            <>
              <Button 
                className="flex-1 bg-gradient-primary text-white shadow-elegant hover:shadow-glow"
                onClick={() => handleJoinSession(session.id)}
              >
                <Video className="w-4 h-4 mr-2" />
                Join Session
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {session.status === 'completed' && (
            <div className="flex space-x-2 w-full">
              {session.hasTranscript && (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewTranscript(session.id)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Transcript
                </Button>
              )}
              {session.rating && (
                <div className="flex items-center space-x-1 px-3 py-2 bg-muted rounded-md">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{session.rating}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">My Sessions</h1>
          <p className="text-xl text-muted-foreground">
            Manage your learning sessions and access transcripts
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedSessions.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {upcomingSessions.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Upcoming Sessions</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any sessions scheduled yet.
                  </p>
                  <Button className="bg-gradient-primary text-white shadow-elegant hover:shadow-glow">
                    Browse Skills
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {completedSessions.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Completed Sessions</h3>
                  <p className="text-muted-foreground">
                    Your completed sessions will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {completedSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Sessions;