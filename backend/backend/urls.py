"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app.views import *
from rest_framework import routers


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", UserView.as_view()),
    path("login/",UserView.as_view()),
    path("login/<int:pk>/",UserView.as_view()),
    path("login/<str:userid>/<str:password>/",UserView.as_view()),
    path("programs/",ProgramsView.as_view()),
    path("programs/<int:pid>/",ProgramsView.as_view()),
    path("programs/<str:pname>/",ProgramsView.as_view()),
    path("programs/<str:pname>/<int:version>/",ProgramsView.as_view()),
    path("programs/<str:pname>/<int:version>/<int:release>/",ProgramsView.as_view()),
    path("programareas/",ProgramAreaView.as_view()),
    path("programareas/<int:pid>/",ProgramAreaView.as_view()),
    path("programareas/<int:pid>/<int:aid>/",ProgramAreaView.as_view()),
    path("report/",ReportUpView.as_view()),
    path("report/status=<str:status>/",ReportUpView.as_view()),
    path("report/assignto=<str:assignTo>/",ReportUpView.as_view()),
    path("report/pid=<int:pid>/",ReportUpView.as_view()),
    path("report/rid=<int:rid>/",ReportUpView.as_view()),
    path("report/user=<str:reportby>/",ReportUpView.as_view()),
    path("report/severity=<str:severity>/",ReportUpView.as_view()),
    path("report/severity=<str:severity>/user=<str:reportby>/",ReportUpView.as_view()),
    path("reports/",ReportDownView.as_view()),
    path("reports/assignto=<str:assignTo>/",ReportDownView.as_view()),
    path("reports/rid=<int:rid>/",ReportDownView.as_view()),
    path("reports/user=<str:reportby>/",ReportDownView.as_view()),
    path("reports/severity=<str:severity>/",ReportDownView.as_view()),
    path("reports/severity=<str:severity>/user=<str:reportby>/",ReportDownView.as_view()),
]


