
import json, random, string

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core.urlresolvers import reverse
from django.core.exceptions import ObjectDoesNotExist

from .models import Round


TITLE = "我5秒戳了%d下,广发卡价格调查局颁给我%s称号,还不来看看你是什么."


@csrf_exempt
def round(request, rid):
    try:
        share = "" if request.method == 'GET' else "1"
        r = Round.objects.get(rid=rid)
        ctx = {"title": TITLE % (r.score, r.level()), "score": r.score,
                "share": share}
        return render(request, 'inquiry/share.html', ctx)
    except ObjectDoesNotExist:
        ctx = {"rid": rid}
        return render(request, 'inquiry/index.html', ctx)



def move(request):
    rid = ''.join(random.sample(string.ascii_letters, 16))
    return render(request, 'inquiry/move.html', {"rid": rid})



# post - {"rid": "abc", "score": 123}
@csrf_exempt
def save_score(request):
    jn = json.loads(request.body.decode('utf-8'))
    s, rid = int(jn["score"]), jn["rid"]
    r, created = Round.objects.get_or_create(rid=rid)
    if not created:
        return HttpResponse("1")
    r.score = s
    r.save()
    return HttpResponse("0")
