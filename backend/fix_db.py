import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.db import connection
from django.apps import apps

VirtualTour = apps.get_model('api', 'VirtualTour')

with connection.schema_editor() as schema_editor:
    try:
        schema_editor.create_model(VirtualTour)
        print("VirtualTour table created successfully!")
    except Exception as e:
        print("VirtualTour table creation skipped/failed:", e)
