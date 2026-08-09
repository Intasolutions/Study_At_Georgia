from rest_framework import serializers
from .models import (
    University, UniversityImage, ContactLead, SiteContent, 
    Testimonial, FaqItem, JourneyStep, 
    ServicePackage, StatCounter, Announcement,
    Course, CourseQuestion, WhyGruniBadge,
    GeorgiaKeyPoint,
    Program, ProgramBadge, ProgramKeyPoint, ProgramComparisonMetric
)

class SiteContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteContent
        fields = '__all__'

class UniversityImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityImage
        fields = ['id', 'image', 'caption', 'category', 'order']

class GeorgiaKeyPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeorgiaKeyPoint
        fields = '__all__'

class UniversitySerializer(serializers.ModelSerializer):
    gallery_images = UniversityImageSerializer(many=True, read_only=True)
    georgia_key_points = GeorgiaKeyPointSerializer(many=True, read_only=True)

    class Meta:
        model = University
        fields = [
            'id', 'name', 'location', 'university_type', 'description', 'color_theme', 'image', 'is_active', 'created_at', 
            'gallery_images', 'georgia_key_points',
            'georgia_heading', 'georgia_photo', 'georgia_paragraph',
            'founder_name', 'founder_pic', 'founder_paragraph',
            'hospital_heading', 'hospital_paragraph',
            'campus_heading', 'campus_paragraph',
            'hostel_heading', 'hostel_paragraph'
        ]

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class FaqItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaqItem
        fields = '__all__'

class JourneyStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = JourneyStep
        fields = '__all__'

class ServicePackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicePackage
        fields = '__all__'

class StatCounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatCounter
        fields = '__all__'

class CourseQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseQuestion
        fields = ['id', 'question_text', 'question_type', 'choices', 'is_required', 'order']

class CourseSerializer(serializers.ModelSerializer):
    questions = CourseQuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = ['id', 'name', 'is_active', 'order', 'questions']

class ContactLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactLead
        fields = ['id', 'name', 'email', 'message', 'course', 'answers', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

class WhyGruniBadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyGruniBadge
        fields = '__all__'

class ProgramBadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramBadge
        fields = '__all__'

class ProgramKeyPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramKeyPoint
        fields = '__all__'

class ProgramComparisonMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramComparisonMetric
        fields = '__all__'

class ProgramSerializer(serializers.ModelSerializer):
    badges = ProgramBadgeSerializer(many=True, read_only=True)
    key_points = ProgramKeyPointSerializer(many=True, read_only=True)
    comparison_metrics = ProgramComparisonMetricSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = '__all__'
