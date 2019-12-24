from listdata import views
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

# 定义tags和items的接口
urlpatterns = [
    url(r'^tags/$', views.TagList.as_view()),
    url(r'^tags/(?P<pk>[0-9]+)/$', views.TagDetail.as_view()),
    url(r'^items/$', views.ItemList.as_view()),
    url(r'^items/(?P<pk>[0-9]+)/$', views.ItemDetail.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)