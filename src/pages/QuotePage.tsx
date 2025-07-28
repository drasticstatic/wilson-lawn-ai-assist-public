import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator, CheckCircle, Phone, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const QuotePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    propertySize: '',
    serviceType: '',
    frequency: '',
    additionalServices: [] as string[],
    specialRequests: '',
    preferredContact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission and lead processing
    setTimeout(() => {
      toast({
        title: "Quote Request Submitted! 🎉",
        description: "Thank you! We'll email you a detailed quote within 24 hours and follow up by phone to discuss your needs.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        zip: '',
        propertySize: '',
        serviceType: '',
        frequency: '',
        additionalServices: [],
        specialRequests: '',
        preferredContact: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: checked 
        ? [...prev.additionalServices, service]
        : prev.additionalServices.filter(s => s !== service)
    }));
  };

  const additionalServices = [
    { id: 'edging', label: 'Professional Edging', description: 'Clean lines around walkways and beds' },
    { id: 'trimming', label: 'Shrub & Bush Trimming', description: 'Maintain shape and health of plants' },
    { id: 'cleanup', label: 'Seasonal Cleanup', description: 'Leaf removal and debris cleaning' },
    { id: 'fertilizer', label: 'Fertilization Program', description: 'Seasonal feeding for healthy growth' },
    { id: 'weed', label: 'Weed Control', description: 'Pre and post-emergent treatments' },
    { id: 'mulching', label: 'Mulch Installation', description: 'Fresh mulch for garden beds' }
  ];

  const pricingEstimates = [
    { size: 'Small (Under 5,000 sq ft)', price: '$35-$45/visit', description: 'Perfect for townhomes and small yards' },
    { size: 'Medium (5,000-10,000 sq ft)', price: '$45-$65/visit', description: 'Most common residential properties' },
    { size: 'Large (10,000-20,000 sq ft)', price: '$65-$95/visit', description: 'Larger homes with extensive lawns' },
    { size: 'Extra Large (20,000+ sq ft)', price: 'Custom Quote', description: 'Estate properties and commercial accounts' }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calculator className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get Your Free Quote
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Tell us about your property and lawn care needs, and we'll provide a detailed, 
            no-obligation quote within 24 hours. It's completely free with no hidden fees.
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <CardHeader className="p-0 mb-8">
                  <CardTitle className="text-3xl">Request Your Free Quote</CardTitle>
                  <CardDescription className="text-base">
                    The more details you provide, the more accurate your quote will be. 
                    All information is kept confidential.
                  </CardDescription>
                </CardHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                      Contact Information
                    </h3>
                    
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
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
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
                  </div>

                  {/* Property Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                      Property Information
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Property Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="123 Main Street, City, State"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                          placeholder="12345"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Approximate Property Size</Label>
                        <Select onValueChange={(value) => handleSelectChange('propertySize', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (Under 5,000 sq ft)</SelectItem>
                            <SelectItem value="medium">Medium (5,000-10,000 sq ft)</SelectItem>
                            <SelectItem value="large">Large (10,000-20,000 sq ft)</SelectItem>
                            <SelectItem value="xlarge">Extra Large (20,000+ sq ft)</SelectItem>
                            <SelectItem value="unknown">Not sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Service Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                      Service Requirements
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Primary Service Needed</Label>
                        <Select onValueChange={(value) => handleSelectChange('serviceType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mowing">Weekly Lawn Mowing</SelectItem>
                            <SelectItem value="full">Complete Maintenance Package</SelectItem>
                            <SelectItem value="seasonal">Seasonal Services</SelectItem>
                            <SelectItem value="onetime">One-Time Cleanup</SelectItem>
                            <SelectItem value="custom">Custom Service Plan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Service Frequency</Label>
                        <Select onValueChange={(value) => handleSelectChange('frequency', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="How often?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="seasonal">Seasonal</SelectItem>
                            <SelectItem value="onetime">One-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Additional Services */}
                    <div className="space-y-3">
                      <Label>Additional Services (Select all that apply)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {additionalServices.map((service) => (
                          <div key={service.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                            <Checkbox
                              id={service.id}
                              checked={formData.additionalServices.includes(service.id)}
                              onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                            />
                            <div className="flex-1">
                              <Label htmlFor={service.id} className="cursor-pointer font-medium">
                                {service.label}
                              </Label>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                      Additional Information
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Any specific requirements, challenges, or questions? (e.g., pet areas, gate access, current lawn conditions, timing preferences, etc.)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Contact Method</Label>
                      <Select onValueChange={(value) => handleSelectChange('preferredContact', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="How would you like us to follow up?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="text">Text Message</SelectItem>
                          <SelectItem value="any">Any method is fine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting Request..."
                    ) : (
                      <>
                        Get My Free Quote <Calculator className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Guide */}
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">Pricing Guide</CardTitle>
                  <CardDescription>
                    Typical pricing ranges for our most popular services
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {pricingEstimates.map((estimate, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold text-sm">{estimate.size}</h4>
                      <p className="text-primary font-bold">{estimate.price}</p>
                      <p className="text-xs text-muted-foreground">{estimate.description}</p>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground mt-4">
                    Final pricing depends on specific property conditions and services selected. 
                    All quotes include detailed breakdowns with no hidden fees.
                  </p>
                </CardContent>
              </Card>

              {/* What's Included */}
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">What's Included</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  {[
                    'Detailed property assessment',
                    'Customized service recommendations',
                    'Transparent pricing breakdown',
                    'Flexible scheduling options',
                    'Satisfaction guarantee',
                    'No obligation to purchase'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="p-6 bg-gradient-primary text-primary-foreground">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <p className="opacity-90 text-sm">
                    Have questions about our services or need a quote urgently? 
                    We're here to help!
                  </p>
                  <div className="space-y-2">
                    <a href="tel:(555)123-LAWN" className="flex items-center space-x-2 text-sm hover:underline">
                      <Phone className="h-4 w-4" />
                      <span>(555) 123-LAWN</span>
                    </a>
                    <a href="mailto:info@wilsonslawn.com" className="flex items-center space-x-2 text-sm hover:underline">
                      <Mail className="h-4 w-4" />
                      <span>info@wilsonslawn.com</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuotePage;