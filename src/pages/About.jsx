import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  const team = [
    {
      name: "Tesfie Tsegaye",
      role: "Founder & CEO",
      description: "Licensed insurance professional focused on providing personalized service and competitive rates to the Philadelphia community. Tesfie founded Tes Insurance Agency to help individuals and businesses find the right coverage.",
      specialties: ["Auto Insurance", "Home Insurance", "Commercial Insurance", "Risk Management"]
    },
    {
      name: "Sarah Johnson",
      role: "Insurance Agent",
      description: "Specializes in homeowners and renters insurance with a focus on helping families find comprehensive coverage that fits their budget.",
      specialties: ["Home Insurance", "Renters Insurance", "Umbrella Insurance", "Claims Support"]
    },
    {
      name: "Michael Rodriguez",
      role: "Commercial Insurance Specialist",
      description: "Expert in commercial insurance solutions for small to medium businesses, helping entrepreneurs protect their investments and operations.",
      specialties: ["General Liability", "Workers' Compensation", "Commercial Auto", "Business Insurance"]
    }
  ];

  const values = [
    {
      title: "Integrity",
      description: "We believe in honest, transparent communication and always put our clients' best interests first.",
      icon: "🤝"
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from customer service to finding the best coverage options.",
      icon: "⭐"
    },
    {
      title: "Innovation",
      description: "We leverage technology and industry expertise to provide modern insurance solutions.",
      icon: "💡"
    },
    {
      title: "Community",
      description: "We're proud to serve the Philadelphia community and support local businesses and families.",
      icon: "🏘️"
    }
  ];

  const stats = [
    { number: "50+", label: "Insurance Carriers" },
    { number: "24/7", label: "Claims Support" },
    { number: "100%", label: "Customer Focused" },
    { number: "Free", label: "Quotes & Consultations" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Tes Insurance Agency
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your trusted local insurance partner, dedicated to protecting what matters most to you and your family.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Tes Insurance Agency was founded with a simple mission: to provide honest, 
                  personalized insurance solutions to the Philadelphia community. Our founder, Tesfie Tsegaye, 
                  recognized that many people were overpaying for insurance or had coverage gaps that left them vulnerable.
                </p>
                <p>
                  As a new agency, we're building our reputation through exceptional service and 
                  competitive rates. We're committed to personalized service while expanding our 
                  capabilities to serve a wide range of insurance needs.
                </p>
                <p>
                  We work with over 50 top-rated insurance carriers to find the best coverage at the 
                  most competitive rates. Our team of licensed professionals combines industry knowledge 
                  with genuine care for our clients' well-being.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Licensed and dedicated professionals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Access to 50+ top-rated insurance carriers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Personalized service tailored to your needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>24/7 claims support and customer service</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Local expertise with community focus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Competitive rates and flexible payment options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our clients.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our experienced professionals are here to help you find the right insurance solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
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
                <p className="text-slate-600 mb-4">
                  {member.description}
                </p>
                <div>
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

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let our experienced team help you find the perfect insurance coverage for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-medium text-blue-700 shadow hover:bg-blue-50 transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3 font-medium text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
