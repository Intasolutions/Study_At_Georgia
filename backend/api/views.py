from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import (
    University, ContactLead, SiteContent, 
    Testimonial, FaqItem, JourneyStep, 
    ServicePackage, StatCounter, Announcement
)
from .serializers import (
    UniversitySerializer, ContactLeadSerializer, SiteContentSerializer,
    TestimonialSerializer, FaqItemSerializer, JourneyStepSerializer,
    ServicePackageSerializer, StatCounterSerializer, AnnouncementSerializer
)

class SiteContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteContent.objects.all()
    serializer_class = SiteContentSerializer
    permission_classes = [AllowAny]
    lookup_field = 'identifier'

class UniversityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = University.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]

class FaqItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FaqItem.objects.all()
    serializer_class = FaqItemSerializer
    permission_classes = [AllowAny]

class JourneyStepViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JourneyStep.objects.all()
    serializer_class = JourneyStepSerializer
    permission_classes = [AllowAny]

class ServicePackageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServicePackage.objects.all()
    serializer_class = ServicePackageSerializer
    permission_classes = [AllowAny]

class StatCounterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StatCounter.objects.all()
    serializer_class = StatCounterSerializer
    permission_classes = [AllowAny]

class ContactLeadViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactLead.objects.all()
    serializer_class = ContactLeadSerializer
    permission_classes = [AllowAny]

class AnnouncementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Announcement.objects.filter(is_active=True)
    serializer_class = AnnouncementSerializer
    permission_classes = [AllowAny]
