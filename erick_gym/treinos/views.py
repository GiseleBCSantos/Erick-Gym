from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Exercicio
from .serializers import ExercicioSerializer
from rest_framework import status
from django.http import Http404


# Create your views here.
class ListaExercicioView(APIView):
    def get(self, request, pk):
        exercicio = Exercicio.objects.get(pk=pk)
        serializer = ExercicioSerializer(exercicio)
        return Response(serializer.data, status=200)

class ListaExerciciosView(APIView):

    def get(self, request):
        exercicios = Exercicio.objects.all()
        serializer = ExercicioSerializer(exercicios, many=True)
        return Response(serializer.data, status=200)
    
    def get_one_object(self, request, pk):
        exercicio = Exercicio.objects.get(pk=pk)
        serializer = ExercicioSerializer(exercicio)
        return Response(serializer.data, status=200)
    

    def post(self, request):
        serializer = ExercicioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
        

    def get_object(self, pk):
        try:
            return Exercicio.objects.get(pk=pk)
        except Exercicio.DoesNotExist:
            raise Http404
    
    
    def put(self, request, pk):
        alvo = self.get_object(pk)
        serializer = ExercicioSerializer(alvo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request, pk):
        alvo = self.get_object(pk)
        alvo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)