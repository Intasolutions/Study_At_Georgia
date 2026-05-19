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
    SiteContent.objects.get_or_create(identifier='whatsapp_number', defaults={'text_value': '1234567890'})
    SiteContent.objects.get_or_create(identifier='whatsapp_message', defaults={'text_value': "Hello! I'm interested in studying in Georgia."})
    SiteContent.objects.get_or_create(identifier='home_hero_title1', defaults={'text_value': 'Your Gateway'})
    SiteContent.objects.get_or_create(identifier='home_hero_title2', defaults={'text_value': 'to Georgia'})
    SiteContent.objects.get_or_create(identifier='home_hero_subtitle', defaults={'text_value': 'Elevate your academic journey. We provide bespoke consulting for elite university placements, flawless visa processing, and premium accommodation.'})
    SiteContent.objects.get_or_create(identifier='about_mission', defaults={'text_value': 'To simplify the complex landscape of international education, providing ambitious students with transparent, high-end consulting that transforms their dream of studying in Georgia into a seamless reality.'})
    SiteContent.objects.get_or_create(identifier='about_vision', defaults={'text_value': 'To be the undisputed global leader in premium educational placement for Georgian institutions, recognized for our flawless execution, elite partnerships, and unwavering commitment to student success.'})

    # Testimonials
    Testimonial.objects.get_or_create(student_name="Alex M.", university_name="Tbilisi State Medical University", defaults={'quote': "The meticulous attention to detail during the visa process saved me months of anxiety. An unparalleled level of professionalism.", 'order': 0})
    Testimonial.objects.get_or_create(student_name="Sarah K.", university_name="Ilia State University", defaults={'quote': "Their concierge approach transformed a complex relocation into a seamless transition. Highly recommended for serious students.", 'order': 1})
    Testimonial.objects.get_or_create(student_name="David T.", university_name="Georgian Technical University", defaults={'quote': "From securing premium housing to handling university enrollment, the entire experience felt bespoke and highly secure.", 'order': 2})

    # FaqItem
    FaqItem.objects.get_or_create(question="How long does the visa process take?", defaults={'answer': "Typically, the student visa process for Georgia takes about 3 to 4 weeks after all required documents are submitted. We expedite this by pre-verifying all your paperwork.", 'order': 0})
    FaqItem.objects.get_or_create(question="Do I need to know Georgian to study there?", defaults={'answer': "No. All of our partner universities offer programs entirely in English. However, learning basic Georgian can be helpful for daily life, and universities often provide optional language courses.", 'order': 1})
    FaqItem.objects.get_or_create(question="Is accommodation guaranteed?", defaults={'answer': "Yes, for students using our Premium and Elite packages, we secure high-end accommodation before your arrival. Basic package students receive comprehensive assistance in finding housing.", 'order': 2})
    FaqItem.objects.get_or_create(question="Are the degrees internationally recognized?", defaults={'answer': "Absolutely. Our partner medical and technical universities are recognized by WHO, FAIMER, and the European Higher Education Area (Bologna Process).", 'order': 3})

    # JourneyStep
    JourneyStep.objects.get_or_create(title="Initial Consultation", defaults={'description': "We assess your academic background, career goals, and budget to recommend the perfect university and program for you.", 'icon_text': "1", 'order': 0})
    JourneyStep.objects.get_or_create(title="Application & Admission", defaults={'description': "Our experts handle the entire application process, ensuring all documents meet the strict standards of Georgian universities.", 'icon_text': "2", 'order': 1})
    JourneyStep.objects.get_or_create(title="Visa Processing", defaults={'description': "We guide you through the visa application, preparing you for interviews and handling the bureaucratic paperwork.", 'icon_text': "3", 'order': 2})
    JourneyStep.objects.get_or_create(title="Travel & Accommodation", defaults={'description': "Flights are booked, and premium housing is secured before you even leave your home country.", 'icon_text': "4", 'order': 3})
    JourneyStep.objects.get_or_create(title="Arrival & Settlement", defaults={'description': "Airport pickup, local SIM card registration, bank account setup, and university orientation. We are with you every step.", 'icon_text': "5", 'order': 4})

    # ServicePackage
    ServicePackage.objects.get_or_create(name="Basic", defaults={'description': "Essential guidance for university selection and application processing.", 'is_popular': False, 'order': 0})
    ServicePackage.objects.get_or_create(name="Premium", defaults={'description': "Complete end-to-end support including visa and accommodation.", 'is_popular': True, 'order': 1})
    ServicePackage.objects.get_or_create(name="Elite", defaults={'description': "VIP consulting with dedicated 24/7 personal support and settlement services.", 'is_popular': False, 'order': 2})

    # StatCounter
    StatCounter.objects.get_or_create(label="Students Placed", defaults={'number_value': 500, 'suffix': '+', 'order': 0})
    StatCounter.objects.get_or_create(label="Visa Success", defaults={'number_value': 100, 'suffix': '%', 'order': 1})
    StatCounter.objects.get_or_create(label="Partner Universities", defaults={'number_value': 15, 'suffix': '+', 'order': 2})

    print("Successfully populated the database!")

if __name__ == '__main__':
    populate()
