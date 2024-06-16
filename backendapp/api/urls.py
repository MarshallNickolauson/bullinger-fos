from django.urls import path
from . import views

urlpatterns = [
    path('definitions', views.DefinitionView.as_view({'get':'list', 'post':'create'})),
    path('definitions/<int:pk>', views.DefinitionView.as_view({'get':'retrieve', 'put':'update', 'patch':'partial_update', 'delete':'destroy'})),
    path('usages', views.UsageView.as_view({'get':'list', 'post':'create'})),
    path('usages/<int:pk>', views.UsageView.as_view({'get':'retrieve', 'put':'update', 'patch':'partial_update', 'delete':'destroy'})),
]