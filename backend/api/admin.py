from django.contrib import admin
from .models import (
    University, UniversityImage, ContactLead, SiteContent, 
    Testimonial, FaqItem, JourneyStep, 
    ServicePackage, StatCounter, Announcement,
    Course, CourseQuestion, WhyGruniBadge,
    GeorgiaKeyPoint,
    Program, ProgramBadge, ProgramKeyPoint, ProgramComparisonMetric,
    TeamMember
)

@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    list_display = ('identifier', 'text_value', 'image_value')
    search_fields = ('identifier',)

class UniversityImageInline(admin.TabularInline):
    model = UniversityImage
    extra = 1

class GeorgiaKeyPointInline(admin.TabularInline):
    model = GeorgiaKeyPoint
    extra = 1

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'university_type', 'is_active')
    list_filter = ('is_active', 'university_type')
    search_fields = ('name', 'location')
    inlines = [GeorgiaKeyPointInline, UniversityImageInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'location', 'university_type', 'description', 'color_theme', 'image', 'is_active')
        }),
        ('Georgia & Tbilisi Section', {
            'fields': ('georgia_heading', 'georgia_photo', 'georgia_paragraph'),
            'classes': ('collapse',)
        }),
        ('Founder / Main Section', {
            'fields': ('founder_name', 'founder_pic', 'founder_paragraph'),
            'classes': ('collapse',)
        }),
        ('Pino Hospital Section', {
            'fields': ('hospital_heading', 'hospital_paragraph'),
            'classes': ('collapse',)
        }),
        ('Campus Life Section', {
            'fields': ('campus_heading', 'campus_paragraph'),
            'classes': ('collapse',)
        }),
        ('Hostel Section', {
            'fields': ('hostel_heading', 'hostel_paragraph'),
            'classes': ('collapse',)
        }),
    )

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
    list_display = ('name', 'email', 'course', 'status', 'created_at')
    list_filter = ('status', 'course', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('message', 'is_active', 'order', 'created_at')
    list_editable = ('is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('message',)

class CourseQuestionInline(admin.TabularInline):
    model = CourseQuestion
    extra = 1

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'order')
    list_editable = ('is_active', 'order')
    inlines = [CourseQuestionInline]

@admin.register(WhyGruniBadge)
class WhyGruniBadgeAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'is_active', 'order')
    list_editable = ('icon', 'is_active', 'order')
    list_filter = ('is_active', 'icon')
    search_fields = ('title', 'description')

@admin.register(GeorgiaKeyPoint)
class GeorgiaKeyPointAdmin(admin.ModelAdmin):
    list_display = ('title', 'university', 'icon', 'order')
    list_editable = ('icon', 'order')
    list_filter = ('university',)
    search_fields = ('title', 'description')

class ProgramBadgeInline(admin.TabularInline):
    model = ProgramBadge
    extra = 1

class ProgramKeyPointInline(admin.TabularInline):
    model = ProgramKeyPoint
    extra = 1

class ProgramComparisonMetricInline(admin.TabularInline):
    model = ProgramComparisonMetric
    extra = 1

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active', 'order')
    list_editable = ('is_active', 'order')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProgramBadgeInline, ProgramKeyPointInline, ProgramComparisonMetricInline]
    search_fields = ('name', 'heading')

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'badge_text', 'is_primary', 'is_active', 'order')
    list_editable = ('is_primary', 'is_active', 'order')
    list_filter = ('is_primary', 'is_active')
    search_fields = ('name', 'subtitle')
