
from django.db import models
from django.utils.timezone import now

class Round(models.Model):
    rid = models.CharField(max_length=16, db_index=True)
    score = models.PositiveIntegerField(default=0)
    ctime = models.DateTimeField(default=now)

    def level(self):
        if self.score <= 50:
            return "温柔手"
        if self.score <= 80:
            return "无影手"
        if self.score <= 110:
            return "金手指"
        return "一指禅"
