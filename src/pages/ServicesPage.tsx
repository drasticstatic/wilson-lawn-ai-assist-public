import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Scissors, Leaf, Droplets, Wind, Snowflake, Flower, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import serviceMowing from "@/assets/service-mowing.jpg";
import serviceLandscaping from "@/assets/service-landscaping.jpg";

const ServicesPage = () => {
  const services = [
    {
      title: "Weekly Lawn Mowing",
      description: "Professional mowing service with precision cutting, edging, and cleanup",
      icon: Scissors,
      image: serviceMowing,
      features: [
        "Precision cutting at optimal height",
        "Professional edging around walkways",
        "Grass clipping cleanup",
        "Consistent weekly schedule",
        "Weather-flexible scheduling"
      ],
      pricing: "Starting at $35/visit"
    },
    {
      title: "Complete Landscaping",
      description: "Full property maintenance including trimming, pruning, and seasonal care",
      icon: Leaf,
      image: serviceLandscaping,
      features: [
        "Shrub and hedge trimming",
        "Garden bed maintenance",
        "Seasonal plant care",
        "Mulching services",
        "Property cleanup"
      ],
      pricing: "Custom quotes available"
    },
    {
      title: "Fertilization & Weed Control",
      description: "Professional lawn care programs to keep your grass healthy and weed-free",
      icon: Droplets,
      image: serviceMowing,
      features: [
        "Seasonal fertilization program",
        "Pre and post-emergent weed control",
        "Organic treatment options",
        "Soil pH testing",
        "Disease prevention"
      ],
      pricing: "Programs from $250/season"
    },
    {
      title: "Leaf Removal & Cleanup",
      description: "Comprehensive fall cleanup and debris removal services",
      icon: Wind,
      image: serviceLandscaping,
      features: [
        "Complete leaf removal",
        "Gutter cleaning service",
        "Branch and debris cleanup",
        "Property preparation for winter",
        "Eco-friendly disposal"
      ],
      pricing: "Seasonal packages available"
    },
    {
      title: "Snow Removal",
      description: "Reliable snow removal services to keep your property accessible",
      icon: Snowflake,
      image: serviceMowing,
      features: [
        "Driveway and walkway clearing",
        "Salt and de-icing application",
        "24-hour emergency service",
        "Commercial properties welcome",
        "Seasonal contracts available"
      ],
      pricing: "Per service or seasonal rates"
    },
    {
      title: "Garden & Flower Bed Care",
      description: "Professional garden maintenance and seasonal flower installations",
      icon: Flower,
      image: serviceLandscaping,
      features: [
        "Seasonal flower installation",
        "Garden bed weeding",
        "Mulch installation and refresh",
        "Plant health monitoring",
        "Custom garden design"
      ],
      pricing: "Design consultation included"
    }
  ];

  const serviceAreas = [
    "Downtown Metro",
    "Suburban Heights",
    "Riverside District",
    "Garden Valley",
    "Oak Park",
    "Maple Grove",
    "Pine Ridge",
    "Willow Creek"
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Professional Lawn Care Services
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Comprehensive lawn maintenance solutions designed to keep your property beautiful year-round. 
            From weekly mowing to complete landscaping, we've got you covered.
          </p>
          <Link to="/quote">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Get Your Free Quote Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="group hover:shadow-lawn transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-48 md:h-full overflow-hidden rounded-l-lg">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="h-10 w-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-0">
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-primary">{service.pricing}</span>
                          <Link to="/quote">
                            <Button variant="outline" size="sm">
                              Get Quote <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Areas We Serve
            </h2>
            <p className="text-xl text-muted-foreground">
              Proudly serving homeowners and businesses throughout the greater metro area
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {serviceAreas.map((area, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-card transition-shadow">
                <h3 className="font-semibold text-foreground">{area}</h3>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Don't see your area listed? Contact us - we're always expanding our service area!
            </p>
            <Link to="/contact">
              <Button variant="outline">
                Check Service Availability
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Service Process
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, transparent, and professional from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Free Consultation",
                description: "We assess your property and discuss your needs"
              },
              {
                step: "2", 
                title: "Custom Quote",
                description: "Receive a detailed, transparent estimate within 24 hours"
              },
              {
                step: "3",
                title: "Schedule Service",
                description: "We work around your schedule for convenient service"
              },
              {
                step: "4",
                title: "Ongoing Care",
                description: "Consistent, reliable service with quality guarantees"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Lawn?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Get started with a free consultation and quote. No obligations, just honest advice and professional service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Request Free Quote
              </Button>
            </Link>
            <a href="tel:(555)123-LAWN">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                Call (555) 123-LAWN
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;