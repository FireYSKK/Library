from django.urls import path
from . import views

urlpatterns = [
    path('transactions/', views.TransactionView.as_view(), name='transactions'),
    path('detail/<int:pk>', views.TransactionDetailView.as_view(), name='transaction_detail'),
    path('books/', views.BookView.as_view(), name='books'),
    path('books/<int:pk>', views.BookDetailView.as_view(), name='book_detail'),
]
