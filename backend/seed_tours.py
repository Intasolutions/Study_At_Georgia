import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import VirtualTour, SiteContent

tours_data = [
    {
        "title_en": "Grigol Robakidze University",
        "title_ge": "გრუნი",
        "url": "https://3dtours.ge/projects/Grigol-Robakidze-University-VR-Tour/",
        "image": "vr_tour_gruni_1787204089333.jpg",
        "order": 1
    },
    {
        "title_en": "Pineo Medical Center",
        "title_ge": "პინეო",
        "url": "https://3dtours.ge/projects/pineo-VR-tour/",
        "image": "vr_tour_pineo_1787204105290.jpg",
        "order": 2
    },
    {
        "title_en": "GRuniverse",
        "title_ge": "გრუნივერსი",
        "url": "https://3dtours.ge/projects/GRuniverse-virtual-tour/",
        "image": "vr_tour_gruniverse_1787204121773.jpg",
        "order": 3
    },
    {
        "title_en": "Simulation Center",
        "title_ge": "სიმულაციური ცენტრი",
        "url": "https://3dtours.ge/projects/Simulaciuri-centri/",
        "image": "vr_tour_simulation_1787204136394.jpg",
        "order": 4
    },
    {
        "title_en": "Educational-Research Center",
        "title_ge": "სასწავლო - კვლევითი ცენტრი",
        "url": "https://3dtours.ge/projects/VR-tour-stomatologiuri-sastsavlo-kvleviti-centri",
        "image": "vr_tour_research_1787204153414.jpg",
        "order": 5
    },
]

for data in tours_data:
    tour, created = VirtualTour.objects.get_or_create(url=data['url'], defaults=data)
    if not created:
        for key, value in data.items():
            setattr(tour, key, value)
        tour.save()

# Add default headings if they don't exist
SiteContent.objects.get_or_create(identifier='virtual_tours_heading', defaults={'text_value': 'Explore Campus in 360°'})
SiteContent.objects.get_or_create(identifier='virtual_tours_subheading', defaults={'text_value': 'Take a virtual walk through our state-of-the-art facilities, from modern simulation centers to university campuses, right from your device.'})

print("Successfully seeded Virtual Tours and headings.")
