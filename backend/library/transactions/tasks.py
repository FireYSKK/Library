import sys

from .models import Transaction
from library.celery import app

import datetime

STATUSES = Transaction.Status


@app.task
def check_expiration():
    queryset = Transaction.objects.filter(status__in=[Transaction.Status.PENDING, Transaction.Status.ACTIVE])
    queryset = queryset.filter(expires__lt=datetime.date.today())

    for transaction in queryset:
        if transaction.status == STATUSES.PENDING:
            transaction.status = STATUSES.DENIED

            book = transaction.book
            book.is_available = True
            book.save()
        elif transaction.status == STATUSES.ACTIVE:
            transaction.status = STATUSES.EXPIRED
            transaction.is_expired = True
        transaction.save()
