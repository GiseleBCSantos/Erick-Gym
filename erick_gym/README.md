Endpoints API:


METHOD      PATH                            BODY                DATA            STATUS          DESCRICAO   
-----------------------------------------------------------------------------------------------------------
GET         exercicios/api                  -----               [Exercicios]    200 (OK)        Listar-exercícios
POST        exercicios/api                  Dados-Exercicio     Exercicio       201 (CREATED)   Criar-novo-exercício
PUT         exercicios/api/modificar/id     Dados-Exercicio     Exercicio       201             Modificar-exercicio
DELETE      exercicios/api/deletar/id       -----               ---------       > 200;< 300     Deletar-exercicio