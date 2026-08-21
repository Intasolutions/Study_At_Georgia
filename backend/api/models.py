from django.db import models

class SiteContent(models.Model):
    """Key-Value store for single text blocks (e.g. home_hero_title, whatsapp_number)"""
    identifier = models.CharField(max_length=100, unique=True, help_text="e.g., whatsapp_number, home_hero_title")
    text_value = models.TextField(blank=True, null=True)
    image_value = models.ImageField(upload_to='site_images/', blank=True, null=True)

    def __str__(self):
        return self.identifier

class University(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    university_type = models.CharField(max_length=100, help_text="e.g., Medical, Technical, Comprehensive")
    description = models.TextField()
    color_theme = models.CharField(max_length=255, default="bg-brand-accent/20 text-brand-accent", help_text="Tailwind classes for the tag color")
    image = models.ImageField(upload_to='universities/', blank=True, null=True)
    
    # Georgia & Tbilisi Section
    georgia_heading = models.CharField(max_length=255, default="Georgia & Tbilisi")
    georgia_photo = models.ImageField(upload_to='universities/georgia/', blank=True, null=True)
    georgia_paragraph = models.TextField(blank=True, null=True)

    # Founder Section
    founder_name = models.CharField(max_length=255, blank=True, null=True)
    founder_pic = models.ImageField(upload_to='universities/founder/', blank=True, null=True)
    founder_paragraph = models.TextField(blank=True, null=True)

    # Pino Hospital Section
    hospital_heading = models.CharField(max_length=255, default="Pino Hospital")
    hospital_paragraph = models.TextField(blank=True, null=True)

    # Campus Life Section
    campus_heading = models.CharField(max_length=255, default="Campus Life")
    campus_paragraph = models.TextField(blank=True, null=True)

    # Hostel Section
    hostel_heading = models.CharField(max_length=255, default="Hostel")
    hostel_paragraph = models.TextField(blank=True, null=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Universities"

    def __str__(self):
        return f"{self.name} - {self.location}"

class GeorgiaKeyPoint(models.Model):
    ICON_CHOICES = [
        ('Globe', 'Globe'),
        ('Building2', 'Building'),
        ('Briefcase', 'Briefcase'),
        ('ShieldCheck', 'Shield Check'),
        ('Award', 'Award'),
        ('Users', 'Users'),
        ('MapPin', 'Map Pin'),
        ('GraduationCap', 'Graduation Cap'),
        ('BookOpen', 'Book'),
    ]
    university = models.ForeignKey(University, related_name='georgia_key_points', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='MapPin')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class UniversityImage(models.Model):
    CATEGORY_CHOICES = [
        ('GEORGIA', 'Georgia & Tbilisi'),
        ('MAIN', 'Main University'),
        ('HOSPITAL', 'Pino Hospital'),
        ('CAMPUS', 'Campus Life'),
        ('HOSTEL', 'Hostel'),
    ]
    university = models.ForeignKey(University, related_name='gallery_images', on_delete=models.CASCADE)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='MAIN')
    image = models.ImageField(upload_to='universities/gallery/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['category', 'order']

    def __str__(self):
        return f"{self.get_category_display()} Image for {self.university.name} - {self.order}"

class Testimonial(models.Model):
    student_name = models.CharField(max_length=100)
    university_name = models.CharField(max_length=255)
    quote = models.TextField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.student_name} - {self.university_name}"

class FaqItem(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "FAQ Item"

    def __str__(self):
        return self.question

class JourneyStep(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon_text = models.CharField(max_length=10, help_text="Text to show in the circle (e.g., '1', 'A')")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.order}. {self.title}"

class ServicePackage(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    is_popular = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class StatCounter(models.Model):
    label = models.CharField(max_length=100, help_text="e.g., Students Placed")
    number_value = models.IntegerField()
    suffix = models.CharField(max_length=10, blank=True, help_text="e.g., +, %")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.number_value}{self.suffix} {self.label}"

class ContactLead(models.Model):
    STATUS_CHOICES = [
        ('NEW', 'New'),
        ('CONTACTED', 'Contacted'),
        ('RESOLVED', 'Resolved'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    message = models.TextField()
    course = models.ForeignKey('Course', on_delete=models.SET_NULL, null=True, blank=True, related_name='leads')
    answers = models.JSONField(blank=True, null=True, help_text="Dynamic question answers")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email} ({self.status})"

class Announcement(models.Model):
    message = models.TextField(help_text="The announcement text to display in the carousel")
    link = models.CharField(max_length=255, blank=True, null=True, help_text="Optional link to redirect when clicked")
    is_active = models.BooleanField(default=True, help_text="Toggle to show/hide this announcement")
    order = models.IntegerField(default=0, help_text="Order in the carousel (lower numbers first)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"Announcement {self.id} (Active: {self.is_active})"

class Course(models.Model):
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class CourseQuestion(models.Model):
    QUESTION_TYPES = [
        ('TEXT', 'Text Input'),
        ('CHOICE', 'Multiple Choice (Dropdown)'),
    ]
    course = models.ForeignKey(Course, related_name='questions', on_delete=models.CASCADE)
    question_text = models.CharField(max_length=500)
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES, default='TEXT')
    choices = models.TextField(blank=True, null=True, help_text="Comma-separated options if QUESTION_TYPE is CHOICE. e.g. 'Yes, No' or 'Biology, Commerce'")
    is_required = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.course.name} - {self.question_text}"

class WhyGruniBadge(models.Model):
    ICON_CHOICES = [
        ('Globe', 'Globe'),
        ('Building2', 'Building'),
        ('Briefcase', 'Briefcase'),
        ('ShieldCheck', 'Shield Check'),
        ('Award', 'Award'),
        ('Users', 'Users'),
    ]
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='Globe')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Why Gruni Badge"

    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    badge_text = models.CharField(max_length=100, default="Official Representative")
    subtitle = models.CharField(max_length=255)
    description = models.TextField()
    is_primary = models.BooleanField(default=False, help_text="Set true for the primary representative to use the gold theme.")
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Program(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, help_text="URL friendly name. e.g. mbbs")
    heading = models.CharField(max_length=255, default="Study Program")
    image = models.ImageField(upload_to='programs/', blank=True, null=True)
    paragraph = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class ProgramBadge(models.Model):
    ICON_CHOICES = [
        ('Globe', 'Globe'),
        ('Building2', 'Building'),
        ('Briefcase', 'Briefcase'),
        ('ShieldCheck', 'Shield Check'),
        ('Award', 'Award'),
        ('Users', 'Users'),
        ('HeartPulse', 'Heart Pulse'),
        ('Microscope', 'Microscope'),
        ('Stethoscope', 'Stethoscope'),
        ('BookOpen', 'Book'),
    ]
    program = models.ForeignKey(Program, related_name='badges', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='Globe')
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class ProgramKeyPoint(models.Model):
    ICON_CHOICES = [
        ('Globe', 'Globe'),
        ('Building2', 'Building'),
        ('Briefcase', 'Briefcase'),
        ('ShieldCheck', 'Shield Check'),
        ('Award', 'Award'),
        ('Users', 'Users'),
        ('MapPin', 'Map Pin'),
        ('GraduationCap', 'Graduation Cap'),
        ('BookOpen', 'Book'),
        ('CheckCircle2', 'Check Circle'),
    ]
    program = models.ForeignKey(Program, related_name='key_points', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='CheckCircle2')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class ProgramComparisonMetric(models.Model):
    program = models.ForeignKey(Program, related_name='comparison_metrics', on_delete=models.CASCADE)
    metric_name = models.CharField(max_length=100, help_text="e.g., Duration, Total Cost")
    india_value = models.CharField(max_length=100, help_text="e.g., 5.5 Years")
    georgia_value = models.CharField(max_length=100, help_text="e.g., 6 Years")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.metric_name

class VirtualTour(models.Model):
    title_en = models.CharField(max_length=255)
    title_ge = models.CharField(max_length=255)
    url = models.URLField(max_length=500)
    image = models.ImageField(upload_to='virtual_tours/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Virtual Tour"

    def __str__(self):
        return self.title_en
