"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // EmailJS submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Fallbacks or hardcoded values if not in .env yet
    const serviceId = "service_9qph046"; 
    // Please set your template ID and public key in your .env.local file:
    // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
    // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID_HERE";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY_HERE";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to send email", error);
      alert("Failed to send message. Please ensure your EmailJS Template ID and Public Key are configured correctly.");
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex w-full flex-col px-5 py-6 md:px-12 md:py-10">
      <div className="pb-12 md:pb-14">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter"
        >
          Let&apos;s <span className="text-primary">Talk</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-sm text-[var(--muted)] md:text-base max-w-xl"
        >
          Have a project in mind or just want to say hi? Fill out the form below and I&apos;ll get back to you as soon as possible.
        </motion.p>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-10 backdrop-blur-sm"
        >

          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/70 flex items-center gap-2">
                  <User className="w-3 h-3 text-primary" /> Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/50 px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)]/50 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-sm"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/70 flex items-center gap-2">
                  <Mail className="w-3 h-3 text-primary" /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/50 px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)]/50 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/70 flex items-center gap-2">
                <MessageSquare className="w-3 h-3 text-primary" /> Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="How can I help you?"
                className="w-full resize-y min-h-[120px] rounded-xl border border-[var(--border)] bg-[var(--background)]/50 px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)]/50 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary backdrop-blur-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-xl bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] disabled:opacity-70 disabled:cursor-not-allowed md:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>Message Sent Successfully!</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </span>
                {/* Hover effect background */}
                {!isSubmitting && !isSuccess && (
                  <div className="absolute inset-0 -z-0 bg-[var(--foreground)]/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
