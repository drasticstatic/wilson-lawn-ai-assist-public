import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  zip?: string;
  serviceType?: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitialPrompt, setShowInitialPrompt] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [leadData, setLeadData] = useState<LeadData>({});
  const [currentStep, setCurrentStep] = useState<'greeting' | 'collecting' | 'complete'>('greeting');
  const { toast } = useToast();

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialPrompt(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // GreenGloveWebHelp AI responses
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greeting responses
    if (currentStep === 'greeting') {
      if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        setCurrentStep('collecting');
        return "Great! I'd be happy to help you get a quote. To provide you with the most accurate estimate, I'll need to gather some quick information. What's your name?";
      }
      
      if (lowerMessage.includes('service') || lowerMessage.includes('lawn') || lowerMessage.includes('maintenance')) {
        return "We offer comprehensive lawn care services including weekly mowing, edging, trimming, leaf removal, and seasonal cleanup. We also provide fertilization and weed control programs. What specific service interests you most?";
      }
      
      if (lowerMessage.includes('area') || lowerMessage.includes('location') || lowerMessage.includes('serve')) {
        return "We proudly serve the greater metro area! We cover most neighborhoods within a 25-mile radius. If you share your ZIP code, I can confirm we service your area and potentially get you a quote started.";
      }
      
      if (lowerMessage.includes('hours') || lowerMessage.includes('time') || lowerMessage.includes('schedule')) {
        return "We're available Monday through Friday 7:00 AM to 6:00 PM, and Saturdays 8:00 AM to 4:00 PM. We're closed Sundays. Most of our services are scheduled during regular business hours, but we're flexible for special requests!";
      }
      
      return "Thanks for reaching out! We provide professional lawn maintenance including mowing, edging, trimming, and seasonal services. Are you looking for a one-time service or ongoing maintenance? I can also get you a free quote if you'd like!";
    }
    
    // Lead collection responses
    if (currentStep === 'collecting') {
      if (!leadData.name && !lowerMessage.includes('@') && !lowerMessage.includes('phone')) {
        setLeadData(prev => ({ ...prev, name: userMessage }));
        return `Nice to meet you, ${userMessage}! What's the best email address to send your quote to?`;
      }
      
      if (!leadData.email && lowerMessage.includes('@')) {
        setLeadData(prev => ({ ...prev, email: userMessage }));
        return "Perfect! And what's your phone number in case we need to follow up?";
      }
      
      if (!leadData.phone && (lowerMessage.includes('phone') || /\d{3}/.test(lowerMessage))) {
        setLeadData(prev => ({ ...prev, phone: userMessage }));
        return "Great! What's your property address so we can provide an accurate estimate?";
      }
      
      if (!leadData.address && !leadData.zip) {
        setLeadData(prev => ({ ...prev, address: userMessage }));
        return "Thanks! And what ZIP code is that in?";
      }
      
      if (!leadData.serviceType) {
        setLeadData(prev => ({ ...prev, zip: userMessage }));
        return "Perfect! What type of service are you most interested in? (Weekly mowing, one-time cleanup, full maintenance package, etc.)";
      }
      
      // Complete the lead collection
      setLeadData(prev => ({ ...prev, serviceType: userMessage }));
      setCurrentStep('complete');
      
      // Here you would typically send the lead data to your CRM or backend
      setTimeout(() => {
        toast({
          title: "Quote Request Submitted! 🎉",
          description: "We'll email you a detailed quote within 24 hours and follow up by phone.",
        });
      }, 1000);
      
      return "Excellent! I have all the information I need. You can expect a detailed quote via email within 24 hours, and one of our team members will follow up by phone to discuss timing and answer any questions. Is there anything else I can help you with about our services?";
    }
    
    // Post-completion responses
    return "Thanks for submitting your information! We'll be in touch soon. Feel free to ask about our services, scheduling, or anything else about Wilson's Lawn Maintenance!";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Get AI response
    const aiResponse = getAIResponse(input);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const handleInitialClick = () => {
    setShowInitialPrompt(false);
    setIsOpen(true);
    
    // Add initial greeting
    const greeting: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: "Hey there 👋 Looking for lawn care or a quick quote?",
      timestamp: new Date(),
    };
    setMessages([greeting]);
  };

  return (
    <>
      {/* Initial Popup Prompt */}
      {showInitialPrompt && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-4">
          <Card className="p-4 bg-gradient-primary text-primary-foreground shadow-lawn max-w-xs">
            <div className="flex items-start space-x-3">
              <MessageCircle className="h-6 w-6 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium">Hey there 👋</p>
                <p className="text-xs opacity-90 mt-1">Looking for lawn care or a quick quote?</p>
                <div className="flex space-x-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={handleInitialClick}
                    className="text-xs"
                  >
                    Yes, let's chat!
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowInitialPrompt(false)}
                    className="text-xs text-primary-foreground hover:bg-white/20"
                  >
                    Maybe later
                  </Button>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowInitialPrompt(false)}
                className="h-6 w-6 p-0 text-primary-foreground hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && !showInitialPrompt && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lawn hover:shadow-xl transition-all duration-300"
          variant="hero"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-card border border-border rounded-lg shadow-lawn animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-primary text-primary-foreground p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm">GreenGloveWebHelp</p>
                  <p className="text-xs opacity-90">Wilson's Lawn Care Assistant</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-primary-foreground hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 h-64 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage} variant="default">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;