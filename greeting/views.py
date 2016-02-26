
import json, random, string

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core.urlresolvers import reverse
from django.core.exceptions import ObjectDoesNotExist

from .models import Greeting


def greet(request, rid):
    try:
        r = Greeting.objects.get(rid=rid)
        ctx = {"from": r.from_name, "to": r.to_name,
                "type": r.card_type, "content": r.content}
    except ObjectDoesNotExist:
        ctx = {"rid": rid}
    return render(request, 'greeting/greet.html', ctx)


def index(request):
    rid = ''.join(random.sample(string.ascii_letters, 16))
    return render(request, 'greeting/index.html', {"rid": rid})



# post - {"rid": "abc", "from": "a", "to": "b", "content": "c", "type": 1}
@csrf_exempt
def save_greeting(request):
    print(request.body.decode('utf-8'))
    jn = json.loads(request.body.decode('utf-8'))
    rid = jn["rid"]
    r, created = Greeting.objects.get_or_create(rid=rid)
    if not created:
        return HttpResponse("1")
    r.from_name = jn["from"]
    r.to_name = jn["to"]
    r.content = jn["content"]
    r.card_type = int(jn["type"])
    r.save()
    return HttpResponse("0")
