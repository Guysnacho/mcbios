import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Baby,
  BanIcon,
  Briefcase,
  Coffee,
  DoorOpen,
  Dumbbell,
  MapPin,
  PawPrint,
  Phone,
  Smartphone,
  Star,
  UserCheck,
  Utensils,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";

export default function Page() {
  const hotels = [
    {
      name: "Home2 Suites by Hilton Tampa USF Near Busch Gardens",
      address: "11606 McKinley Dr, Tampa, FL 33612",
      distance: "0.5 miles • 3 min drive • 9 min walk",
      description:
        "Keep the kids happy at Adventure Island - a mile away, with Lowry Park Zoo nearby. Eat out at local restaurants or take advantage of a fully equipped in-room kitchen, complete with free WiFi and workspace. Enjoy some free breakfast before teeing off at a local golf course.",
      features: [
        { label: "Free hot breakfast", icon: Coffee },
        { label: "Free WiFi", icon: Wifi },
        { label: "Non-smoking rooms", icon: BanIcon },
        { label: "Outdoor pool", icon: Waves },
        { label: "Fitness center", icon: Dumbbell },
        { label: "Pet-friendly rooms", icon: PawPrint },
      ],
      phone: "(813) 750-8844",
      bookingUrl:
        "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=TPASFHT&arrivalDate=2026-03-26&departureDate=2026-03-29",
      popular: true,
    },
    {
      name: "Holiday Inn Tampa North",
      address: "3751 E. Fowler Ave, Tampa, FL 33612",
      distance: "0.7 miles • 3 min drive • 11 min walk",
      description:
        "Moffitt Cancer Center, The VA Hospital, Advent Health Hospital and Shriner's Hospital are just minutes from our hotel. Discover the genuine smiles and hospitality that our Holiday Inn Tampa North has to offer. Take time to unwind in our beautiful outdoor pool or work out according to your schedule in the 24-hour Fitness Center.",
      features: [
        { label: "1 pool", icon: Waves },
        { label: "Fitness center", icon: Dumbbell },
        { label: "In hotel restaurants", icon: Utensils },
        { label: "Pet friendly", icon: PawPrint },
        { label: "Kids eat free", icon: Baby },
        { label: "Business center", icon: Briefcase },
        { label: "Wireless internet", icon: Wifi },
      ],
      phone: "(813) 402-2982",
      bookingUrl:
        "https://www.ihg.com/hotels/us/en/find-hotels/select-roomrate?qDest=3751%20E.%20Fowler%20Ave,%20Tampa,%20FL,%20US&qPt=CASH",
      popular: false,
    },
    {
      name: "Embassy Suites by Hilton Tampa USF Near Busch Gardens",
      address: "3705 Spectrum Blvd, Tampa, FL 33612",
      distance: "0.7 miles • 5 min drive • 14 min walk",
      description:
        "Find us on the University of South Florida campus, in the USF Research Park. We're a Busch Gardens Preferred Partner and offer a free shuttle to the amusement park, five minutes away. We have an outdoor pool and a fitness center featuring a Peloton® Bike with toe cages. Enjoy free made-to-order breakfast and our complimentary Evening Reception.",
      features: [
        { label: "Connecting rooms", icon: DoorOpen },
        { label: "Free made-to-order breakfast", icon: Coffee },
        { label: "Complimentary evening reception", icon: Wine },
        { label: "Non-smoking rooms", icon: BanIcon },
        { label: "Digital key", icon: Smartphone },
        { label: "Concierge", icon: UserCheck },
      ],
      phone: "(813) 977-7066",
      bookingUrl:
        "https://www.hilton.com/en/hotels/tpafres-embassy-suites-tampa-usf-near-busch-gardens/",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section
        id="accommodations"
        className="pt-10 px-4 bg-gradient-to-b from-[var(--off-white)] to-[var(--pink)]/10 relative overflow-hidden"
      >
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
                <span>Competitive rates</span>
              </div>
            </div>
          </div>

          {/* Hotel Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {hotels.map((hotel, index) => (
              <Card
                key={index}
                className={`relative p-5 md:p-6 bg-white/95 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-2xl ${
                  hotel.popular
                    ? "border-[var(--gold)] sm:hover:scale-105"
                    : "border-[var(--maroon)]/20 hover:border-[var(--pink)]/50"
                }`}
              >
                {hotel.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[var(--gold)] text-[var(--maroon)] text-xs md:text-sm">
                      <Star className="w-3 h-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-bold text-[var(--maroon)] mb-3 text-base md:text-lg leading-tight">
                    {hotel.name}
                  </h3>

                  <div className="flex items-start space-x-2 text-[var(--maroon)]/70 text-sm mb-2">
                    <MapPin className="w-4 h-4 text-[var(--pink)] flex-shrink-0 mt-0.5" />
                    <span>{hotel.address}</span>
                  </div>

                  <div className="bg-[var(--off-white)] px-3 py-2 rounded text-xs text-[var(--maroon)]/70 mb-3">
                    {hotel.distance}
                  </div>

                  <p className="text-[var(--maroon)]/80 text-sm leading-relaxed mb-4">
                    {hotel.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  {hotel.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                    >
                      {feature.icon && (
                        <feature.icon className="w-4 h-4 text-[var(--pink)] flex-shrink-0" />
                      )}
                      <span className="text-xs text-[var(--maroon)]/70">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Button
                    asChild
                    className={`w-full text-sm md:text-base ${
                      hotel.popular
                        ? "bg-[var(--gold)] text-[var(--maroon)] hover:bg-[var(--bronze)]"
                        : "bg-[var(--maroon)] text-[var(--off-white)] hover:bg-[var(--pink)]"
                    }`}
                  >
                    <a
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Now
                    </a>
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
          <Card className="p-6 mb-16 md:p-8 bg-gradient-to-r from-[var(--maroon)] to-[var(--pink)] text-[var(--off-white)] border-0">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="font-bold mb-3 flex items-center text-base md:text-lg">
                  <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                  Getting There
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Tampa International Airport (TPA): 24 minutes</li>
                  <li>
                    • Orlando International Airport (MCO, Not recommended): 82
                    minutes
                  </li>
                  <li>• Rental cars available at all airports</li>
                  <li>• Rideshare services readily available</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 flex items-center text-base md:text-lg">
                  <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                  Booking Tips
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Book early for best availability</li>
                  <li>• Contact hotels directly for current rates</li>
                  {/* <li>• Group rates may be available upon request</li> */}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
