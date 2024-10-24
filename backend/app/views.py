from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from django.http.response import Http404, JsonResponse
# Create your views here.
            
class UserView(APIView):
    def get(self, request, pk=None, userid=None, password=None):
        if pk:
            try:
                data = User.objects.get(id=pk)
                output = UserSerializer(data)
            except User.DoesNotExist:
                raise Http404
        elif userid:
            try:
                data = User.objects.get(loginid = userid, password = password)
                output = UserSerializer(data)
            except User.DoesNotExist:
                raise Http404
        
        else:
            data = User.objects.all()
            output = UserSerializer(data, many = True)
            
        return Response(output.data)

    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)

    def put(self, request, pk = None):
        data_to_update = User.objects.get(id=pk)
        serializer = UserSerializer(instance = data_to_update, data = request.data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    def delete(self, request, pk):
        data_to_delete = User.objects.get(id = pk)
        data_to_delete.delete()
        return JsonResponse("Data Deleted Successfully", safe = False)

 
class ProgramsView(APIView):
    def get(self, request, pid=None, pname=None, version=None, release=None):
        if pid:
            try:
                data = Programs.objects.get(pid=pid)
                output = ProgramsSerializer(data)
            except Programs.DoesNotExist:
                raise Http404
        elif pname and version == None:
            try:
                data = Programs.objects.filter(programName = pname)
                output = ProgramsSerializer(data, many = True)
            except Programs.DoesNotExist:
                raise Http404
        elif pname and version and release == None:
            try:
                data = Programs.objects.filter(programName = pname, version = version)
                output = ProgramsSerializer(data, many = True)
            except Programs.DoesNotExist:
                raise Http404
        elif pname and version and release:
            try:
                data = Programs.objects.filter(programName = pname, version = version, release = release)
                output = ProgramsSerializer(data, many = True)
            except Programs.DoesNotExist:
                raise Http404
        else:
            data = Programs.objects.all()
            output = ProgramsSerializer(data, many = True)
            
        return Response(output.data)

    def post(self, request):
        serializer = ProgramsSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)

    def put(self, request, pid = None):
        data_to_update = Programs.objects.get(pid=pid)
        serializer = ProgramsSerializer(instance = data_to_update, data = request.data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    def delete(self, request, pid):
        data_to_delete = Programs.objects.get(pid = pid)
        data_to_delete.delete()
        return JsonResponse("Data Deleted Successfully", safe = False)

  
class ProgramAreaView(APIView):
    def get(self, request, aid=None, pid=None):
        if aid:
            try:
                data = ProgramArea.objects.get(aid=aid)
                output = ProgramAreaSerializer(data)
            except ProgramArea.DoesNotExist:
                raise Http404
        elif pid:
            try:
                data = ProgramArea.objects.filter(pid = pid)
                output = ProgramAreaSerializer(data, many=True)
            except ProgramArea.DoesNotExist:
                raise Http404
        
        else:
            data = ProgramArea.objects.all()
            output = ProgramAreaSerializer(data, many = True)
            
        return Response(output.data)

    def post(self, request):
        serializer = ProgramAreaSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)

    def put(self, request, aid = None, pid = None):
        if aid and pid :
            data_to_update = ProgramArea.objects.get(aid=aid, pid=pid)
            serializer = ProgramAreaSerializer(instance = data_to_update, data = request.data, partial = True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        else:
            return JsonResponse("Not found", safe=False)

    def delete(self, request, aid):
        data_to_delete = ProgramArea.objects.get(aid = aid)
        data_to_delete.delete()
        return JsonResponse("Data Deleted Successfully", safe = False)


class ReportUpView(APIView):
    def get(self, request, rid=None, pid=None, severity=None, reportby=None, status=None, assignTo=None):
        if rid:
            try:
                data = ReportUp.objects.filter(rid=rid)
                output = ReportUpSerializer(data, many = True)
            except ReportUp.DoesNotExist:
                raise Http404
        elif reportby:
            if severity:
                try:
                    data = ReportUp.objects.filter(reportBy=reportby, severity=severity)
                    output = ReportUpSerializer(data, many = True)
                except ReportUp.DoesNotExist:
                    raise Http404
            else:
                try:
                    data = ReportUp.objects.filter(reportBy=reportby)
                    output = ReportUpSerializer(data, many = True)
                except ReportUp.DoesNotExist:
                    raise Http404
        elif pid:
            try:
                data = ReportUp.objects.filter(programName=pid)
                output = ReportUpSerializer(data, many = True)
            except ReportUp.DoesNotExist:
                raise Http404
        elif severity:
            try:
                data = ReportUp.objects.filter(severity=severity)
                output = ReportUpSerializer(data, many = True)
            except ReportUp.DoesNotExist:
                raise Http404
        elif status:
            try:
                data = ReportUp.objects.filter(status=status)
                output = ReportUpSerializer(data, many = True)
            except ReportUp.DoesNotExist:
                raise Http404
        elif assignTo:
            try:
                data = ReportUp.objects.filter(assignTo=assignTo)
                output = ReportUpSerializer(data, many = True)
            except ReportUp.DoesNotExist:
                raise Http404
        else:
            data = ReportUp.objects.filter(status='open')
            output = ReportUpSerializer(data, many = True)
        return Response(output.data)

    def put(self, request, rid = None):
        data_to_update = ReportUp.objects.get(rid=rid)
        serializer = ReportUpSerializer(instance = data_to_update, data = request.data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    def post(self, request):
        serializer = ReportUpSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)


class ReportDownView(APIView):
    def get(self, request, rid=None, assignTo=None):
        if rid : 
            data = ReportDown.objects.filter(rid=rid)
            output = ReportDownSerializer(data, many = True)
        elif assignTo :
            data = ReportDown.objects.filter(AssignTo=assignTo)
            output = ReportDownSerializer(data, many = True)
        else:
            data = ReportDown.objects.all()
            output = ReportDownSerializer(data, many = True)
        return Response(output.data)

    def post(self, request):
        serializer = ReportDownSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data)