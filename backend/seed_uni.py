import os
import sys
import django

# Setup Django environment
sys.path.append(r'd:\INTA Projects\StudyAtGeorgia\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.core.files import File
from urllib.request import Request, urlopen
from tempfile import NamedTemporaryFile
from api.models import University, UniversityImage, GeorgiaKeyPoint

def download_image(url):
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urlopen(req)
    tmp_file = NamedTemporaryFile(delete=False, suffix='.jpg')
    tmp_file.write(response.read())
    tmp_file.close()
    return tmp_file.name

# Ensure Grigol Robakidze University exists
uni = University.objects.filter(name__icontains="Grigol Robakidze").first()
if not uni:
    uni = University.objects.create(
        name="Grigol Robakidze University",
        location="Tbilisi, Georgia",
        university_type="Medical",
        description="A premier medical university in the heart of Georgia."
    )

# Set the text fields
uni.georgia_heading = "Georgia & Tbilisi"
uni.georgia_paragraph = "Tbilisi, the vibrant capital of Georgia, offers a blend of ancient history and modern infrastructure. It is considered one of the safest and most affordable study destinations in Europe, providing an incredible student lifestyle.\n\nThe city's rich culture and welcoming atmosphere make it the perfect home away from home."
uni.founder_name = "Grigol Robakidze"
uni.founder_paragraph = "Education is the most powerful weapon which you can use to change the world. Our university stands on the shoulders of giants, committed to delivering global standards of medical excellence."
uni.hospital_heading = "Pino Hospital"
uni.hospital_paragraph = "Our students get hands-on clinical experience at the state-of-the-art Pino Hospital, equipped with the latest medical technology and guided by top professionals. It serves as the primary teaching hospital for our medical faculty."
uni.campus_heading = "Campus Life"
uni.campus_paragraph = "Experience a dynamic campus life with world-class libraries, recreational centers, and a diverse international student community. The university hosts various cultural and academic events throughout the year."
uni.hostel_heading = "Student Hostel"
uni.hostel_paragraph = "Safe, comfortable, and fully-equipped hostels located just minutes from the main campus. Enjoy high-speed Wi-Fi, modern study rooms, recreational areas, and 24/7 security."
uni.save()

# Add Georgia Key Points
GeorgiaKeyPoint.objects.filter(university=uni).delete()
GeorgiaKeyPoint.objects.create(university=uni, title="Safest Country", description="Top 10 safest countries globally.", icon="ShieldCheck", order=1)
GeorgiaKeyPoint.objects.create(university=uni, title="Affordable Living", description="Low cost of living for international students.", icon="Building2", order=2)
GeorgiaKeyPoint.objects.create(university=uni, title="European Standard", description="Degree recognized globally.", icon="Award", order=3)
GeorgiaKeyPoint.objects.create(university=uni, title="Diverse Culture", description="Home to students from 50+ countries.", icon="Globe", order=4)

print("Text data seeded. Downloading images...")

# Add Images using placeholders
UniversityImage.objects.filter(university=uni).delete()

categories = [
    ('GEORGIA', 'https://images.unsplash.com/photo-1599818815525-4c6c06a380eb?w=800&q=80', 'Tbilisi Cityscape'),
    ('GEORGIA', 'https://images.unsplash.com/photo-1596726253406-039c3e9a117d?w=800&q=80', 'Georgian Architecture'),
    ('MAIN', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', 'University Main Building'),
    ('MAIN', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', 'Graduation Ceremony'),
    ('MAIN', 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', 'University Campus'),
    ('HOSPITAL', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'Modern Operating Theater'),
    ('HOSPITAL', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80', 'Hospital Facade'),
    ('HOSPITAL', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', 'Clinical Lab'),
    ('CAMPUS', 'https://images.unsplash.com/photo-1525921472407-c50fde674a68?w=800&q=80', 'Student Library'),
    ('CAMPUS', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', 'Campus Gatherings'),
    ('HOSTEL', 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80', 'Hostel Room'),
    ('HOSTEL', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', 'Student Lounge'),
]

for idx, (cat, url, cap) in enumerate(categories):
    tmp_path = download_image(url)
    ui = UniversityImage(university=uni, category=cat, caption=cap, order=idx)
    with open(tmp_path, 'rb') as f:
        ui.image.save(f'placeholder_{cat}_{idx}.jpg', File(f))
    ui.save()
    os.remove(tmp_path)
    print(f"Added {cat} image.")

# Add a founder pic
founder_url = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80'
tmp_path = download_image(founder_url)
with open(tmp_path, 'rb') as f:
    uni.founder_pic.save('founder.jpg', File(f))
uni.save()
os.remove(tmp_path)
print("Founder pic added.")

# Add a georgia photo
georgia_url = 'https://images.unsplash.com/photo-1582208643874-95e2069ed1e7?w=800&q=80'
tmp_path = download_image(georgia_url)
with open(tmp_path, 'rb') as f:
    uni.georgia_photo.save('georgia_main.jpg', File(f))
uni.save()
os.remove(tmp_path)
print("Georgia main photo added.")

print("Database successfully seeded with mock data and Unsplash images!")
