import { Calendar, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const EarlyBird = false;

export function Registration() {
  const pricingTiers = [
    {
      name: "Student",
      price: "$200",
      originalPrice: "$250",
      description:
        "Perfect for students and early-career health tech researchers",
      // features: [
      //   "Full conference access",
      //   "Welcome reception",
      //   "Coffee breaks included",
      //   "Digital proceedings",
      //   "Student networking events",
      //   "Poster session participation"
      // ],
      badge: "Popular",
      badgeColor: "bg-[var(--pink)] text-[var(--off-white)]",
      popular: true,
    },
    {
      name: "Post-Doctoral",
      price: "$300",
      originalPrice: "$350",
      description: "Ideal for faculty and healthcare AI researchers",
      // features: [
      //   "Full conference access",
      //   "Welcome reception",
      //   "All meals included",
      //   "Digital & printed proceedings",
      //   "Workshop materials",
      //   "Networking dinner",
      //   "Certificate of attendance",
      //   "Priority seating"
      // ],
      // badge: "Best Value",
      badgeColor: "bg-[var(--gold)] text-[var(--maroon)]",
      popular: true,
    },
    {
      name: "Professional",
      price: "$400",
      originalPrice: "$450",
      description: "Comprehensive tier for health tech industry professionals",
      // features: [
      //   "Full conference access",
      //   "Welcome reception",
      //   "All meals included",
      //   "Digital & printed proceedings",
      //   "Premium workshop access",
      //   "VIP networking events",
      //   "Exhibition booth visits",
      //   "One-on-one speaker meetings",
      //   "Certificate of attendance",
      //   "Priority support"
      // ],
      badge: "Premium",
      badgeColor: "bg-[var(--maroon)] text-[var(--off-white)]",
      popular: true,
    },
  ];

  const importantDates = [
    {
      date: "December 20, 2025",
      event: "Session Proposal Submission Deadline",
      urgent: false,
    },
    {
      date: "January 30, 2026",
      event: "YSEA Registration Deadline",
      urgent: false,
    },
    {
      date: "February 17, 2026",
      event: "Abstract Submission Deadline",
      urgent: false,
    },
    {
      date: "February 21, 2026",
      event: "Early Bird Registration Deadline",
      urgent: true,
    },
    { date: "March 17th, 2026", event: "Registration Deadline", urgent: true },
  ];

  return (
    <section
      id="registration"
      className="py-20 px-4 bg-gradient-to-b from-[var(--pink)]/10 to-[var(--maroon)]/5 relative"
    >
      <div className="absolute top-20 left-1/4 w-24 h-24 border-2 border-[var(--gold)]/20 rotate-45"></div>
      <div className="absolute bottom-20 right-1/4 w-32 h-32 border-2 border-[var(--maroon)]/20 rotate-12"></div>

      <div className="container mx-auto relative z-10 mt-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
            <Badge
              variant="secondary"
              className="bg-[var(--maroon)] text-[var(--off-white)] px-4 py-1"
            >
              Registration
            </Badge>
            <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--maroon)] mb-6">
            Secure Your
            <span className="text-[var(--pink)]"> Spot</span>
          </h2>

          <p className="text-lg text-[var(--maroon)]/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Join the most prestigious gathering of healthcare AI and data
            science experts. Early bird pricing available for a limited time.
          </p>

          <div className="flex items-center justify-center space-x-2 text-[var(--maroon)]">
            <Calendar className="w-5 h-5 text-[var(--pink)]" />
            <span className="font-medium">
              Early Bird Ends: January 1, 2026
            </span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-[var(--maroon)]">
            <Button
              className="bg-[var(--gold)] text-[var(--maroon)] hover:bg-[var(--bronze)] mt-5"
              size="lg"
            >
              <a
                href="https://mcbios.com/membership?registration=true"
                target="_blank"
              >
                Register Now
              </a>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative p-8 bg-white/95 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-2xl ${
                tier.popular
                  ? "border-[var(--gold)] scale-105 hover:scale-110"
                  : "border-[var(--maroon)]/20 hover:border-[var(--pink)]/50"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className={tier.badgeColor}>
                    <Star className="w-3 h-3 mr-1" />
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[var(--maroon)] mb-2">
                  {tier.name}
                </h3>
                <p className="text-[var(--maroon)]/70 text-sm mb-4">
                  {tier.description}
                </p>

                <div className="space-y-1">
                  {EarlyBird ? (
                    <>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold text-[var(--maroon)]">
                          {tier.price}
                        </span>
                        <span className="text-lg text-[var(--maroon)]/60 line-through">
                          {tier.originalPrice}
                        </span>
                      </div>
                      <p className="text-[var(--pink)] text-sm font-medium">
                        Early Bird Price
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold text-[var(--maroon)]">
                          {tier.originalPrice}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* <div className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-[var(--pink)] mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--maroon)]/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div> */}
            </Card>
          ))}
        </div>

        {/* Important Dates */}
        {/* <div className="grid md:grid-cols-2 gap-8"> */}
        <div className="w-[95%] md:w-[65%] lg:w-[40%] gap-8 mx-auto">
          <Card className="p-8 bg-white/90 backdrop-blur-sm border-[var(--maroon)]/20">
            <h3 className="text-xl font-bold text-[var(--maroon)] mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[var(--pink)]" />
              Important Dates
            </h3>
            <div className="space-y-4">
              {importantDates.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-[var(--maroon)]/10 last:border-0"
                >
                  <span className="text-[var(--maroon)]/80">{item.event}</span>
                  <Badge
                    variant={item.urgent ? "default" : "outline"}
                    className={
                      item.urgent
                        ? "bg-[var(--pink)] text-[var(--off-white)]"
                        : "border-[var(--maroon)] text-[var(--maroon)]"
                    }
                  >
                    {item.date}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* <Card className="p-8 bg-white/90 backdrop-blur-sm border-[var(--maroon)]/20">
            <h3 className="text-xl font-bold text-[var(--maroon)] mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-[var(--pink)]" />
              Group Discounts
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--off-white)] rounded-lg border border-[var(--maroon)]/10">
                <h4 className="font-medium text-[var(--maroon)] mb-2">5+ Attendees</h4>
                <p className="text-[var(--maroon)]/70 text-sm mb-2">10% discount on all registration types</p>
                <Badge variant="outline" className="border-[var(--pink)] text-[var(--pink)]">Contact Us</Badge>
              </div>
              <div className="p-4 bg-[var(--off-white)] rounded-lg border border-[var(--maroon)]/10">
                <h4 className="font-medium text-[var(--maroon)] mb-2">10+ Attendees</h4>
                <p className="text-[var(--maroon)]/70 text-sm mb-2">15% discount + complimentary workshop</p>
                <Badge variant="outline" className="border-[var(--pink)] text-[var(--pink)]">Contact Us</Badge>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full border-[var(--maroon)] text-[var(--maroon)] hover:bg-[var(--maroon)] hover:text-[var(--off-white)]">
                  Get Group Pricing
                </Button>
              </div>
            </div>
          </Card> */}
        </div>
      </div>
    </section>
  );
}
