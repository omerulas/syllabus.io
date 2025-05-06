from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from core.models import *
from core.forms import *

# Register your models here.

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email", "first_name", "last_name")
    list_display_links = ("email",)
    list_display = ("email", "first_name", "last_name", "is_staff", "is_active", "is_superuser", "last_login")
    list_filter = ("is_staff", "is_active", "is_superuser")
    fieldsets = (
        (None, {"fields": ("email", "first_name", "last_name", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "first_name", "last_name", "password1", "password2", "is_staff",
                "is_active", "is_superuser", "groups", "user_permissions"
            )}
        ),
    )
