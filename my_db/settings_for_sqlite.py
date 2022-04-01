"""
Django settings for my_db project.

Generated by 'django-admin startproject' using Django 3.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""
from django.conf import settings
from django.conf.urls.static import static
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'pfelij@7*l8l0p^y8oboe3+lasux_riw5#76u1q_^(xx+8et)@'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'db_serv',
    'contact',
    'db_serv.templatetags.db_exst',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'my_db.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': False,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media', # これを追加する
            ],
        },
    },
]

WSGI_APPLICATION = 'my_db.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    [
        os.path.join(BASE_DIR, "static"),
    ]
)    
#""" メールサーバー用　"""
EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'yzr.sonoda@gmail.com'
EMAIL_HOST_PASSWORD = 'kkyluagrfjgfygaz'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

"""
from google.cloud import logging as google_cloud_logging
log_client = google_cloud_logging.Client()

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'stackdriver_logging': {
            'class': 'google.cloud.logging.handlers.AppEngineHandler',
            'client': log_client,
        },
    },
    'loggers': {
        'django': {
            'handlers': ['stackdriver_logging'],
            'level': 'INFO',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['stackdriver_logging'],
            'level': 'ERROR',
        },
    },
    'root': {
        'handlers': ['stackdriver_logging'],
        'level': 'INFO',
    }
}
"""

"""
LOGGING = {
    'version': 1,   # これを設定しないと怒られる
    'formatters': { # 出力フォーマットを文字列形式で指定する
        'all': {    # 出力フォーマットに`all`という名前をつける
            'format': '\t'.join([
                "[%(levelname)s]",
                "asctime:%(asctime)s",
                "module:%(module)s",
                "message:%(message)s",
#                "process:%(process)d",
#                "thread:%(thread)d",
            ])
        },
    },
    'handlers': {  # ログをどこに出すかの設定
        'file': {  # どこに出すかの設定に名前をつける `file`という名前をつけている
            'level': 'INFO',  # DEBUG以上のログを取り扱うという意味
            'class': 'logging.FileHandler',  # ログを出力するためのクラスを指定
            'filename': os.path.join(BASE_DIR, 'django.log'),  # どこに出すか
            'formatter': 'all',  # どの出力フォーマットで出すかを名前で指定
        },
        #'console': { # どこに出すかの設定をもう一つ、こちらの設定には`console`という名前
        #    'level': 'DEBUG',
        #    # こちらは標準出力に出してくれるクラスを指定
        #    'class': 'logging.StreamHandler', 
        #    'formatter': 'all'
        #},
    },
    'loggers': {  # どんなloggerがあるかを設定する
        'command': {  # commandという名前のloggerを定義
            #'handlers': ['file', 'console'],  # 先述のfile, consoleの設定で出力
            'handlers': ['file'],
            'level': 'INFO',
        },
    },
}
"""