# -*- coding: utf-8 -*-
"""
Created on Sat May 30 10:17:22 2020

@author: user
"""
from django.urls import path
from . import views

app_name='contact'
urlpatterns = [
    path('', views.index, name='index'),
    path('contact_form/', views.contact_form, name='contact_form'),
    path('contact_form/contact/complete/', views.complete, name='complete'),    
]

