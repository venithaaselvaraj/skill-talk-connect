import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Phone, Video, MoreVertical, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  skill: string;
}

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState<string>("1");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock data - In real app, this would come from Supabase real-time subscriptions
  const contacts: ChatContact[] = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "",
      lastMessage: "Looking forward to our React session tomorrow!",
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2,
      isOnline: true,
      skill: "Web Development",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      avatar: "",
      lastMessage: "Thanks for the design feedback",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      isOnline: true,
      skill: "Graphic Design",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      avatar: "",
      lastMessage: "The data analysis looks great!",
      lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      unreadCount: 1,
      isOnline: false,
      skill: "Data Science",
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "1",
      senderName: "Sarah Chen",
      content: "Hi! I'm excited about our upcoming React session. Do you have any specific topics you'd like to focus on?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
    },
    {
      id: "2",
      senderId: "current-user",
      senderName: "You",
      content: "Hi Sarah! I'd love to learn more about React hooks and state management. Also, if we could cover testing, that would be amazing!",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: 'text',
    },
    {
      id: "3",
      senderId: "1",
      senderName: "Sarah Chen",
      content: "Perfect! We'll definitely cover useState, useEffect, and useContext. For testing, I can show you Jest and React Testing Library. Looking forward to our session tomorrow at 2 PM!",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text',
    },
  ]);

  const selectedContactData = contacts.find(c => c.id === selectedContact);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      content: message.trim(),
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // TODO: Send message through Supabase real-time
    toast({
      title: "Message sent",
      description: "Real-time messaging will be implemented with Supabase.",
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Contacts Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Messages</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-2 p-4">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedContact === contact.id
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedContact(contact.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {contact.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm truncate">
                                {contact.name}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(contact.lastMessageTime)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-muted-foreground truncate">
                                {contact.lastMessage}
                              </p>
                              {contact.unreadCount > 0 && (
                                <Badge className="bg-primary text-white text-xs ml-2">
                                  {contact.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {contact.skill}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {selectedContactData && (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={selectedContactData.avatar} alt={selectedContactData.name} />
                            <AvatarFallback className="bg-gradient-primary text-white">
                              {selectedContactData.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {selectedContactData.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedContactData.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedContactData.isOnline ? "Online" : "Offline"} • {selectedContactData.skill}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${
                              msg.senderId === "current-user" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-2xl ${
                                msg.senderId === "current-user"
                                  ? "bg-gradient-primary text-white"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${
                                msg.senderId === "current-user" 
                                  ? "text-white/70" 
                                  : "text-muted-foreground"
                              }`}>
                                {msg.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </CardContent>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border/50">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        className="bg-gradient-primary text-white shadow-elegant hover:shadow-glow"
                        disabled={!message.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;