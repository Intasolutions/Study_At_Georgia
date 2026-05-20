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
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Universities"

    def __str__(self):
        return f"{self.name} - {self.location}"

class UniversityImage(models.Model):
    university = models.ForeignKey(University, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='universities/gallery/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image for {self.university.name} - {self.order}"

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
    email = models.EmailField()
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email} ({self.status})"
