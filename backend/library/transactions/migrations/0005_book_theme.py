# Generated by Django 5.0.4 on 2024-05-10 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0004_alter_transaction_expires_alter_transaction_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='theme',
            field=models.IntegerField(choices=[(0, 'Unmarked'), (1, 'Educational'), (2, 'Scifi'), (3, 'Novel'), (4, 'Biography'), (5, 'Forkids')], default=0),
        ),
    ]
