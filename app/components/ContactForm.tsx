// app/contact/page.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneIcon, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    agreeToPrivacy: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToPrivacy: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6   ">
      <div className="max-w-5xl mx-auto dark:bg-gray-900 p-12 rounded-2xl shadow-lg ">
        <p className="text-gray-500 mb-2">Contact us</p>
        <h1 className="text-4xl font-bold mb-6">Get in touch</h1>

        <p className="text-gray-600 mb-8">
          We'd love to hear from you! Our team is ready to respond within 24
          hours and help with any questions you might have about our services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 ">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message"
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-32"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy"
                  checked={formData.agreeToPrivacy}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  By selecting this you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white dark:bg-gray-700 hover:bg-gray-900"
              >
                Send message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <Card className="bg-emerald-100 hover:bg-emerald-200">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-2 dark:bg-gray-800 rounded-full">
                    <PhoneIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 dark:text-gray-900">
                      Call us
                    </h3>
                    <Link
                      href="tel:+14005006000"
                      className="text-gray-600 hover:underline"
                    >
                      +1 400 500 600
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-emerald-100 hover:bg-emerald-200">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-2 dark:bg-gray-800 rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 dark:text-gray-800">
                      Write an email
                    </h3>
                    <Link
                      href="mailto:hello@example.com"
                      className="text-gray-600 hover:underline"
                    >
                      hello@example.com
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-emerald-100 hover:bg-emerald-200">
              <CardContent className="pt-6  ">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-2 dark:bg-gray-800 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 dark:text-gray-800">
                      Visit our office
                    </h3>
                    <address className="not-italic text-gray-600">
                      <Link
                        href="https://maps.google.com/?q=192+Griffin+Street,+Gilbert,+AZ+32521"
                        target="_blank"
                        className="hover:underline"
                      >
                        192 Griffin Street, Gilbert, AZ 32521
                      </Link>
                    </address>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
