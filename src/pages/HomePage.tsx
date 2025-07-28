import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Scissors, Leaf, Calendar, Phone, MapPin, Clock } from 'lucide-react';
import heroImage from "@/assets/hero-lawn.jpg";
import serviceMowing from "@/assets/service-mowing.jpg";
import serviceLandscaping from "@/assets/service-landscaping.jpg";

const HomePage = () => {
  const services = [
    {
      title: "Weekly Lawn Mowing",
      description: "Professional mowing with precision edging and cleanup",
      icon: Scissors,
      image: serviceMowing,
    },
    {
      title: "Complete Landscaping",
      description: "Full property maintenance and seasonal services",
      icon: Leaf,
      image: serviceLandscaping,
    },
    {
      title: "Scheduled Maintenance",
      description: "Reliable, recurring service you can count on",
      icon: Calendar,
      image: heroImage,
    },
  ];

  const features = [
    "Licensed & Insured",
    "Free Estimates",
    "Reliable Service",
    "Professional Equipment",
    "Satisfaction Guaranteed",
    "Flexible Scheduling",
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Wilson's team has transformed our yard! Professional, reliable, and always exceeds expectations.",
      rating: 5,
    },
    {
      name: "Mike Peterson",
      text: "Been using them for 2 years. Always on time, fair pricing, and excellent results.",
      rating: 5,
    },
    {
      name: "Lisa Chen",
      text: "Finally found a lawn service I can trust. Highly recommend for anyone wanting a beautiful yard!",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-primary-dark to-primary">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your Lawn, 
              <span className="text-accent"> Perfected</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Professional lawn maintenance services that keep your property beautiful year-round. 
              Licensed, insured, and committed to excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/quote">
                <Button size="lg" variant="hero" className="text-lg px-8 py-4">
                  Get Free Quote Today
                </Button>
              </Link>
              <a href="tel:(555)123-LAWN">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (555) 123-LAWN
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white/80">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-accent" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-accent" />
                <span>Free Estimates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-accent" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Professional Lawn Care Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From weekly maintenance to complete property management, we provide comprehensive lawn care solutions tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="group hover:shadow-lawn transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" variant="default" className="text-lg px-8">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Why Choose Wilson's Lawn Maintenance?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                With years of experience and a commitment to excellence, we deliver reliable, professional lawn care services that exceed expectations every time.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-gradient-primary text-primary-foreground">
                <div className="flex items-center space-x-4">
                  <Phone className="h-8 w-8" />
                  <div>
                    <h3 className="text-lg font-semibold">Ready to Get Started?</h3>
                    <p className="opacity-90">Call us today for your free estimate</p>
                    <p className="text-xl font-bold mt-2">(555) 123-LAWN</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Service Area</h4>
                  <p className="text-sm text-muted-foreground">Greater Metro Area</p>
                </Card>
                
                <Card className="p-4 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Response Time</h4>
                  <p className="text-sm text-muted-foreground">24 Hour Quotes</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - hear from satisfied customers across the area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                <div className="font-semibold text-foreground">
                  - {testimonial.name}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for a Beautiful Lawn?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Get your free, no-obligation quote today and see why homeowners trust Wilson's Lawn Maintenance for all their lawn care needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get Free Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;