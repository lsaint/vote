# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Greeting',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('rid', models.CharField(max_length=16, db_index=True)),
                ('from_name', models.CharField(max_length=16)),
                ('to_name', models.CharField(max_length=16)),
                ('content', models.CharField(max_length=64)),
                ('card_type', models.PositiveIntegerField(default=1)),
                ('ctime', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
