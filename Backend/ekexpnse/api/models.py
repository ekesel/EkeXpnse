from django.db import models

# Create your models here.

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


categories = (
    ('Education','Education'),
    ('Healthcare','Healthcare'),
    ('Shopping','Shopping'),
    ('Food','Food'),
    ('Other','Other')
)

class expenses(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    desc = models.CharField(max_length=500)
    price = models.IntegerField()
    category = models.CharField(choices=categories, max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)