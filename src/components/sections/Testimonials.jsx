import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Philadelphia, PA",
      rating: 5,
      text: "Tes Insurance Agency saved me over $400 a year on my auto insurance. Their team was professional, responsive, and found me the perfect coverage. I highly recommend them!",
      policy: "Auto Insurance"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Bucks County, PA",
      rating: 5,
      text: "When I needed to insure my new home, they compared quotes from multiple carriers and found me comprehensive coverage at an unbeatable price. The process was smooth and stress-free.",
      policy: "Homeowners Insurance"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      location: "Montgomery County, PA",
      rating: 5,
      text: "As a small business owner, I needed commercial insurance that I could trust. Tes Insurance Agency understood my needs and provided excellent coverage options. Great service!",
      policy: "Commercial Insurance"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Delaware County, PA",
      rating: 5,
      text: "I've been with Tes Insurance for 3 years now. They always respond quickly to my questions and help me understand my coverage. Their customer service is outstanding.",
      policy: "Multiple Policies"
    },
    {
      id: 5,
      name: "Jennifer Williams",
      location: "Chester County, PA",
      rating: 5,
      text: "After a car accident, I was worried about my insurance claim. Tes Insurance Agency guided me through the entire process and made sure I got fair compensation. They're truly on your side.",
      policy: "Auto Insurance"
    },
    {
      id: 6,
      name: "Robert Kim",
      location: "Philadelphia, PA",
      rating: 5,
      text: "The team at Tes Insurance Agency is knowledgeable and honest. They don't try to sell you unnecessary coverage, just what you actually need. I appreciate their integrity.",
      policy: "Home & Auto Bundle"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real customers have to say about their experience with Tes Insurance Agency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="ml-2 text-sm text-slate-500">
                  {testimonial.policy}
                </span>
              </div>
              
              <blockquote className="text-slate-700 mb-4">
                "{testimonial.text}"
              </blockquote>
              
              <div className="border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-slate-500">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-6 py-3">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="text-blue-900 font-semibold">
              4.9/5 Average Rating
            </span>
            <span className="text-blue-600 text-sm">
              (Based on 150+ reviews)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}