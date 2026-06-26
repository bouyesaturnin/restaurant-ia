from django.db import models


class Reservation(models.Model):
    name = models.CharField(max_length=120)
    date = models.CharField(max_length=60)
    time = models.CharField(max_length=20)
    guests = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.date} à {self.time} ({self.guests} pers.)"


class TakeawayOrder(models.Model):
    items = models.TextField()
    pickup_time = models.CharField(max_length=60)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Commande {self.id} — récup. {self.pickup_time}"
