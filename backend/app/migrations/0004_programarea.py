# Generated by Django 4.2.11 on 2024-04-19 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_programs"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProgramArea",
            fields=[
                ("aid", models.AutoField(primary_key=True, serialize=False)),
                ("pid", models.IntegerField()),
                ("areaName", models.CharField(max_length=300)),
            ],
        ),
    ]
