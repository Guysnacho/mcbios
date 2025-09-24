import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Facebook,
  ExternalLink,
  Calendar,
  Users
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Speakers", href: "#speakers" },
    { name: "Schedule", href: "#schedule" },
    { name: "Registration", href: "#registration" }
  ];

  const resources = [
    { name: "Call for Papers", href: "#" },
    { name: "Travel Information", href: "#" },
    { name: "Accommodation", href: "#" },
    { name: "Sponsorship", href: "#" }
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" }
  ];

  return (
    <footer className="bg-[var(--maroon)] text-[var(--off-white)] relative overflow-hidden">
      {/* Art Deco Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(45deg, var(--gold) 25%, transparent 25%),
            linear-gradient(-45deg, var(--gold) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, var(--gold) 75%),
            linear-gradient(-45deg, transparent 75%, var(--gold) 75%)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }}>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Conference Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--gold)] to-[var(--bronze)] rounded-lg flex items-center justify-center">
                  <span className="text-[var(--maroon)] font-bold text-xl">M</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl">MCBios 2026</h3>
                  <p className="text-[var(--off-white)]/80 text-sm">Florida Conference</p>
                </div>
              </div>
              
              <p className="text-[var(--off-white)]/80 leading-relaxed">
                The premier gathering bridging data, AI, and innovation to transform health, 
                fostering collaboration between researchers, clinicians, and technologists.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-[var(--off-white)]/80">
                  <Calendar className="w-4 h-4 text-[var(--gold)]" />
                  <span>March 15-17, 2026</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--off-white)]/80">
                  <MapPin className="w-4 h-4 text-[var(--gold)]" />
                  <span>Miami, Florida</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--off-white)]/80">
                  <Users className="w-4 h-4 text-[var(--gold)]" />
                  <span>500+ Expected Attendees</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-[var(--gold)]">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="block text-[var(--off-white)]/80 hover:text-[var(--gold)] transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold mb-6 text-[var(--gold)]">Resources</h4>
              <nav className="space-y-3">
                {resources.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center space-x-2 text-[var(--off-white)]/80 hover:text-[var(--gold)] transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="font-bold mb-6 text-[var(--gold)]">Contact</h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-[var(--off-white)]/80">
                  <Mail className="w-4 h-4 text-[var(--gold)]" />
                  <a href="mailto:info@mcbios2026.org" className="hover:text-[var(--gold)] transition-colors">
                    info@mcbios2026.org
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-[var(--off-white)]/80">
                  <Phone className="w-4 h-4 text-[var(--gold)]" />
                  <a href="tel:+1-555-MCBIOS" className="hover:text-[var(--gold)] transition-colors">
                    +1 (555) MCBIOS
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-medium text-[var(--gold)]">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="p-2 bg-[var(--off-white)]/10 rounded-lg hover:bg-[var(--gold)]/20 hover:text-[var(--gold)] transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-[var(--off-white)]/20" />

        {/* Newsletter Signup */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-[var(--gold)] mb-2">Stay Updated</h4>
              <p className="text-[var(--off-white)]/80">Get the latest news and updates about MCBios 2026</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-[var(--off-white)]/10 border border-[var(--off-white)]/20 rounded-lg text-[var(--off-white)] placeholder-[var(--off-white)]/60 focus:outline-none focus:border-[var(--gold)] min-w-64"
              />
              <Button className="bg-[var(--gold)] text-[var(--maroon)] hover:bg-[var(--bronze)] px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-[var(--off-white)]/20" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--off-white)]/60 text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <span>© 2026 MCBios Conference. All rights reserved.</span>
              <Badge variant="outline" className="border-[var(--gold)]/50 text-[var(--gold)]">
                Art Deco Design
              </Badge>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-[var(--gold)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--gold)] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[var(--gold)] transition-colors">Code of Conduct</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}