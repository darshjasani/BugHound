# Generated by Django 4.2.11 on 2024-04-24 15:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0011_reportdown_image_reportdown_text"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="reportdown",
            name="image",
        ),
        migrations.RemoveField(
            model_name="reportdown",
            name="text",
        ),
    ]