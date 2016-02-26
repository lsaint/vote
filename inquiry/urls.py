
from django.conf.urls import include, url
from django.views.generic import TemplateView
import inquiry.views as views



urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='inquiry/index.html'), name='index'),
    url(r'^r/(?P<rid>\w+)/$', views.round, name='round'),
    url(r'^savescore/$', views.save_score, name='savescore'),
    url(r'^move/$', views.move, name='move'),
]

