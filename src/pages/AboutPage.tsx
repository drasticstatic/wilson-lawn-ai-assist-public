import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Award, Users, Clock, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from "@/assets/hero-lawn.jpg";

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed and comprehensively insured for your peace of mind and protection."
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "We stand behind our work with a 100% satisfaction guarantee on every service."
    },
    {
      icon: Users,
      title: "Experienced Team",
      description: "Our skilled professionals bring years of lawn care expertise to every project."
    },
    {
      icon: Clock,
      title: "Reliable Service",
      description: "Consistent, on-time service you can count on throughout the seasons."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "15+", label: "Years Experience" },
    { number: "10,000+", label: "Lawns Maintained" },
    { number: "98%", label: "Customer Satisfaction" }
  ];

  const teamMembers = [
    {
      name: "Mike Wilson",
      role: "Owner & Founder", 
      description: "With over 15 years in lawn care, Mike founded Wilson's Lawn Maintenance to provide reliable, professional service to homeowners throughout the metro area."
    },
    {
      name: "Sarah Martinez",
      role: "Operations Manager",
      description: "Sarah ensures every job meets our high standards and coordinates our team to deliver consistent, quality service to all our customers."
    },
    {
      name: "Tom Rodriguez", 
      role: "Lead Landscaper",
      description: "Tom brings creative landscaping expertise and attention to detail, helping transform ordinary yards into beautiful outdoor spaces."
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About Wilson's Lawn Maintenance
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Since 2009, we've been committed to providing exceptional lawn care services that enhance the beauty and value of properties throughout the greater metro area.
              </p>
              <Link to="/quote">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Get Started Today
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Professional lawn maintenance"
                className="rounded-lg shadow-lawn w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">
              Our Story
            </h2>
            <div className="text-lg text-muted-foreground space-y-6">
              <p>
                Wilson's Lawn Maintenance began as a small, family-owned business with a simple mission: 
                to provide reliable, professional lawn care services that homeowners can trust. What started 
                with one truck and a passion for beautiful lawns has grown into the area's premier lawn maintenance company.
              </p>
              <p>
                Over the years, we've built our reputation on consistent quality, fair pricing, and exceptional 
                customer service. We understand that your lawn is more than just grass – it's where your family 
                creates memories, where you relax after a long day, and an important part of your home's curb appeal.
              </p>
              <p>
                Today, we're proud to serve hundreds of satisfied customers throughout the metro area, 
                maintaining everything from cozy residential lawns to expansive commercial properties. 
                Our commitment to excellence remains unchanged: every lawn we service receives the same 
                attention to detail and professional care that built our reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Trusted by the Community
            </h2>
            <p className="text-xl text-muted-foreground">
              The numbers speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-muted-foreground">
              Our core values guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lawn transition-shadow">
                  <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground">
              The dedicated professionals behind Wilson's Lawn Maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="h-20 w-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary-foreground" />
                </div>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Why Homeowners Choose Wilson's
              </h2>
              <div className="space-y-4">
                {[
                  "Consistent, reliable weekly service",
                  "Professional equipment and techniques", 
                  "Transparent pricing with no hidden fees",
                  "Flexible scheduling around your needs",
                  "Satisfaction guarantee on every service",
                  "Fully licensed and insured for your protection",
                  "Local, family-owned business you can trust",
                  "Responsive customer service and communication"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8 bg-gradient-primary text-primary-foreground">
              <div className="text-center">
                <Star className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h3>
                <p className="opacity-90 mb-6">
                  Join hundreds of satisfied customers who trust Wilson's Lawn Maintenance 
                  for all their lawn care needs.
                </p>
                <div className="space-y-3">
                  <Link to="/quote">
                    <Button size="lg" variant="secondary" className="w-full text-lg">
                      Get Your Free Quote
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="w-full text-lg border-white text-white hover:bg-white hover:text-primary">
                      Contact Us Today
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;