import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully! 📧",
        description: "Thank you for contacting us. We'll respond within 24 hours.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-LAWN",
      description: "Call for immediate assistance",
      action: "tel:(555)123-LAWN"
    },
    {
      icon: Mail,
      title: "Email", 
      details: "info@wilsonslawn.com",
      description: "Send us a detailed message",
      action: "mailto:info@wilsonslawn.com"
    },
    {
      icon: MapPin,
      title: "Service Area",
      details: "Greater Metro Area",
      description: "25-mile service radius",
      action: null
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 7AM-6PM",
      description: "Sat: 8AM-4PM, Sun: Closed",
      action: null
    }
  ];

  const faqs = [
    {
      question: "How quickly can you provide a quote?",
      answer: "We typically provide detailed quotes within 24 hours of your request. For urgent needs, we can often provide same-day estimates."
    },
    {
      question: "Do you offer emergency services?",
      answer: "Yes, we provide emergency services for storm cleanup, snow removal, and other urgent lawn care needs. Call our main number for emergency assistance."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, check, and all major credit cards. We also offer convenient online payment options for recurring customers."
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes, Wilson's Lawn Maintenance is fully licensed and carries comprehensive liability insurance for your protection and peace of mind."
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact Wilson's Lawn Maintenance
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Ready to transform your lawn? Have questions about our services? 
            We're here to help and typically respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lawn transition-all duration-300 hover:-translate-y-1">
                  <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {info.action ? (
                      <a 
                        href={info.action}
                        className="text-primary font-semibold hover:underline block mb-1"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-primary font-semibold mb-1">{info.details}</p>
                    )}
                    <CardDescription>{info.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your lawn care needs, property size, current challenges, or any questions you have..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="p-6 bg-gradient-primary text-primary-foreground">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">Need Immediate Assistance?</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="opacity-90">
                    For urgent lawn care needs or to speak with someone right away, 
                    give us a call during business hours.
                  </p>
                  <a href="tel:(555)123-LAWN">
                    <Button size="lg" variant="secondary" className="w-full">
                      <Phone className="mr-2 h-5 w-5" />
                      Call (555) 123-LAWN
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-foreground text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Quick Response</h4>
                      <p className="text-sm text-muted-foreground">We'll respond to your message within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-foreground text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Property Assessment</h4>
                      <p className="text-sm text-muted-foreground">We'll schedule a time to evaluate your lawn care needs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-foreground text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Detailed Quote</h4>
                      <p className="text-sm text-muted-foreground">Receive a comprehensive quote with no hidden fees</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;