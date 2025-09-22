import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const contactInfo = {
    phone: "(215) 555-0199",
    email: "quotes@tesinsurance.com",
    address: "6622 Cormorant Pl, Philadelphia, PA 19142",
    hours: {
      weekdays: "Monday - Friday: 8:00 AM - 6:00 PM",
      saturday: "Saturday: 9:00 AM - 2:00 PM",
      sunday: "Sunday: Closed"
    }
  };

  const teamMembers = [
    {
      name: "Tesfie Tsegaye",
      role: "Founder & CEO",
      phone: "(215) 555-0199",
      email: "tesfie@tesinsurance.com",
      specialties: ["Auto Insurance", "Home Insurance", "Commercial Insurance"]
    },
    {
      name: "Sarah Johnson",
      role: "Senior Insurance Agent",
      phone: "(215) 555-0200",
      email: "sarah@tesinsurance.com",
      specialties: ["Home Insurance", "Renters Insurance", "Claims Support"]
    },
    {
      name: "Michael Rodriguez",
      role: "Commercial Specialist",
      phone: "(215) 555-0201",
      email: "michael@tesinsurance.com",
      specialties: ["General Liability", "Workers' Comp", "Business Insurance"]
    }
  ];

  const faqs = [
    {
      question: "How quickly can I get a quote?",
      answer: "Most quotes are provided within 24 hours. For urgent needs, we can often provide same-day quotes."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment options including monthly, quarterly, and annual payment plans."
    },
    {
      question: "What if I need to file a claim?",
      answer: "We provide 24/7 claims support. You can call us anytime, and we'll guide you through the process."
    },
    {
      question: "Can I bundle multiple policies?",
      answer: "Absolutely! Bundling auto and home insurance can save you up to 25% on your premiums."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with our experienced insurance professionals. We're here to help you find the perfect coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
                    <p className="text-slate-600">{contactInfo.phone}</p>
                    <p className="text-sm text-slate-500">Available during business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Email</h3>
                    <p className="text-slate-600">{contactInfo.email}</p>
                    <p className="text-sm text-slate-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Address</h3>
                    <p className="text-slate-600">{contactInfo.address}</p>
                    <p className="text-sm text-slate-500">Visit us at our office</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-50 rounded-xl">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-slate-600">
                  <p>{contactInfo.hours.weekdays}</p>
                  <p>{contactInfo.hours.saturday}</p>
                  <p>{contactInfo.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Get a Free Quote
                </h3>
                <p className="text-blue-800 mb-4">
                  Complete our online form to get personalized quotes from multiple carriers.
                </p>
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Your Quote
                </Link>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">
                  Need Help Now?
                </h3>
                <p className="text-green-800 mb-4">
                  For urgent insurance needs or claims, call us directly.
                </p>
                <a
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Call {contactInfo.phone}
                </a>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">
                  Schedule a Consultation
                </h3>
                <p className="text-purple-800 mb-4">
                  Book a free consultation to discuss your insurance needs.
                </p>
                <a
                  href={`mailto:${contactInfo.email}?subject=Schedule Consultation`}
                  className="inline-flex items-center justify-center w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our experienced insurance professionals are here to help you find the right coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {member.role}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-slate-500">Phone:</span>
                    <a href={`tel:${member.phone.replace(/\D/g, '')}`} className="ml-2 text-slate-900 hover:text-blue-600">
                      {member.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-500">Email:</span>
                    <a href={`mailto:${member.email}`} className="ml-2 text-slate-900 hover:text-blue-600">
                      {member.email}
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Common questions about our insurance services and processes.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-slate-600">
              Located in the heart of Philadelphia, we're easily accessible by car or public transportation.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-slate-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {contactInfo.address}
                </h3>
                <p className="text-slate-600">
                  Interactive map would be integrated here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
