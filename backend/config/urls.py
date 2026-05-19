from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from api.views import (
    UniversityViewSet, ContactLeadViewSet, SiteContentViewSet,
    TestimonialViewSet, FaqItemViewSet, JourneyStepViewSet,
    ServicePackageViewSet, StatCounterViewSet
)

router = DefaultRouter()
router.register(r'site-content', SiteContentViewSet, basename='sitecontent')
router.register(r'universities', UniversityViewSet, basename='university')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'faqs', FaqItemViewSet, basename='faq')
router.register(r'journey-steps', JourneyStepViewSet, basename='journeystep')
router.register(r'service-packages', ServicePackageViewSet, basename='servicepackage')
router.register(r'stats', StatCounterViewSet, basename='statcounter')
router.register(r'contact', ContactLeadViewSet, basename='contact')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
