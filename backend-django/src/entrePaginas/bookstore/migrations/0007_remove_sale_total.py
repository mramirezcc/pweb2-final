# Generated by Django 5.0.7 on 2024-07-28 14:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookstore', '0006_book_stock'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sale',
            name='total',
        ),
    ]
