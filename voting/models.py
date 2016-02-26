
from django.db import models
from django.utils.timezone import now
from django.core.cache import cache
from django.contrib.auth.models import User


class Topic(models.Model):
    uid = models.IntegerField(unique=True)
    photo = models.ImageField(upload_to="photo")
    wid = models.IntegerField(default=0, blank=True)
    name = models.CharField(max_length=16,default="", blank=True)
    poll = models.PositiveIntegerField(default=0)
    public = models.BooleanField(default=False)
    ctime = models.DateTimeField(default=now)


    def ranking(self):
        k = "topic_uid_%d" % self.uid
        v = cache.get(k)
        if not v:
            r = Topic.objects.filter(poll__gt=self.poll).count() + 1
            cache.set(k, r, 5)
            return r
        return v


class Poll(models.Model):
    tid = models.IntegerField(db_index=True)
    uid = models.IntegerField(db_index=True)


