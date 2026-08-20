"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface CourseQuestion {
  id: number;
  question_text: string;
  question_type: "TEXT" | "CHOICE";
  choices: string | null;
  is_required: boolean;
}

interface Course {
  id: number;
  name: string;
  questions: CourseQuestion[];
}

export default function ApplyForm({ content }: { content: Record<string, string> }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/courses/`);
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  const selectedCourse = courses.find(c => c.id.toString() === selectedCourseId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    if (!selectedCourseId) {
      errors.course = "Please select a course";
      isValid = false;
    }

    if (selectedCourse) {
      selectedCourse.questions.forEach(q => {
        if (q.is_required && !answers[q.id.toString()]) {
          errors[`q_${q.id}`] = "This field is required";
          isValid = false;
        }
      });
    }

    if (!formData.message.trim()) {
      errors.message = "Please tell us about your inquiry";
      isValid = false;
    }

    setFieldErrors(errors);
    if (!isValid) return;

    setStatus("submitting");

    try {
      // Map answer keys from ID to actual question text for better readability in the backend admin
      const formattedAnswers: Record<string, string> = {};
      if (selectedCourse) {
        Object.entries(answers).forEach(([qId, answerText]) => {
          const question = selectedCourse.questions.find(q => q.id.toString() === qId);
          if (question) {
            formattedAnswers[question.question_text] = answerText;
          }
        });
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Phone: ${formData.phone}\n\n${formData.message}`,
          course: selectedCourseId,
          answers: formattedAnswers
        })
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSelectedCourseId("");
        setAnswers({});
        setFieldErrors({});
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden w-full max-w-4xl mx-auto mb-10"
    >
      <div className="p-8 sm:p-12 lg:p-16 relative">
        {(content.nav_logo_img || content.footer_logo_img) && (
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
            <img 
              src={(content.nav_logo_img || content.footer_logo_img).startsWith('http') ? (content.nav_logo_img || content.footer_logo_img) : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${content.nav_logo_img || content.footer_logo_img}`} 
              alt="University Logo Background" 
              className="w-full h-full object-contain p-10"
            />
          </div>
        )}
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-extrabold text-[#0f172a] mb-3">Secure Your Admission Today</h3>
            <p className="text-slate-500">Fill out this quick form and our expert counselors will contact you immediately.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => {
                  setFormData({...formData, name: e.target.value});
                  if (fieldErrors.name) setFieldErrors({...fieldErrors, name: ""});
                }}
                className={`w-full bg-slate-50 border rounded-xl px-5 py-4 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all shadow-sm ${fieldErrors.name ? "border-red-400" : "border-slate-200"}`}
                placeholder="John Doe" 
              />
              {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={e => {
                  setFormData({...formData, email: e.target.value});
                  if (fieldErrors.email) setFieldErrors({...fieldErrors, email: ""});
                }}
                className={`w-full bg-slate-50 border rounded-xl px-5 py-4 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all shadow-sm ${fieldErrors.email ? "border-red-400" : "border-slate-200"}`}
                placeholder="john@example.com" 
              />
              {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number (WhatsApp Preferred) <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              value={formData.phone} 
              onChange={e => {
                setFormData({...formData, phone: e.target.value});
                if (fieldErrors.phone) setFieldErrors({...fieldErrors, phone: ""});
              }}
              className={`w-full bg-slate-50 border rounded-xl px-5 py-4 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all shadow-sm ${fieldErrors.phone ? "border-red-400" : "border-slate-200"}`}
              placeholder="+91 98765 43210" 
            />
            {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Course of Interest <span className="text-red-500">*</span></label>
            <select
              value={selectedCourseId}
              onChange={e => {
                setSelectedCourseId(e.target.value);
                setAnswers({});
                if (fieldErrors.course) setFieldErrors({...fieldErrors, course: ""});
              }}
              className={`w-full bg-slate-50 border rounded-xl px-5 py-4 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all shadow-sm appearance-none ${fieldErrors.course ? "border-red-400" : "border-slate-200"}`}
            >
              <option value="" disabled>Choose your preferred program...</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
            {fieldErrors.course && <p className="text-red-500 text-xs mt-1">{fieldErrors.course}</p>}
          </div>

          {selectedCourse && selectedCourse.questions.map(q => (
            <div key={q.id} className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{q.question_text} {q.is_required && <span className="text-red-500">*</span>}</label>
              {q.question_type === "CHOICE" ? (
                <select
                  value={answers[q.id.toString()] || ""}
                  onChange={e => {
                    setAnswers({...answers, [q.id.toString()]: e.target.value});
                    if (fieldErrors[`q_${q.id}`]) setFieldErrors({...fieldErrors, [`q_${q.id}`]: ""});
                  }}
                  className={`w-full bg-slate-50 border rounded-xl px-5 py-4 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all shadow-sm appearance-none ${fieldErrors[`q_${q.id}`] ? "border-red-400" : "border-slate-200"}`}
                >
                  <option value="" disabled>Select an option...</option>
                  {(q.choices || "").split(/[,\n]+/).filter(c => c.trim() !== "").map((choice, i) => (
                    <option key={i} value={choice.trim()}>{choice.trim()}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={answers[q.id.toString()] || ""}
                  onChange={e => {
                    setAnswers({...answers, [q.id.toString()]: e.target.value});
                    if (fieldErrors[`q_${q.id}`]) setFieldErrors({...fieldErrors, [`q_${q.id}`]: ""});
                  }}
                  className={`w-full bg-slate-50 border rounded-xl px-5 py-4 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all shadow-sm ${fieldErrors[`q_${q.id}`] ? "border-red-400" : "border-slate-200"}`}
                  placeholder="Your answer"
                />
              )}
              {fieldErrors[`q_${q.id}`] && <p className="text-red-500 text-xs mt-1">{fieldErrors[`q_${q.id}`]}</p>}
            </div>
          ))}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Any specific questions?</label>
            <textarea 
              rows={4} 
              value={formData.message} 
              onChange={e => {
                setFormData({...formData, message: e.target.value});
                if (fieldErrors.message) setFieldErrors({...fieldErrors, message: ""});
              }}
              className={`w-full bg-slate-50 border rounded-xl px-5 py-4 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all shadow-sm resize-none ${fieldErrors.message ? "border-red-400" : "border-slate-200"}`}
              placeholder="Tell us about your academic goals or any doubts you have..."
            ></textarea>
            {fieldErrors.message && <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>}
          </div>

          <div className="pt-4">
            <button 
              disabled={status === "submitting"} 
              type="submit" 
              className="w-full px-10 py-5 bg-[#d4af37] hover:bg-[#c5a028] text-white text-lg font-bold rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] hover:shadow-xl hover:-translate-y-1"
            >
              {status === "submitting" ? "Processing..." : "Get Free Counseling Now"}
              {status !== "submitting" && <ArrowRight className="w-6 h-6" />}
            </button>
            <p className="text-center text-slate-400 text-sm mt-4 flex items-center justify-center gap-2">
              <span className="text-emerald-500">🔒</span> Your information is 100% secure. We never spam.
            </p>
          </div>

          {status === "success" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center justify-center text-center gap-3 text-emerald-800"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              </div>
              <h4 className="text-xl font-bold">Application Received!</h4>
              <p className="text-emerald-700">Thank you for reaching out. One of our expert admission counselors will contact you within 24 hours.</p>
            </motion.div>
          )}
          
          {status === "error" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-800"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="text-sm font-medium">Something went wrong checking our server. Please try again.</p>
            </motion.div>
          )}
        </form>
        </div>
      </div>
    </motion.div>
  );
}
