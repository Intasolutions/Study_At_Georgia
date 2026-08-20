from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import (
    University, ContactLead, SiteContent, 
    Testimonial, FaqItem, JourneyStep, 
    ServicePackage, StatCounter, Announcement,
    Course, WhyGruniBadge,
    Program, TeamMember, VirtualTour
)
from .serializers import (
    UniversitySerializer, ContactLeadSerializer, SiteContentSerializer,
    TestimonialSerializer, FaqItemSerializer, JourneyStepSerializer,
    ServicePackageSerializer, StatCounterSerializer, AnnouncementSerializer,
    CourseSerializer, WhyGruniBadgeSerializer,
    ProgramSerializer, TeamMemberSerializer, VirtualTourSerializer
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

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.filter(is_active=True).prefetch_related('questions')
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]

class WhyGruniBadgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WhyGruniBadge.objects.filter(is_active=True)
    serializer_class = WhyGruniBadgeSerializer
    permission_classes = [AllowAny]

class ProgramViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Program.objects.filter(is_active=True).prefetch_related('badges', 'key_points', 'comparison_metrics')
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    permission_classes = [AllowAny]

class VirtualTourViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VirtualTour.objects.filter(is_active=True).order_by('order')
    serializer_class = VirtualTourSerializer
    permission_classes = [AllowAny]
