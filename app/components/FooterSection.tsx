import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase">
              excellusense llc
            </h3>
            <p className="mb-4 text-muted-foreground">
              We build amazing digital experiences that make a difference.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  123 Street, City, Country
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">+1 234 567 890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">info@example.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4 text-muted-foreground">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex flex-col space-y-2">
              <Input type="email" placeholder="Your email address" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© {currentYear} Company Name. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

//  <footer className="bg-slate-950 text-slate-200">
//    <div className="container mx-auto px-4 py-10">
//      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//        {/* Company Info */}
//        <div>
//          <h3 className="text-xl font-bold mb-4">Company Name</h3>
//          <p className="mb-4 text-slate-400">
//            We build amazing digital experiences that make a difference.
//          </p>
//          <div className="flex space-x-4 mt-4">
//            <a
//              href="#"
//              className="text-slate-400 hover:text-white transition-colors"
//            >
//              <Facebook size={20} />
//            </a>
//            <a
//              href="#"
//              className="text-slate-400 hover:text-white transition-colors"
//            >
//              <Twitter size={20} />
//            </a>
//            <a
//              href="#"
//              className="text-slate-400 hover:text-white transition-colors"
//            >
//              <Instagram size={20} />
//            </a>
//            <a
//              href="#"
//              className="text-slate-400 hover:text-white transition-colors"
//            >
//              <Linkedin size={20} />
//            </a>
//            <a
//              href="#"
//              className="text-slate-400 hover:text-white transition-colors"
//            >
//              <Github size={20} />
//            </a>
//          </div>
//        </div>

//        {/* Quick Links */}
//        <div>
//          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//          <ul className="space-y-2">
//            <li>
//              <a
//                href="#"
//                className="text-slate-400 hover:text-white transition-colors"
//              >
//                Home
//              </a>
//            </li>
//            <li>
//              <a
//                href="#"
//                className="text-slate-400 hover:text-white transition-colors"
//              >
//                About
//              </a>
//            </li>
//            <li>
//              <a
//                href="#"
//                className="text-slate-400 hover:text-white transition-colors"
//              >
//                Services
//              </a>
//            </li>
//            <li>
//              <a
//                href="#"
//                className="text-slate-400 hover:text-white transition-colors"
//              >
//                Projects
//              </a>
//            </li>
//            <li>
//              <a
//                href="#"
//                className="text-slate-400 hover:text-white transition-colors"
//              >
//                Contact
//              </a>
//            </li>
//          </ul>
//        </div>

//        {/* Contact Info */}
//        <div>
//          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//          <ul className="space-y-4">
//            <li className="flex items-center">
//              <MapPin className="mr-2 h-5 w-5 text-slate-400" />
//              <span className="text-slate-400">
//                123 Street, City, Country
//              </span>
//            </li>
//            <li className="flex items-center">
//              <Phone className="mr-2 h-5 w-5 text-slate-400" />
//              <span className="text-slate-400">+1 234 567 890</span>
//            </li>
//            <li className="flex items-center">
//              <Mail className="mr-2 h-5 w-5 text-slate-400" />
//              <span className="text-slate-400">info@example.com</span>
//            </li>
//          </ul>
//        </div>

//        {/* Newsletter */}
//        <div>
//          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
//          <p className="mb-4 text-slate-400">
//            Subscribe to our newsletter for the latest updates.
//          </p>
//          <div className="flex flex-col space-y-2">
//            <Input
//              type="email"
//              placeholder="Your email address"
//              className="bg-slate-800 border-slate-700 text-white"
//            />
//            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//              Subscribe
//            </Button>
//          </div>
//        </div>
//      </div>

//      <Separator className="my-8 bg-slate-800" />

//      <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
//        <p>© {currentYear} Company Name. All rights reserved.</p>
//        <div className="mt-4 md:mt-0">
//          <ul className="flex space-x-6">
//            <li>
//              <a href="#" className="hover:text-white transition-colors">
//                Privacy Policy
//              </a>
//            </li>
//            <li>
//              <a href="#" className="hover:text-white transition-colors">
//                Terms of Service
//              </a>
//            </li>
//            <li>
//              <a href="#" className="hover:text-white transition-colors">
//                Cookie Policy
//              </a>
//            </li>
//          </ul>
//        </div>
//      </div>
//    </div>
//  </footer>
