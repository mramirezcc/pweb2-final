# Generated by Django 5.0.7 on 2024-07-27 16:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookstore', '0003_message'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shoppingcart',
            name='idUser',
        ),
        migrations.RemoveField(
            model_name='shoppingcart',
            name='total',
        ),
        migrations.AddField(
            model_name='shoppingcart',
            name='books',
            field=models.ManyToManyField(related_name='carts', to='bookstore.book'),
        ),
        migrations.AddField(
            model_name='shoppingcart',
            name='date',
            field=models.DateField(auto_now=True),
        ),
        migrations.AddField(
            model_name='shoppingcart',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='shopping_cart', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='CartBook',
        ),
    ]