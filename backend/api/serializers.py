from rest_framework import serializers
from .models import (
    University, ContactLead, SiteContent, 
    Testimonial, FaqItem, JourneyStep, 
    ServicePackage, StatCounter
)

class SiteContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteContent
        fields = '__all__'

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'

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
