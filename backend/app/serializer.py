from rest_framework import serializers
from . models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','loginid','password','accessType']


class ProgramsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programs
        fields = ['pid','programName','version','release']

class ProgramAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramArea
        fields = ['aid','pid','areaName']

class ReportUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportUp
        fields = ["rid","programName","bugType","severity","reproducible","summary","problem","suggestedFix","reportBy","date","status","assignTo"]

class ReportDownSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportDown
        fields = ["rdid","rid", "functionArea","AssignTo","file","comments","status","priority","resolution", "resolutionVersion","resolvedBy","resolveDate", "testedBy","testedDate","deferred"]
