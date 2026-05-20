"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, AlertCircle } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  qualification?: string;
}

export default function ConsultationBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", qualification: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/site-content/`)
      .then(res => res.json())
      .then((data: { identifier: string; text_value: string }[]) => {
        const dict: Record<string, string> = {};
        data.forEach(item => { dict[item.identifier] = item.text_value || ""; });
        setContent(dict);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleOpenEvent = () => setIsVisible(true);
    window.addEventListener("open-consultation", handleOpenEvent);
    const hasClosed = localStorage.getItem("consultation_banner_closed");
    let timer: NodeJS.Timeout;
    if (!hasClosed) {
      timer = setTimeout(() => setIsVisible(true), 60000);
    }
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-consultation", handleOpenEvent);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("consultation_banner_closed", "true");
  };

  const validate = (data: typeof formData): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) {
      errs.name = "Full name is required.";
    } else if (data.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    }
    if (!data.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!data.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^[+\d\s\-()]{7,15}$/.test(data.phone.trim())) {
      errs.phone = "Please enter a valid phone number.";
    }
    if (!data.qualification) {
      errs.qualification = "Please select your qualification.";
    }
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true, qualification: true });
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: `Phone: ${formData.phone}\nQualification: ${formData.qualification}\n\nI would like to register for a free consultation.`
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", qualification: "" });
        setErrors({});
        setTouched({});
        setTimeout(() => handleClose(), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const fieldClass = (field: keyof FormErrors) =>
    `w-full bg-brand-background border rounded-lg px-4 py-2.5 text-brand-foreground text-sm focus:outline-none transition-colors ${
      touched[field] && errors[field]
        ? "border-red-400 focus:border-red-500 bg-red-50/50"
        : "border-slate-200 focus:border-brand-primary"
    }`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 sm:bottom-6 right-0 sm:right-6 left-0 sm:left-auto z-50 w-full sm:max-w-sm px-4 sm:px-0"
        >
          <div className="bg-brand-surface border border-slate-200 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md">
            {/* Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-brand-foreground mb-1">{content.popup_banner_title || "Free Consultation"}</h3>
                <p className="text-sm text-slate-500 font-light">{content.popup_banner_description || "Start your journey today! Register for a free profile assessment."}</p>
              </div>
              <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {status === "success" ? (
                <div className="p-5 sm:p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-foreground mb-2">Success!</h4>
                  <p className="text-sm text-slate-500">{content.popup_banner_success_message || "Registration successful! We will contact you shortly."}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={fieldClass("name")}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={fieldClass("email")}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      className={fieldClass("phone")}
                    />
                    {touched.phone && errors.phone && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Qualification */}
                  <div>
                    <select
                      value={formData.qualification}
                      onChange={(e) => handleChange("qualification", e.target.value)}
                      onBlur={() => handleBlur("qualification")}
                      className={fieldClass("qualification")}
                    >
                      <option value="" disabled>Current Qualification *</option>
                      <option value="High School / 12th Grade">High School / 12th Grade</option>
                      <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                      <option value="Master's Degree">Master&apos;s Degree</option>
                      <option value="Other">Other</option>
                    </select>
                    {touched.qualification && errors.qualification && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.qualification}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3 px-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-md shadow-brand-primary/20"
                  >
                    {status === "submitting" ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      content.popup_banner_button_text || "Claim Free Consultation"
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-red-500 text-xs text-center flex items-center justify-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Submission failed. Please check your connection and try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
