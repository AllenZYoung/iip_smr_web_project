# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-10-25 04:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iip_smr_web_app', '0003_storypage'),
    ]

    operations = [
        migrations.AddField(
            model_name='storypage',
            name='image',
            field=models.ImageField(default='iip_search_app/images/placeholder2.png', upload_to='iip_search_app/'),
        ),
    ]
