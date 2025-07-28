import VoiceAgent from "@/components/VoiceAgent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Users, Clock, TrendingUp } from 'lucide-react';

const VoiceAgentPage = () => {
  const features = [
    {
      icon: Phone,
      title: "Professional Phone Handling",
      description: "Answers calls with a friendly, professional greeting and consistent service"
    },
    {
      icon: Users,
      title: "Lead Collection",
      description: "Gathers customer information including name, ZIP code, and service needs"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss a potential customer call, even outside business hours"
    },
    {
      icon: TrendingUp,
      title: "CRM Integration",
      description: "Automatically logs leads and follow-up actions for your team"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            GreenGloveLawnDesk Voice Agent
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional voice AI agent for Wilson's Lawn Maintenance. Handles phone calls, 
            collects leads, and provides customer service with a friendly, reliable tone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Voice Agent Setup */}
          <div>
            <VoiceAgent />
          </div>

          {/* Features & Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Features</CardTitle>
                <CardDescription>
                  Everything you need for professional phone support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-10 w-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Information Provided:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Service offerings and pricing</li>
                    <li>• Business hours and scheduling</li>
                    <li>• Service area coverage</li>
                    <li>• Payment options</li>
                    <li>• General lawn care advice</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Lead Collection:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Customer name and contact info</li>
                    <li>• Property location (ZIP code)</li>
                    <li>• Service type requested</li>
                    <li>• Follow-up preferences</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Smart Actions:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Schedules follow-up calls</li>
                    <li>• Transfers to human when needed</li>
                    <li>• Logs all interactions</li>
                    <li>• Sends confirmation messages</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm opacity-90">
                    <strong>1. Setup:</strong> Enter your ElevenLabs API key and Agent ID
                  </p>
                  <p className="text-sm opacity-90">
                    <strong>2. Test:</strong> Try a test call to ensure everything works
                  </p>
                  <p className="text-sm opacity-90">
                    <strong>3. Deploy:</strong> Connect to your phone system
                  </p>
                </div>
                <p className="text-xs opacity-75 pt-2 border-t border-white/20">
                  Need help setting up? Contact your system administrator or check the ElevenLabs documentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentPage;