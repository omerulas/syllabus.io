import json
from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
from core.models import *

# Create your views here.

def index(request: HttpRequest):
    return render(request, 'index.html')

@require_http_methods(['GET'])
@ensure_csrf_cookie
def set_csrf_token(request:HttpRequest):
    # CSRF Token setter view
    return JsonResponse(data={}, status=200)

@require_http_methods(['GET'])
def check_session(request:HttpRequest):
    """ Check user has authenticated """
    response = {
        'user': {
            'email': None,
            'isAuthenticated': False
        },
    }
    
    if(request.user.is_authenticated):
        response.update({
            'user': {
                'email': request.user.email,
                'isAuthenticated': request.user.is_authenticated
            }
        })
    
    return JsonResponse(data=response, status=200)

@require_http_methods(['POST'])
def auth(request: HttpRequest):
    """ Basic user authentication system """
    response = {
        'user': {
            'email': None,
            'isAuthenticated': False
        },
        'message': None
    }
    
    data = json.loads(request.body.decode('utf-8'))
    
    user = authenticate(request=request, **data)
        
    # Authenticate user if exists
    if user is not None:
        login(request=request, user=user)
        response.update({
            'user' : {
                'email': user.email,
                'isAuthenticated': user.is_authenticated
            },
            'message': 'Giriş yapıldı'
        })
    else:
        response.update({'message': 'E-posta veya şifre hatalı'})
    
    return JsonResponse(data=response, status=200)