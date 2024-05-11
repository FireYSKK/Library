import datetime
import sys

from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Transaction, Book
from .serializers import TransactionSerializer, BookSerializer
from django.core.cache import cache
from django.conf import settings

STATUSES = Transaction.Status


def lending_time():
    return datetime.date.today() + settings.LIBRARY["LENDING_TIME"]


# Define decorator to check access token in redis
def token_required(view_func):
    def wrapper(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access_token')

        if access_token is not None and cache.has_key(access_token):
            return view_func(self, request, *args, **kwargs)

        message = {"message": "Unauthorized"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    return wrapper


# Define decorator to check user is manager
def manager_required(view_func):
    def wrapper(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access_token')

        if access_token is not None and cache.has_key(access_token):
            user_data = cache.get(access_token)
            if user_data["is_manager"]:
                return view_func(self, request, *args, **kwargs)

        message = {"message": "Unauthorized"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    return wrapper


class TransactionView(APIView):
    # Get all transactions
    @token_required
    def get(self, request):
        obj = Transaction.objects.all().order_by('-created_at')
        serializer = TransactionSerializer(obj, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # Create new transaction
    @token_required
    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            book = serializer.validated_data['book']
            book.is_available = False
            book.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionDetailView(APIView):
    def get_object(self, pk):
        try:
            transaction = Transaction.objects.get(pk=pk)
            return transaction
        except:
            return None

    # Get single transaction details with id
    @token_required
    def get(self, request, pk):
        transaction = self.get_object(pk)
        if transaction is None:
            message = {"message": "transaction not found"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = TransactionSerializer(transaction)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Update a transaction with id
    @manager_required
    def patch(self, request, pk):
        transaction = self.get_object(pk)
        if transaction is None:
            message = {"message": "transaction not found"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = TransactionSerializer(transaction, data=request.data, partial=True)
        if serializer.is_valid():
            if serializer.validated_data['status'] == STATUSES.ACTIVE:
                serializer.validated_data['expires'] = lending_time()
            if serializer.validated_data['status'] == STATUSES.DENIED \
                    or serializer.validated_data['status'] == STATUSES.FINISHED:
                book = serializer.validated_data['book']
                book.is_available = True
                book.save()
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete a transaction with id
    @manager_required
    def delete(self, request, pk):
        transaction = self.get_object(pk)
        if transaction is None:
            message = {"message": "transaction not found"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        transaction.delete()
        message = {"message": "transaction deleted"}
        return Response(message, status=status.HTTP_200_OK)

    # Confirm/Deny a transaction with id
    @manager_required
    def head(self, request, pk):
        transaction = self.get_object(pk)
        if transaction is None:
            message = {"message": "transaction not found"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        transaction.is_confirmed = not transaction.is_confirmed
        transaction.save()

        return Response(status=status.HTTP_200_OK)


class BookView(APIView):
    def get(self, request):
        queryset = Book.objects.all()
        search = request.query_params.get('search', None)

        if search:
            keywords = search.split(' ')
            qs = [Q(author__icontains=kw) | Q(title__icontains=kw) for kw in keywords if len(kw) > 2]

            queryset = queryset.filter(*qs)

        serializer = BookSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @manager_required
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookDetailView(APIView):
    def get_object(self, pk):
        try:
            book = Book.objects.get(pk=pk)
            return book
        except:
            return None

    # Get single book details with id
    def get(self, request, pk):
        book = self.get_object(pk)
        if book is None:
            message = {"message": "book not found"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Update a book with id
    @manager_required
    def patch(self, request, pk):
        book = self.get_object(pk)
        if book is None:
            message = {"message": "book not found"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete a transaction with id
    @manager_required
    def delete(self, request, pk):
        book = self.get_object(pk)
        if book is None:
            message = {"message": "book not found"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        book.delete()
        message = {"message": "book deleted"}
        return Response(message, status=status.HTTP_200_OK)

