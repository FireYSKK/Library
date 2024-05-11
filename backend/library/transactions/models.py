from django.db import models
from django_cleanup import cleanup
from django.conf import settings
import datetime

PENDING_TIME = settings.LIBRARY["PENDING_TIME"]


@cleanup.select
class Book(models.Model):
    class Themes(models.IntegerChoices):
        UNMARKED = 0
        EDUCATIONAL = 1
        SCIFI = 2
        NOVEL = 3
        BIOGRAPHY = 4
        FORKIDS = 5

    title = models.TextField()
    author = models.TextField()
    description = models.TextField()
    theme = models.IntegerField(choices=Themes, default=Themes.UNMARKED)
    is_available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='covers/', null=True, blank=True)
    image_online = models.TextField(default='google.com')

    def __str__(self):
        return f"{self.title} | {self.author}"


class Transaction(models.Model):
    class Status(models.IntegerChoices):
        CREATED = 0
        PENDING = 1
        ACTIVE = 2
        DENIED = 3
        EXPIRED = 4
        FINISHED = 5

    customer = models.ForeignKey("authentication.CustomUser", models.CASCADE, related_name="transaction_customer")
    book = models.ForeignKey("Book", models.CASCADE, null=True)
    created_at = models.DateField(auto_now_add=True)
    expires = models.DateField(default=datetime.date.today() + PENDING_TIME)
    status = models.IntegerField(choices=Status, default=Status.PENDING)
    confirmed_by = models.ForeignKey('authentication.CustomUser', models.DO_NOTHING, null=True, blank=True,
                                     related_name="transaction_manager")
    is_expired = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.customer.first_name} {self.customer.last_name} | {self.book.title}"
