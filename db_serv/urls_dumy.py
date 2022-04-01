# -*- coding: utf-8 -*-
"""
Created on Sat May 30 10:17:22 2020

@author: user
"""
from django.urls import path
from . import views

from django.conf import settings

from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

#app_name = 'db_serv' 
#上記を取るとWARNINGS:?: (urls.W005) が消えるが？？？

urlpatterns = [
    path('', views.index, name='index'),
    path('set_shipment/', views.set_shipment, name='set_shipment'),
    path('nlist', views.nlist,name='nlist'),
    path('new_list/', views.new_list, name='new_list'),
    path('new_list_shipment/', views.new_list_shipment, name='new_list_shipment'),
    path('get_combo/', views.get_combo, name='get_combo'),
    path('get_rec/', views.get_rec, name='get_rec'),
    path('del_rec/', views.del_rec, name='del_rec'),
    path('detail', views.detail, name='detail'),
    path('editor/<int:data_id>/', views.editor, name='editor'),
    path('editor_shipment/<int:data_id>/', views.editor_shipment, name='editor_shipment'),
    path('update/', views.update, name='update'),
    path('update_sys/', views.update_sys, name='update_sys'),
    path('get_script/', views.get_script, name='get_script'),
    path('newrec/', views.newrec, name='newrec'),
    path('copynew/', views.copynew, name='copynew'),
    path('save_cnsvg/', views.save_cnsvg, name='save_cnsvg'),
    path('get_cnsvg/', views.get_cnsvg, name='get_cnsvg'),
    path('upload_add_formatcsv/', views.upload_add_formatcsv, name='upload_add_formatcsv'),
    path('upload_init/', views.upload_init, name='upload_init'),
    path('upload_add/', views.upload_add, name='upload_add'),
    path('sql_download/', views.sql_download, name='sql_download'),
    path('prepare_system/', views.prepare_system, name='prepare_system'),
    path('save_all/', views.save_all, name='save_all'),
    path('get_page/', views.get_page, name='get_page'),
    path('get_index/', views.get_index, name='get_index'),
    path('mod_index/', views.mod_index, name='mod_index'),
    path('make_index/', views.make_index, name='make_index'),
    path('resolve_index/', views.resolve_index, name='resolve_index'),
    path('ai_image/', views.ai_image, name='ai_image'),
    path('showall/', views.showall, name='showall'),
    path('imageupload/', views.imageupload, name='imageupload'),
    path('imagedownload/', views.imagedownload, name='imagedownload'),
    path('download/<int:data_id>/', views.download, name='download'),
    path('image_down/', views.My_ImageList.as_view(), name='image_down'),
    path('get_mylist/', views.get_mylist, name='get_mylist'),
    path('get_mylist2/', views.get_mylist2, name='get_mylist2'),
    path('get_testchar/', views.get_testchar, name='get_testchar'),
    #path('get/', views.My_ImageList.as_view(), name='get'),
    path('pagenation/', views.pagenation, name='pagenation'),
    path('mail_to/', views.mail_to, name='mail_to'),
    path('display/', name='diaplay'),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)