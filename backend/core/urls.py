from django.urls import path

from core.views import *

urlpatterns = [
    path(route='', view=index, name='index')
]