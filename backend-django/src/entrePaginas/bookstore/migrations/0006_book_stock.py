# Generated by Django 5.0.7 on 2024-07-28 03:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookstore', '0005_rename_user_shoppingcart_iduser_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='stock',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
