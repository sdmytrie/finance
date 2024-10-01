from pprint import pprint

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from www.forms import TransactionForm
from www.models import Account, Transaction


@login_required(login_url="/admin/login/")
def index(request, account_id=0):
    accounts = Account.objects.filter(user=request.user)
    try:
        if account_id > 0:
            current_account = Account.objects.get(
                user=request.user, id=account_id
            )
        else:
            current_account = Account.objects.get(
                user=request.user, default=True
            )
    except Account.DoesNotExist:
        current_account = accounts.first()

    context = {
        "form": TransactionForm(),
        "accounts": accounts,
        "current_account": current_account,
    }
    return render(request, "www/index.html", context)
