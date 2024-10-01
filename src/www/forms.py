from django import forms
from .models import Transaction


class TransactionForm(forms.ModelForm):
    class Meta:
        model = Transaction
        fields = ("account", "frequency", "tier", "amount", "date", "status")
        widgets = {
            "account": forms.Select(attrs={"class": "form-control"}),
            "frequency": forms.NumberInput(attrs={"class": "form-control"}),
            "tier": forms.Select(attrs={"class": "form-control"}),
            "amount": forms.NumberInput(attrs={"class": "form-control"}),
            "date": forms.SelectDateWidget(attrs={"class": "form-control"}),
            "status": forms.Select(attrs={"class": "form-control"}),
        }
