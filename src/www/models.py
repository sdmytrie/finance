from django.db import models
from django.contrib.auth.models import User


class Bank(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Tier(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE)
    account_number = models.CharField(max_length=100, blank=True, null=True)
    name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    default = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    class Status(models.TextChoices):
        PENDING = "1", "PENDING"
        COMPLETED = "2", "COMPLETED"
        ARCHIVED = "3", "ARCHIVED"

    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    frequency = models.IntegerField(default=0)
    tier = models.ForeignKey(Tier, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    status = models.CharField(
        choices=Status.choices, max_length=2, default=Status.PENDING
    )

    def __str__(self):
        return f"{self.tier} | {self.amount}"
