# Generated by Django 4.2.11 on 2024-04-21 01:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0005_reportup"),
    ]

    operations = [
        migrations.AlterField(
            model_name="reportup",
            name="date",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 4, 21, 1, 50, 4, 652098, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
