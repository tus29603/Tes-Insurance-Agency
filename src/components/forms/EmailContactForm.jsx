// src/components/forms/EmailContactForm.jsx
import React, { useState } from "react";
import SITE from "../../config/site.js";

export default function EmailContactForm({ dark = false, email = "info@tesinsurance.com" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use Formspree to send email
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", form.subject || `Contact from ${form.name}`);
      formData.append("message", form.message);
      formData.append("_replyto", form.email);
      formData.append("_subject", `New Contact Form Submission - ${form.subject || form.name}`);

      const response = await fetch(`https://formspree.io/f/${SITE.FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        const data = await response.json();
        if (data.errors) {
          setError(data.errors.map(error => error.message).join(", "));
        } else {
          setError("There was a problem sending your message. Please try again.");
        }
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      setError("There was a problem sending your message. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <div className={`${dark ? "bg-slate-800 text-white" : "bg-white"} rounded-lg shadow-lg p-6`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
        <p className="text-slate-600 dark:text-slate-300">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
            Message Sent Successfully!
          </h4>
          <p className="text-slate-600 dark:text-slate-300">
            Thank you for contacting us. We'll get back to you within 24 hours at{" "}
            <a href={`mailto:${email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              {email}
            </a>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Error sending message
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="What can we help you with?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white resize-vertical"
              placeholder="Please describe your insurance needs or any questions you have..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                isFormValid && !loading
                  ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : "bg-slate-400 cursor-not-allowed"
              } transition-colors duration-200`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </div>

          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>
              Your message will be sent directly to our team. We'll respond within 24 hours. 
              You can also email us directly at{" "}
              <a href={`mailto:${email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {email}
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
