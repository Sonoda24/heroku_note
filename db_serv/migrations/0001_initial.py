# Generated by Django 3.0.8 on 2020-07-24 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='My_Data',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no', models.IntegerField(blank=True, null=True, verbose_name='番号')),
                ('theme', models.CharField(blank=True, max_length=30, verbose_name='課題名')),
                ('bunrui1', models.CharField(blank=True, max_length=30, verbose_name='分類１')),
                ('bunrui2', models.CharField(blank=True, max_length=30, verbose_name='分類２')),
                ('bunrui3', models.CharField(blank=True, max_length=30, verbose_name='分類３')),
                ('day_regist', models.CharField(blank=True, max_length=30, verbose_name='登録日')),
                ('day_modify', models.CharField(blank=True, max_length=30, verbose_name='修正日')),
                ('overview', models.TextField(blank=True, verbose_name='概要')),
                ('description', models.TextField(blank=True, verbose_name='詳細')),
                ('keywords', models.TextField(blank=True, verbose_name='KeyWd')),
            ],
        ),
        migrations.CreateModel(
            name='My_Svg',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no', models.IntegerField(blank=True, null=True, verbose_name='番号')),
                ('svg_tags', models.TextField(blank=True, verbose_name='SVG')),
            ],
            options={
                'verbose_name': 'SVG付き記録メモ',
                'verbose_name_plural': 'SVG付き記録メモ一覧',
            },
        ),
    ]
