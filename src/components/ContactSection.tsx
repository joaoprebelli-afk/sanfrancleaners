import { useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-primary text-primary-foreground">
      <div className="section-padding">
        <div className="container-narrow max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-8 text-center">
            Ready to Reclaim Your Garage?
          </h2>

          {submitted ? (
            <div className="text-center py-12">
              <p className="text-xl font-semibold mb-2">Thank you!</p>
              <p className="text-[rgba(255,255,255,0.7)]">We'll get back to you with a free quote shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-primary-foreground placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:border-orange transition-colors"
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-primary-foreground placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:border-orange transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-primary-foreground placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:border-orange transition-colors"
              />
              <textarea
                rows={3}
                placeholder="Message (optional)"
                className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-primary-foreground placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:border-orange transition-colors resize-none"
              />
              <select
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-primary-foreground focus:outline-none focus:border-orange transition-colors"
              >
                <option value="" disabled className="text-foreground">When do you want service?</option>
                <option value="this-week" className="text-foreground">This week</option>
                <option value="next-2-weeks" className="text-foreground">Next 2 weeks</option>
                <option value="next-month" className="text-foreground">Next month</option>
              </select>
              <button
                type="submit"
                className="w-full py-4 bg-orange hover:brightness-110 active:scale-[0.98] transition-all rounded-lg font-bold text-lg text-accent-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
              >
                Request Free Quote
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
