from rest_framework import serializers
from .models import (
    University, UniversityImage, ContactLead, SiteContent, 
    Testimonial, FaqItem, JourneyStep, 
    ServicePackage, StatCounter
)

class SiteContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteContent
        fields = '__all__'

class UniversityImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniversityImage
        fields = ['id', 'image', 'caption', 'order']

class UniversitySerializer(serializers.ModelSerializer):
    gallery_images = UniversityImageSerializer(many=True, read_only=True)

    class Meta:
        model = University
        fields = ['id', 'name', 'location', 'university_type', 'description', 'color_theme', 'image', 'is_active', 'created_at', 'gallery_images']

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

class ContactLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactLead
        fields = ['id', 'name', 'email', 'message', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']
