
from django.conf.urls import include, url
import greeting.views as views



urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^g/(?P<rid>\w+)/$', views.greet, name='greet'),
    url(r'^savegreeting/$', views.save_greeting, name='savegreeting')
]
