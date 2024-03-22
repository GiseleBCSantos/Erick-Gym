from rest_framework.serializers import ModelSerializer
from .models import Exercicio


class ExercicioSerializer(ModelSerializer):
    class Meta:
        model = Exercicio
        fields = ['nome', 'descricao', 'em_equipamento', 'idade_minima']