
from django.db import models
from django.utils.timezone import now

class Greeting(models.Model):
    rid = models.CharField(max_length=16, db_index=True)
    from_name = models.CharField(max_length=16)
    to_name = models.CharField(max_length=16)
    content = models.CharField(max_length=64)
    card_type = models.PositiveIntegerField(default=1)
    ctime = models.DateTimeField(default=now)
