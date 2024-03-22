from django.db import models

# Create your models here.

class Exercicio(models.Model):
    nome = models.CharField(max_length=250)
    descricao = models.CharField(max_length=500)
    em_equipamento = models.BooleanField(default=True)
    idade_minima = models.PositiveIntegerField(default=12)