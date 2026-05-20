from django.contrib import admin
from .models import (
    University, UniversityImage, ContactLead, SiteContent, 
    Testimonial, FaqItem, JourneyStep, 
    ServicePackage, StatCounter
)

@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    list_display = ('identifier', 'text_value', 'image_value')
    search_fields = ('identifier',)

class UniversityImageInline(admin.TabularInline):
    model = UniversityImage
    extra = 1

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'university_type', 'is_active')
    list_filter = ('is_active', 'university_type')
    search_fields = ('name', 'location')
    inlines = [UniversityImageInline]

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'university_name', 'is_active', 'order')
    list_editable = ('order', 'is_active')

@admin.register(FaqItem)
class FaqItemAdmin(admin.ModelAdmin):
    list_display = ('question', 'order')
    list_editable = ('order',)

@admin.register(JourneyStep)
class JourneyStepAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_text', 'order')
    list_editable = ('order',)

@admin.register(ServicePackage)
class ServicePackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_popular', 'order')
    list_editable = ('is_popular', 'order')

@admin.register(StatCounter)
class StatCounterAdmin(admin.ModelAdmin):
    list_display = ('label', 'number_value', 'suffix', 'order')
    list_editable = ('order',)

@admin.register(ContactLead)
class ContactLeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)
