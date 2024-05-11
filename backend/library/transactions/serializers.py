from rest_framework import serializers
from .models import Transaction, Book


class TransactionSerializer(serializers.ModelSerializer):
    customer = serializers.SlugRelatedField(
        read_only=True,
        slug_field='last_name'
    )
    book = serializers.SlugRelatedField(
        read_only=True,
        slug_field='title'
    )
    confirmed_by = serializers.SlugRelatedField(
        read_only=True,
        slug_field='last_name'
    )

    class Meta:
        model = Transaction
        fields = ["id", "customer", "book", "status", "confirmed_by", "is_expired"]


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title", "author", "description", "is_available", "image", "image_online"]