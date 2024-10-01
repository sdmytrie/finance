from django.contrib import admin
from www.models import Account, Bank, Tier, Transaction

admin.site.register(Bank)
admin.site.register(Account)
admin.site.register(Tier)


class TransactionAdmin(admin.ModelAdmin):
    list_display = ["tier", "amount", "date", "status"]
    list_filter = ["tier", "status"]


admin.site.register(Transaction, TransactionAdmin)
