import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Wifi, Car, Coffee, Utensils, Star } from "lucide-react";

export default function Page() {
  const hotels = [
    {
      name: "The Grand Floridian Resort",
      category: "Conference Hotel",
      distance: "On-site",
      rate: "$189/night",
      description:
        "Official conference hotel with special MCBios rates. Art deco inspired elegance meets modern comfort.",
      features: [
        "Direct conference access",
        "Complimentary WiFi",
        "Breakfast included",
        "Pool & fitness center",
        "Business center",
        "Valet parking",
      ],
      phone: "(407) 555-0123",
      rating: 4.8,
      popular: true,
    },
    {
      name: "Coastal Deco Suites",
      category: "Premium Partner",
      distance: "0.3 miles",
      rate: "$159/night",
      description:
        "Boutique hotel featuring authentic 1920s art deco architecture with modern amenities.",
      features: [
        "Free shuttle to venue",
        "Complimentary WiFi",
        "Continental breakfast",
        "Rooftop terrace",
        "Self parking",
        "Pet friendly",
      ],
      phone: "(407) 555-0124",
      rating: 4.6,
      popular: false,
    },
    {
      name: "Palm Beach Executive Inn",
      category: "Partner Hotel",
      distance: "0.8 miles",
      rate: "$129/night",
      description:
        "Comfortable accommodations with excellent value for extended stays and groups.",
      features: [
        "Complimentary WiFi",
        "Hot breakfast buffet",
        "Pool access",
        "Free parking",
        "Kitchenette available",
        "24/7 front desk",
      ],
      phone: "(407) 555-0125",
      rating: 4.3,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <section
        id="accommodations"
        className="pt-10 px-4 bg-gradient-to-b from-[var(--off-white)] to-[var(--pink)]/10 relative overflow-hidden"
      >
        {/* Art Deco Geometric Background Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 border-2 border-[var(--gold)]/30 rotate-45"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border-2 border-[var(--maroon)]/20 rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[var(--pink)]/5 rotate-45"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
              <Badge
                variant="secondary"
                className="bg-[var(--maroon)] text-[var(--off-white)] px-4 py-1"
              >
                Accommodations
              </Badge>
              <div className="w-12 h-0.5 bg-[var(--maroon)]"></div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-[var(--maroon)] mb-6">
              Where to
              <span className="text-[var(--pink)]"> Stay</span>
            </h2>

            <p className="text-lg text-[var(--maroon)]/80 max-w-3xl mx-auto leading-relaxed mb-4">
              There are several exceptional Florida hotels near the venue that
              provide MCBIOS 2026 attendees with competitive rates and
              convenient access.
            </p>

            <div className="flex items-center justify-center gap-4 text-[var(--maroon)]/70 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[var(--pink)]" />
                <span>All within walking distance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-[var(--gold)]" />
                <span>Exclusive conference rates</span>
              </div>
            </div>
          </div>

          {/* Hotel Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {hotels.map((hotel, index) => (
              <Card
                key={index}
                className={`relative p-6 bg-white/95 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-2xl ${
                  hotel.popular
                    ? "border-[var(--gold)] hover:scale-105"
                    : "border-[var(--maroon)]/20 hover:border-[var(--pink)]/50"
                }`}
              >
                {hotel.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[var(--gold)] text-[var(--maroon)]">
                      <Star className="w-3 h-3 mr-1" />
                      Conference Hotel
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-[var(--maroon)] mb-1">
                        {hotel.name}
                      </h3>
                      <Badge
                        variant="outline"
                        className="border-[var(--pink)] text-[var(--pink)] text-xs mb-2"
                      >
                        {hotel.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                      <span className="text-sm text-[var(--maroon)]">
                        {hotel.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[var(--maroon)]/70 text-sm mb-3">
                    <MapPin className="w-4 h-4 text-[var(--pink)]" />
                    <span>{hotel.distance}</span>
                  </div>

                  <p className="text-[var(--maroon)]/80 text-sm leading-relaxed mb-4">
                    {hotel.description}
                  </p>

                  <div className="bg-[var(--off-white)] p-3 rounded-lg mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-[var(--maroon)]">
                        {hotel.rate}
                      </span>
                      <span className="text-xs text-[var(--maroon)]/60">
                        Conference rate
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {hotel.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                    >
                      {featureIndex === 0 && (
                        <Wifi className="w-4 h-4 text-[var(--pink)]" />
                      )}
                      {featureIndex === 1 && (
                        <Wifi className="w-4 h-4 text-[var(--pink)]" />
                      )}
                      {featureIndex === 2 && (
                        <Coffee className="w-4 h-4 text-[var(--pink)]" />
                      )}
                      {featureIndex === 3 && (
                        <Utensils className="w-4 h-4 text-[var(--pink)]" />
                      )}
                      {featureIndex === 4 && (
                        <Car className="w-4 h-4 text-[var(--pink)]" />
                      )}
                      {featureIndex === 5 && (
                        <Car className="w-4 h-4 text-[var(--pink)]" />
                      )}
                      <span className="text-xs text-[var(--maroon)]/70">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Button
                    className={`w-full ${
                      hotel.popular
                        ? "bg-[var(--gold)] text-[var(--maroon)] hover:bg-[var(--bronze)]"
                        : "bg-[var(--maroon)] text-[var(--off-white)] hover:bg-[var(--pink)]"
                    }`}
                  >
                    Book Now
                  </Button>
                  <a
                    href={`tel:${hotel.phone}`}
                    className="flex items-center justify-center space-x-2 text-sm text-[var(--maroon)]/70 hover:text-[var(--pink)] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{hotel.phone}</span>
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <Card className="p-8 bg-gradient-to-r from-[var(--maroon)] to-[var(--pink)] text-[var(--off-white)] border-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Getting There
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Orlando International Airport (MCO): 45 minutes</li>
                  <li>• Tampa International Airport (TPA): 90 minutes</li>
                  <li>• Complimentary shuttle from MCO available</li>
                  <li>• Rental cars available at all airports</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Booking Information
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Mention code "MCBIOS2026" for special rates</li>
                  <li>• Book by February 15, 2026 for best availability</li>
                  <li>• Group rates available for 5+ rooms</li>
                  <li>• Contact us for extended stay arrangements</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
