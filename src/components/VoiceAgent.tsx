import { useState } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, PhoneCall, PhoneOff, Mic, MicOff, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const VoiceAgent = () => {
  const [apiKey, setApiKey] = useState('');
  const [agentId, setAgentId] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const conversation = useConversation({
    onConnect: () => {
      toast({
        title: "GreenGloveLawnDesk Connected",
        description: "Voice agent is ready to handle calls",
      });
    },
    onDisconnect: () => {
      toast({
        title: "Call Ended",
        description: "Voice agent disconnected",
      });
    },
    onError: (error) => {
      toast({
        title: "Connection Error",
        description: "Please check your API key and agent ID",
        variant: "destructive",
      });
      console.error('Voice agent error:', error);
    },
    clientTools: {
      // Tool for collecting lead information
      collectLeadInfo: (parameters: { name: string; zip: string; service: string; phone?: string }) => {
        toast({
          title: "Lead Captured! 📋",
          description: `New lead: ${parameters.name} from ${parameters.zip} interested in ${parameters.service}`,
        });
        
        // Here you would typically send this data to your CRM or backend
        console.log('Lead collected:', parameters);
        
        return "Lead information has been successfully recorded in our system.";
      },
      
      // Tool for scheduling follow-up
      scheduleFollowUp: (parameters: { phone: string; preferredTime: string }) => {
        toast({
          title: "Follow-up Scheduled",
          description: `Will follow up at ${parameters.phone} during ${parameters.preferredTime}`,
        });
        
        return "Follow-up has been scheduled. We'll be in touch!";
      },
      
      // Tool for transferring to human
      transferToHuman: (parameters: { reason: string }) => {
        toast({
          title: "Transferring Call",
          description: `Transferring to human agent: ${parameters.reason}`,
        });
        
        return "Please hold while I transfer you to one of our team members.";
      }
    },
    overrides: {
      agent: {
        prompt: {
          prompt: `You are GreenGloveLawnDesk, the friendly and professional phone assistant for Wilson's Lawn Maintenance. 

PERSONALITY & TONE:
- Friendly and confident, like a reliable neighbor
- Professional but approachable
- Knowledgeable about lawn care
- Patient and helpful

YOUR GREETING:
"Hi! You've reached Wilson's Lawn Maintenance. What can I help you with today?"

YOUR MAIN RESPONSIBILITIES:
1. LEAD COLLECTION - Gather essential information:
   - Customer name
   - ZIP code (to confirm service area)
   - Type of service needed
   - Phone number for follow-up
   
2. PROVIDE INFORMATION about:
   - Services: Weekly mowing, landscaping, fertilization, seasonal cleanup
   - Service area: Greater metro area (25-mile radius)
   - Hours: Mon-Fri 7AM-6PM, Sat 8AM-4PM, Sun closed
   - Pricing: Free estimates, competitive rates
   - Payment: Cash, check, credit cards accepted
   
3. HANDLE COMMON REQUESTS:
   - Scheduling: "We can usually start service within a week"
   - Rescheduling: "We're flexible with weather delays"
   - Gate access: "We can work with lockbox codes or be there when you're home"
   - Pet areas: "We're experienced with properties that have pets"
   
4. OFFER FOLLOW-UP:
   - Text messaging with quote details
   - Email confirmation
   - Phone call from team member

IMPORTANT RULES:
- NEVER mention you're an AI
- Stay focused on lawn care services
- If asked about complex technical issues, offer to transfer to a human
- Always be helpful and solution-oriented
- Use the collectLeadInfo tool when you have name, ZIP, and service type
- Use scheduleFollowUp tool when customer wants follow-up
- Use transferToHuman tool if customer specifically requests to speak with a person

EXAMPLE RESPONSES:
Customer: "How much do you charge?"
You: "Our pricing depends on your property size and services needed. For most homes, weekly mowing ranges from $35-65 per visit. I'd be happy to get you a free estimate! Can I get your name and ZIP code to check our service area?"

Customer: "Do you do fertilization?"
You: "Absolutely! We offer complete fertilization programs with seasonal treatments. It's one of our most popular add-on services. Are you looking for a full lawn care package or just fertilization?"

Remember: Be conversational, helpful, and always aim to collect lead information while providing excellent customer service.`
        },
        firstMessage: "Hi! You've reached Wilson's Lawn Maintenance. What can I help you with today?",
        language: "en",
      },
    },
  });

  const handleSetup = () => {
    if (!apiKey || !agentId) {
      toast({
        title: "Missing Information",
        description: "Please enter both API key and Agent ID",
        variant: "destructive",
      });
      return;
    }
    setIsSetup(true);
    setShowSettings(false);
    toast({
      title: "Voice Agent Setup Complete",
      description: "GreenGloveLawnDesk is ready to handle calls",
    });
  };

  const startCall = async () => {
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Use the provided agent ID to start conversation
      await conversation.startSession({ 
        agentId: agentId 
      });
    } catch (error) {
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use the voice agent",
        variant: "destructive",
      });
    }
  };

  const endCall = async () => {
    await conversation.endSession();
  };

  if (!isSetup) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-6 w-6" />
            <span>GreenGloveLawnDesk Setup</span>
          </CardTitle>
          <CardDescription>
            Configure your ElevenLabs voice agent for handling phone calls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">ElevenLabs API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your ElevenLabs API key"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="agentId">Agent ID</Label>
            <Input
              id="agentId"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              placeholder="Enter your ElevenLabs Agent ID"
            />
            <p className="text-xs text-muted-foreground">
              Create your agent at elevenlabs.io and copy the Agent ID here
            </p>
          </div>
          
          <Button onClick={handleSetup} className="w-full">
            Setup Voice Agent
          </Button>
          
          <div className="text-xs text-muted-foreground">
            <p className="font-semibold mb-1">Need help setting up?</p>
            <p>1. Create an account at elevenlabs.io</p>
            <p>2. Create a new Conversational AI agent</p>
            <p>3. Copy your API key and Agent ID</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Agent Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="h-6 w-6" />
              <span>GreenGloveLawnDesk</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>
            Professional voice agent for Wilson's Lawn Maintenance
          </CardDescription>
        </CardHeader>
        
        {showSettings && (
          <CardContent className="border-t space-y-4">
            <div className="space-y-2">
              <Label>Agent Status</Label>
              <p className="text-sm text-muted-foreground">
                Status: {conversation.status === 'connected' ? '🟢 Connected' : '🔴 Disconnected'}
              </p>
              <p className="text-sm text-muted-foreground">
                Speaking: {conversation.isSpeaking ? '🎤 Speaking' : '🔇 Listening'}
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsSetup(false)}
              className="w-full"
            >
              Reconfigure Agent
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Call Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            {conversation.status === 'connected' ? (
              <div className="space-y-4">
                <div className="h-20 w-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
                  {conversation.isSpeaking ? (
                    <Mic className="h-8 w-8 text-primary-foreground" />
                  ) : (
                    <MicOff className="h-8 w-8 text-primary-foreground" />
                  )}
                </div>
                
                <div>
                  <p className="font-semibold">Call in Progress</p>
                  <p className="text-sm text-muted-foreground">
                    {conversation.isSpeaking ? 'Agent is speaking...' : 'Listening for customer...'}
                  </p>
                </div>
                
                <Button
                  onClick={endCall}
                  variant="destructive"
                  size="lg"
                  className="w-full"
                >
                  <PhoneOff className="mr-2 h-5 w-5" />
                  End Call
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <PhoneCall className="h-8 w-8 text-muted-foreground" />
                </div>
                
                <div>
                  <p className="font-semibold">Ready to Take Calls</p>
                  <p className="text-sm text-muted-foreground">
                    Click to test the voice agent
                  </p>
                </div>
                
                <Button
                  onClick={startCall}
                  size="lg"
                  className="w-full"
                >
                  <PhoneCall className="mr-2 h-5 w-5" />
                  Start Test Call
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agent Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Greeting:</strong> "Hi! You've reached Wilson's Lawn Maintenance. What can I help you with today?"</p>
          <p><strong>Lead Collection:</strong> Gathers name, ZIP code, service needs, and phone number</p>
          <p><strong>Services Info:</strong> Explains lawn care services, pricing, and scheduling</p>
          <p><strong>Transfer Option:</strong> Can transfer to human when requested</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAgent;