from django.shortcuts import render, redirect
from .forms import ContactForm
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import BadHeaderError, send_mail

""" 一覧画面"""
def index(request):
    return render(request, 'contact/index.html')
""" お問い合わせフォーム画面"""
def contact_form(request):
    return render(request, 'contact/contact_form.html')
""" 送信完了画面"""
def complete(request):
    return render(request, 'contact/complete.html')

# ------------------------------------------------------------------    
def contact_form(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            """ 追記"""
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            sender = form.cleaned_data['sender']
            myself = form.cleaned_data['myself']
            recipients = [settings.EMAIL_HOST_USER]
            if myself:
                recipients.append(sender)
            try:
                send_mail(subject, message, sender, recipients)
            except BadHeaderError:
                return HttpResponse('無効なヘッダーが見つかりました。')
            return redirect('contact:complete')
    else:
        form = ContactForm()
    return render(request, 'contact/contact_form.html', {'form': form})
# ------------------------------------------------------------------    
