from django.db import models
from datetime import datetime
from django.utils import timezone

# Get the current time in UTC
utc_now = timezone.now()

# Convert the UTC time to PST
pst_now = utc_now.astimezone(timezone.get_current_timezone())

# Format the PST time
pst_time = pst_now.strftime("%Y-%m-%d")


# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key = True)
    username = models.CharField(max_length = 30)
    loginid = models.CharField(max_length = 30, default = 'null')
    password = models.CharField(max_length = 30)
    accessType = models.IntegerField()

class Programs(models.Model):
    pid = models.AutoField(primary_key = True)
    programName = models.CharField(max_length = 30)
    version = models.CharField(max_length = 30)
    release = models.CharField(max_length = 30)

class ProgramArea(models.Model):
    aid = models.AutoField(primary_key = True)
    pid = models.IntegerField()
    areaName = models.CharField(max_length = 300)

class ReportUp(models.Model):
    rid = models.AutoField(primary_key = True)
    programName = models.CharField(max_length = 50)
    bugType = models.CharField(max_length = 30)
    severity = models.CharField(max_length = 30)
    reproducible = models.CharField(max_length = 10)
    summary = models.CharField(max_length = 150)
    problem = models.CharField(max_length = 300)
    suggestedFix = models.CharField(max_length = 300)
    reportBy = models.CharField(max_length = 30)
    date = models.DateTimeField(default=pst_time)
    status = models.CharField(max_length = 30, default = "open")
    assignTo = models.CharField(max_length = 30, default = "n/a")

class ReportDown(models.Model):
    rdid = models.AutoField(primary_key = True)
    rid = models.IntegerField()
    functionArea = models.CharField(max_length = 100)
    file = models.CharField(max_length = 30, default='false')
    AssignTo = models.CharField(max_length = 30)
    comments = models.CharField(max_length = 300)
    status = models.CharField(max_length = 30)
    priority = models.CharField(max_length = 100)
    resolution = models.CharField(max_length = 30)
    resolutionVersion = models.CharField(max_length = 30)
    resolvedBy = models.CharField(max_length = 30)
    resolveDate  = models.DateTimeField(default=pst_time)
    testedBy = models.CharField(max_length = 30)
    testedDate = models.DateTimeField(default=pst_time)
    deferred = models.CharField(max_length = 30)

    

    