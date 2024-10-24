from django.contrib import admin
from . models import *
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ("id","username","loginid","password","accessType")

class ProgramsAdmin(admin.ModelAdmin):
    list_display = ("pid","programName","version","release")

class ProgramAreaAdmin(admin.ModelAdmin):
    list_display = ("aid","pid","areaName")

class ReportUpAdmin(admin.ModelAdmin):
    list_display = ("rid","programName","bugType","severity","reproducible","summary","problem","suggestedFix","reportBy","date","status","assignTo")

class ReportDownAdmin(admin.ModelAdmin):
    list_display = ("rdid","rid", "functionArea","AssignTo","file","comments","status","priority","resolution", "resolutionVersion","resolvedBy","resolveDate", "testedBy","testedDate","deferred")


admin.site.register(User, UserAdmin)
admin.site.register(Programs, ProgramsAdmin)
admin.site.register(ProgramArea, ProgramAreaAdmin)
admin.site.register(ReportUp, ReportUpAdmin)
admin.site.register(ReportDown, ReportDownAdmin)