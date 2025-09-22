import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      id: "auto",
      title: "Auto Insurance",
      description: "Comprehensive auto insurance coverage to protect you and your vehicle on the road.",
      icon: "🚗",
      features: [
        "Liability Coverage",
        "Collision & Comprehensive",
        "Uninsured/Underinsured Motorist",
        "Personal Injury Protection",
        "Roadside Assistance",
        "Rental Car Coverage"
      ],
      benefits: [
        "Competitive rates from top carriers",
        "Multi-vehicle discounts",
        "Safe driver discounts",
        "24/7 claims support",
        "Flexible payment options"
      ],
      coverageTypes: [
        {
          name: "Liability Coverage",
          description: "Protects you if you're at fault in an accident, covering damage to other vehicles and property.",
          required: true
        },
        {
          name: "Collision Coverage",
          description: "Covers damage to your vehicle from collisions with other vehicles or objects.",
          required: false
        },
        {
          name: "Comprehensive Coverage",
          description: "Protects against non-collision damage like theft, vandalism, weather, and animal strikes.",
          required: false
        }
      ]
    },
    {
      id: "home",
      title: "Homeowners Insurance",
      description: "Protect your home and belongings with comprehensive homeowners insurance coverage.",
      icon: "🏠",
      features: [
        "Dwelling Coverage",
        "Personal Property Protection",
        "Liability Coverage",
        "Additional Living Expenses",
        "Medical Payments",
        "Identity Theft Protection"
      ],
      benefits: [
        "Replacement cost coverage",
        "Home security discounts",
        "Claims-free discounts",
        "Bundle with auto for savings",
        "Local agent support"
      ],
      coverageTypes: [
        {
          name: "Dwelling Coverage",
          description: "Protects the structure of your home, including walls, roof, and built-in appliances.",
          required: true
        },
        {
          name: "Personal Property",
          description: "Covers your belongings like furniture, electronics, and clothing.",
          required: true
        },
        {
          name: "Liability Protection",
          description: "Protects you if someone is injured on your property or you damage someone else's property.",
          required: true
        }
      ]
    },
    {
      id: "renters",
      title: "Renters Insurance",
      description: "Affordable protection for your belongings and liability as a renter.",
      icon: "🏢",
      features: [
        "Personal Property Coverage",
        "Liability Protection",
        "Additional Living Expenses",
        "Medical Payments",
        "Identity Theft Coverage",
        "Replacement Cost Coverage"
      ],
      benefits: [
        "Low monthly premiums",
        "No deductible options",
        "Quick online quotes",
        "Flexible coverage limits",
        "Easy claims process"
      ],
      coverageTypes: [
        {
          name: "Personal Property",
          description: "Covers your belongings against theft, fire, and other covered perils.",
          required: true
        },
        {
          name: "Liability Coverage",
          description: "Protects you if you accidentally damage the rental property or injure someone.",
          required: true
        },
        {
          name: "Additional Living Expenses",
          description: "Covers temporary housing if your rental becomes uninhabitable.",
          required: false
        }
      ]
    },
    {
      id: "commercial",
      title: "Commercial Insurance",
      description: "Comprehensive business insurance solutions to protect your company and employees.",
      icon: "🏢",
      features: [
        "General Liability",
        "Commercial Property",
        "Workers' Compensation",
        "Commercial Auto",
        "Professional Liability",
        "Cyber Liability"
      ],
      benefits: [
        "Customized coverage options",
        "Industry-specific solutions",
        "Risk management support",
        "Claims advocacy",
        "Competitive group rates"
      ],
      coverageTypes: [
        {
          name: "General Liability",
          description: "Protects against claims of bodily injury, property damage, and advertising injury.",
          required: true
        },
        {
          name: "Workers' Compensation",
          description: "Covers medical expenses and lost wages for work-related injuries.",
          required: true
        },
        {
          name: "Commercial Property",
          description: "Protects your business property, equipment, and inventory.",
          required: false
        }
      ]
    },
    {
      id: "umbrella",
      title: "Umbrella Insurance",
      description: "Extra liability protection that goes beyond your standard policies.",
      icon: "🛡️",
      features: [
        "Excess Liability Coverage",
        "Worldwide Protection",
        "Defense Costs Coverage",
        "Personal Injury Protection",
        "Landlord Liability",
        "False Arrest Coverage"
      ],
      benefits: [
        "High coverage limits",
        "Broad protection",
        "Cost-effective solution",
        "Peace of mind",
        "Flexible terms"
      ],
      coverageTypes: [
        {
          name: "Personal Umbrella",
          description: "Extends liability coverage for personal policies like auto and home.",
          required: false
        },
        {
          name: "Commercial Umbrella",
          description: "Provides additional liability protection for business operations.",
          required: false
        }
      ]
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Get a Quote",
      description: "Complete our online form or call us for a personalized quote.",
      icon: "📝"
    },
    {
      step: 2,
      title: "Compare Options",
      description: "We'll present you with multiple coverage options from top carriers.",
      icon: "⚖️"
    },
    {
      step: 3,
      title: "Choose Coverage",
      description: "Select the coverage that best fits your needs and budget.",
      icon: "✅"
    },
    {
      step: 4,
      title: "Get Protected",
      description: "Your policy is activated and you're fully protected.",
      icon: "🛡️"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Insurance Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive insurance solutions designed to protect what matters most to you, your family, and your business.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Insurance Solutions for Every Need
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From personal auto and home insurance to comprehensive business coverage, we have the expertise to protect what matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6">
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-blue-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/quote"
                  className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Coverage Information */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Understanding Your Coverage
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Learn about the different types of coverage available and what each one protects.
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl">{service.icon}</span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {service.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">
                      Coverage Types
                    </h4>
                    <div className="space-y-4">
                      {service.coverageTypes.map((coverage, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-slate-900">
                              {coverage.name}
                            </h5>
                            {coverage.required && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">
                            {coverage.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-600">
                          <span className="text-green-600">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Getting the right insurance coverage is simple with our streamlined process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  Step {step.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Protected?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let our experienced team help you find the perfect insurance coverage for your specific needs.
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
              Speak with an Agent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
