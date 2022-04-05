from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import *
from rest_framework import generics, permissions
from django.core.exceptions import ObjectDoesNotExist
from .models import *
from .serializers import *
from django.contrib.auth import authenticate, login



@api_view(['POST'])
@permission_classes([])
def signup(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = User.objects.create_user(username,email,password)
            user = authenticate(username=username, password=password)
            if user is not None:
                token = Token.objects.get(user=user)
                login(request, user)
                data = {
                    "response":"User Created",
                    "token":token.key
                }
                return Response(data,status=200)
            else:
                data = {
                    "response":"Invalid Credentials"
                }
                return Response(data, status=400)
        else:
            return Response(serializer.errors,status=406)
    else:
        return Response(status=404)

@api_view(['POST'])
@permission_classes([])
def signin(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                token = Token.objects.get(user=user)
                data = {
                    "response":"Login Success",
                    "token":token.key
                }
                return Response(data,status=200)
            else:
                data = {
                    "response":"Invalid Credentials"
                }
                return Response(data, status=400)
        else:
            return Response(serializer.errors,status=406)
    else:
        return Response(status=404)

@api_view(['POST', 'GET', 'DELETE'])
@permission_classes((IsAuthenticated, ))
def manageexpenses(request):
    user = request.user
    if request.method == 'POST':
        serializer = AddExpenseSerializer(data=request.data)
        if serializer.is_valid():
            objs = expenses.objects.create(user=user,**serializer.validated_data)
            obj = expenses.objects.filter(user=user)
            serializer = GetExpensesSerializer(obj, many=True)
            return Response(serializer.data,status=200)
        else:
            return Response(serializer.errors,status=406)
    elif request.method == 'GET':
        obj = expenses.objects.filter(user=user)
        serializer = GetExpensesSerializer(obj, many=True)
        return Response(serializer.data,status=200)
    elif request.method == 'DELETE':
        serializer = GetExpenseIdSerializer(data=request.data)
        if serializer.is_valid():
            id = serializer.validated_data['id']
            try:
                obj = expenses.objects.get(id=id)
            except ObjectDoesNotExist:
                data = {
                    "response":"Id does not exist"
                }
                return Response(data,status=406)
            obj.delete()
            obj = expenses.objects.filter(user=user)
            serializer = GetExpensesSerializer(obj, many=True)
            return Response(serializer.data,status=200)
        else:
            return Response(serializer.errors,status=406)
    else:
        return Response(status=404)
