from django.urls import path

from core.views import *

urlpatterns = [
    path(route='', view=index, name='index'),
    path(route='login', view=auth, name='login'),
    path(route='set-csrf-token', view=set_csrf_token, name='set-csrf-token'),
    path(route='check-session', view=check_session, name='check-session'),
]