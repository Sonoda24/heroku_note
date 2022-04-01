# -*- coding: utf-8 -*-
from django.http import HttpResponseRedirect
from django.template import Context, loader
from django.shortcuts import render, redirect

from django.core import serializers

from django import template

register = template.Library() # Djangoのテンプレートタグライブラリ

"""
@register.my_list
def get_mylist(request):
    print('get_mylist Get/Post=',request.POST,' FILES=',request.FILES)
    
    my_image_list=My_Image.objects.all()
    print(my_image_list)
    #data={'list':my_image_list}
    #data=my_image_list
    response = serializers.serialize("json", my_image_list, ensure_ascii=False)
    #return HttpResponse(response)
    return render(response)
    
    #return HttpResponse(my_image_list)
"""
# ------------------------------------------------------------------
# カスタムタグとして登録する
@register.simple_tag
def multiply(value1, value2):
    return value1 * value2
