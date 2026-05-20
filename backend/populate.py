import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import (
    SiteContent, Testimonial, FaqItem, 
    JourneyStep, ServicePackage, StatCounter
)

def populate():
    # SiteContent
    # Core settings & Contact
    SiteContent.objects.update_or_create(identifier='whatsapp_number', defaults={'text_value': '1234567890'})
    SiteContent.objects.update_or_create(identifier='whatsapp_message', defaults={'text_value': "Hello! I'm interested in studying MBBS/Nursing at Grigol Robakidze University."})
    SiteContent.objects.get_or_create(identifier='global_favicon_image')
    
    # Navbar
    SiteContent.objects.get_or_create(identifier='nav_logo')
    SiteContent.objects.update_or_create(identifier='nav_brand_name', defaults={'text_value': 'StudyAtGeorgia'})
    SiteContent.objects.update_or_create(identifier='navbar_button_text', defaults={'text_value': 'Apply Now'})

    # Hero
    SiteContent.objects.update_or_create(identifier='home_hero_title1', defaults={'text_value': 'CHART YOUR'})
    SiteContent.objects.update_or_create(identifier='home_hero_title2', defaults={'text_value': 'CAREER.'})
    SiteContent.objects.update_or_create(identifier='home_hero_subtitle', defaults={'text_value': "We are India's premier educational consultants. Recent results show Indian Students prefer Georgia. 85% study health related courses such as Medicine, Dentistry, Nursing, and Pharmacy."})
    SiteContent.objects.get_or_create(identifier='home_hero_image')
    SiteContent.objects.update_or_create(identifier='hero_small_badge_text', defaults={'text_value': 'Study MBBS / MD'})
    SiteContent.objects.update_or_create(identifier='hero_primary_button_text', defaults={'text_value': 'Book Consultation'})
    SiteContent.objects.update_or_create(identifier='hero_secondary_button_text', defaults={'text_value': 'Explore University'})
    SiteContent.objects.update_or_create(identifier='hero_secondary_button_link', defaults={'text_value': '#services'})
    SiteContent.objects.update_or_create(identifier='hero_trusted_partners_text', defaults={'text_value': 'We are the Exclusive Partner for'})
    SiteContent.objects.update_or_create(identifier='hero_university_names', defaults={'text_value': 'GRIGOL ROBAKIDZE UNIVERSITY, TBILISI'})
    SiteContent.objects.update_or_create(identifier='hero_statistic_1_value', defaults={'text_value': '85%'})
    SiteContent.objects.update_or_create(identifier='hero_statistic_1_label', defaults={'text_value': 'Study Health Courses'})
    SiteContent.objects.update_or_create(identifier='hero_statistic_2_title', defaults={'text_value': 'Highest FMGE'})
    SiteContent.objects.update_or_create(identifier='hero_statistic_2_description', defaults={'text_value': 'Passout ratio compared to other countries.'})
    SiteContent.objects.update_or_create(identifier='hero_bento_image_alt_text', defaults={'text_value': 'Grigol Robakidze Campus'})

    # Services (Used for BSc Nursing and University Info)
    SiteContent.objects.update_or_create(identifier='services_section_subtitle', defaults={'text_value': 'B.Sc. Nursing (4 Years)'})
    SiteContent.objects.update_or_create(identifier='services_main_title_part1', defaults={'text_value': 'Your Gateway to'})
    SiteContent.objects.update_or_create(identifier='services_main_title_part2', defaults={'text_value': 'Grigol Robakidze.'})
    SiteContent.objects.update_or_create(identifier='services_section_description', defaults={'text_value': 'We facilitate admissions to world-class programs designed to shape future-ready nursing professionals. Factors which 60,000+ International Students Considered and YOU too should consider in selecting Georgia.'})

    # Journey
    SiteContent.objects.update_or_create(identifier='journey_section_subtitle', defaults={'text_value': 'Your Pathway to Success'})
    SiteContent.objects.update_or_create(identifier='journey_main_title_part1', defaults={'text_value': 'Admission'})
    SiteContent.objects.update_or_create(identifier='journey_main_title_part2', defaults={'text_value': 'Simplified.'})

    # Testimonials
    SiteContent.objects.update_or_create(identifier='testimonials_section_subtitle', defaults={'text_value': 'Student Success'})
    SiteContent.objects.update_or_create(identifier='testimonials_main_title_part1', defaults={'text_value': 'Future'})
    SiteContent.objects.update_or_create(identifier='testimonials_main_title_part2', defaults={'text_value': 'Professionals.'})
    SiteContent.objects.update_or_create(identifier='testimonials_section_description', defaults={'text_value': 'Join thousands of successful Indian students who have charted their medical careers through Grigol Robakidze University.'})
    SiteContent.objects.update_or_create(identifier='testimonials_sidebar_title', defaults={'text_value': 'Featured Students'})
    SiteContent.objects.update_or_create(identifier='testimonials_status_label', defaults={'text_value': 'Goal'})
    SiteContent.objects.update_or_create(identifier='testimonials_status_value', defaults={'text_value': 'FMGE Cleared'})

    # FAQ & About
    SiteContent.objects.update_or_create(identifier='faq_section_title', defaults={'text_value': 'Frequently Asked Questions'})
    SiteContent.objects.update_or_create(identifier='about_mission', defaults={'text_value': "As a premier and highly trusted study abroad agency, our mission is to provide you with a seamless transition to Grigol Robakidze University's world-class nursing and medical programs."})
    SiteContent.objects.update_or_create(identifier='about_vision', defaults={'text_value': 'We ensure our students receive special FMGE coaching after their 3rd year to prepare and crack the examination, securing their future as medical professionals.'})

    # Consultation Banner
    SiteContent.objects.update_or_create(identifier='popup_banner_title', defaults={'text_value': 'Start Your Medical Journey'})
    SiteContent.objects.update_or_create(identifier='popup_banner_description', defaults={'text_value': 'Register now for MBBS or BSc Nursing at Grigol Robakidze University.'})
    SiteContent.objects.update_or_create(identifier='popup_banner_success_message', defaults={'text_value': 'Registration successful! We will contact you shortly.'})
    SiteContent.objects.update_or_create(identifier='popup_banner_button_text', defaults={'text_value': 'Apply Now'})

    # Footer
    SiteContent.objects.update_or_create(identifier='footer_brand_name', defaults={'text_value': 'StudyAtGeorgia'})
    SiteContent.objects.update_or_create(identifier='footer_copyright', defaults={'text_value': 'StudyAtGeorgia. All rights reserved.'})
    SiteContent.objects.update_or_create(identifier='footer_developer_tagline', defaults={'text_value': 'Developed and maintained by IN-TA Solutions Pvt Ltd.'})

    # Contact Page Info
    SiteContent.objects.update_or_create(identifier='contact_email', defaults={'text_value': 'admissions@studyatgeorgia.in'})
    SiteContent.objects.update_or_create(identifier='contact_phone', defaults={'text_value': '+91 98765 43210'})
    SiteContent.objects.update_or_create(identifier='contact_address', defaults={'text_value': 'StudyAtGeorgia Agency Headquarters\nIndia'})

    # Testimonials
    Testimonial.objects.all().delete()
    Testimonial.objects.update_or_create(student_name="Priya S.", university_name="Grigol Robakidze University", defaults={'quote': "The FMGE coaching provided after the 3rd year was incredible. I felt completely prepared.", 'order': 0})
    Testimonial.objects.update_or_create(student_name="Rahul M.", university_name="Grigol Robakidze University", defaults={'quote': "The clinical experience at PINEO Hospital starting from the second semester gave me a huge advantage.", 'order': 1})

    # FaqItem
    FaqItem.objects.all().delete()
    FaqItem.objects.update_or_create(question="Is the tuition fee affordable?", defaults={'answer': "Yes! We secure an affordable tuition fee for our students that can be paid conveniently in semesters.", 'order': 0})
    FaqItem.objects.update_or_create(question="What about clinical training?", defaults={'answer': "Our students get clinical experience from the second semester at PINEO Hospital, the university's exclusive training hospital.", 'order': 1})
    FaqItem.objects.update_or_create(question="Do you provide FMGE coaching?", defaults={'answer': "Yes, we ensure that Grigol Robakidze University provides special coaching to our students after the 3rd year to prepare and crack the examination.", 'order': 2})
    FaqItem.objects.update_or_create(question="Is it safe and what is the climate like?", defaults={'answer': "Georgia offers safety, an affordable cost of living and food, and a pleasant climate that is very similar to India.", 'order': 3})

    # JourneyStep
    JourneyStep.objects.all().delete()
    JourneyStep.objects.update_or_create(title="Counseling & Selection", defaults={'description': "We help you understand the benefits of Grigol Robakidze University and choose between MBBS/MD or BSc Nursing.", 'icon_text': "1", 'order': 0})
    JourneyStep.objects.update_or_create(title="Easy Visa Process", defaults={'description': "Our agency handles the favourable regulations and ensures a 100% easy visa process for you.", 'icon_text': "2", 'order': 1})
    JourneyStep.objects.update_or_create(title="Theoretical Foundation", defaults={'description': "Begin your world-class education with medium of instruction entirely in English.", 'icon_text': "3", 'order': 2})
    JourneyStep.objects.update_or_create(title="Clinical Practice", defaults={'description': "Start clinical experience from the second semester at PINEO Hospital.", 'icon_text': "4", 'order': 3})
    JourneyStep.objects.update_or_create(title="FMGE Coaching", defaults={'description': "Receive special coaching after the 3rd year to prepare and crack the FMGE.", 'icon_text': "5", 'order': 4})

    # ServicePackage (Used as Highlights in the Bento Grid)
    ServicePackage.objects.all().delete()
    ServicePackage.objects.update_or_create(name="Affordable Education", defaults={'description': "Affordable Tuition Fee paid in semesters with low cost of living and food.", 'is_popular': True, 'order': 0})
    ServicePackage.objects.update_or_create(name="PINEO Hospital", defaults={'description': "Access to PINEO Hospital, the university's own hospital. Clinical experience starting from the second semester.", 'is_popular': True, 'order': 1})
    ServicePackage.objects.update_or_create(name="100% Placement", defaults={'description': "Placement Assurance along with IELTS/OET Training (4700 Contact Hours).", 'is_popular': False, 'order': 2})
    ServicePackage.objects.update_or_create(name="Globally Recognized", defaults={'description': "Recognized Educational System with the highest FMGE passout ratio.", 'is_popular': False, 'order': 3})
    ServicePackage.objects.update_or_create(name="Favourable Visa", defaults={'description': "Easy Visa Process & Favourable Regulations in a safe country with a pleasant climate similar to India.", 'is_popular': False, 'order': 4})

    # StatCounter
    StatCounter.objects.all().delete()
    StatCounter.objects.update_or_create(label="International Students", defaults={'number_value': 60000, 'suffix': '+', 'order': 0})
    StatCounter.objects.update_or_create(label="Placement Assurance", defaults={'number_value': 100, 'suffix': '%', 'order': 1})
    StatCounter.objects.update_or_create(label="Contact Hours", defaults={'number_value': 4700, 'suffix': '+', 'order': 2})

    print("Successfully populated the database with Grigol Robakidze University content!")

if __name__ == '__main__':
    populate()