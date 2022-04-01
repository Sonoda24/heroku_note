# -*- coding: utf-8 -*-
"""
Created on Sat May 30 10:14:03 2020

@author: user
"""
from django import forms
from .models import My_Image
 
from django.core.files.storage import default_storage

class My_ImageForm(forms.ModelForm):
    class Meta:
        model = My_Image
        fields = ('description', 'photo',)
        

class UploadFileForm(forms.Form):      #初期データの入力用csv対応
    title = forms.CharField(max_length=50)
    file = forms.FileField()
    
