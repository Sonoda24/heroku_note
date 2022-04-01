from django.db import models

# Create your models here.
class My_Index(models.Model):
    # TODO: Define fields here
    no = models.IntegerField('番号', blank=True, null=True)
    kind= models.CharField('種類', blank=True, max_length=30)
    mfg = models.BooleanField('Modf',default=False)
    level= models.IntegerField('Level', blank=True, null=True)
    rec_num= models.IntegerField('Rec_num', blank=True, null=True)
    key_nums= models.IntegerField('Key_num', blank=True, null=True)
    key_tags = models.TextField('Keys', blank=True) 

class My_Data(models.Model):
    # TODO: Define fields here
    no = models.IntegerField('番号', blank=True, null=True)
    kind= models.CharField('種類', blank=True, max_length=30)
    dfg = models.BooleanField('DEL',default=False)
    mfg = models.BooleanField('Modf',default=False)
    svg_no = models.IntegerField('svg_no', blank=True, null=True)
    cnsvg_nums=models.IntegerField('csvg_nums', blank=True, null=True)
    cnsvg_tags = models.CharField('cnsvg_tags', blank=True, max_length=200)
    theme = models.CharField('課題名', blank=True, max_length=30)
    bunrui1 = models.CharField('分類１', blank=True, max_length=30)
    bunrui2 = models.CharField('分類２', blank=True, max_length=30)
    bunrui3 = models.CharField('分類３', blank=True, max_length=30)
    day_regist = models.CharField('登録日', blank=True, max_length=30)
    day_modify = models.CharField('修正日', blank=True, max_length=30)
    author = models.CharField('著者', blank=True, max_length=30)
    overview = models.TextField('概要', blank=True)
    description = models.TextField('詳細', blank=True)
    keywords = models.TextField('KeyWd', blank=True)

class My_Sys(models.Model):
    # TODO: Define fields here
    no = models.IntegerField('番号', blank=True, null=True)
    kind= models.CharField('種類', blank=True, max_length=30)
    dfg = models.BooleanField('DEL',default=False)
    svg_no = models.IntegerField('svg_no', blank=True, null=True)
    theme = models.CharField('課題名', blank=True, max_length=30)
    bunrui1 = models.CharField('分類１', blank=True, max_length=30)
    bunrui2 = models.CharField('分類２', blank=True, max_length=30)
    bunrui3 = models.CharField('分類３', blank=True, max_length=30)
    day_regist = models.CharField('登録日', blank=True, max_length=30)
    day_modify = models.CharField('修正日', blank=True, max_length=30)
    author = models.CharField('著者', blank=True, max_length=30)
    overview = models.TextField('概要', blank=True)
    description = models.TextField('詳細', blank=True)
    keywords = models.TextField('KeyWd', blank=True)

class My_Svg(models.Model):
    # TODO: Define fields here
    no = models.IntegerField('番号', blank=True, null=True)
    kind= models.CharField('種類', blank=True, max_length=30)
    dfg = models.BooleanField('DEL',default=False)
    mfg = models.BooleanField('Modf',default=False)
    svg_tags = models.TextField('SVG', blank=True) 

class My_CnSvg(models.Model):
    # TODO: Define fields here
    no = models.IntegerField('番号', blank=True, null=True)
    kind= models.CharField('種類', blank=True, max_length=30)
    dfg = models.BooleanField('DEL',default=False)
    mfg = models.BooleanField('Modf',default=False)
    svg_tags = models.TextField('SVG', blank=True) 


class My_Recs(models.Model):
    # TODO: Define fields here
    no = models.IntegerField('番号', blank=True, null=True)
    kind= models.CharField('種類', blank=True, max_length=30)
    mfg = models.BooleanField('Modf',default=False)
    rec_num= models.IntegerField('Rec_num', blank=True, null=True)
    tags = models.TextField('Tags', blank=True) 

class My_Image(models.Model):
    description = models.CharField(max_length=255, blank=True)
    photo = models.ImageField(upload_to='Document/')
    uploaded_at = models.DateTimeField(auto_now_add=True)    

"""
class Meta:
        verbose_name = 'SVG付き記録メモ'
        verbose_name_plural = 'SVG付き記録メモ一覧'
"""

def __unicode__(self):
        return(self.name)