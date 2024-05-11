from django.contrib import admin
from .models import Transaction, Book

# Register your models here.
admin.site.register(Transaction)
admin.site.register(Book)