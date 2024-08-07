# Generated by Django 5.0.7 on 2024-07-27 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookstore', '0004_remove_shoppingcart_iduser_remove_shoppingcart_total_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shoppingcart',
            old_name='user',
            new_name='idUser',
        ),
        migrations.RemoveField(
            model_name='shoppingcart',
            name='books',
        ),
        migrations.AddField(
            model_name='shoppingcart',
            name='idBooks',
            field=models.ManyToManyField(to='bookstore.book'),
        ),
    ]
