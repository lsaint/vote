# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inquiry', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='round',
            name='rid',
            field=models.CharField(db_index=True, default='abc', max_length=16),
            preserve_default=False,
        ),
    ]
