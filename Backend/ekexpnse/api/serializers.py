from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username','password','email']


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100)

class AddExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = expenses
        fields = ['title','desc','price','category']

class GetExpensesSerializer(serializers.ModelSerializer):

    class Meta:
        model = expenses
        fields = ['title','desc','price','category','createdAt','id']

class GetExpenseIdSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    