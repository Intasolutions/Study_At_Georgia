#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input

# Fake the 0007 migration to bypass the DuplicateTable error on Render
python manage.py migrate api 0007_teammember_virtualtour --fake

python manage.py migrate

# Explicitly create the VirtualTour table if it doesn't exist due to faking the migration
python fix_db.py
