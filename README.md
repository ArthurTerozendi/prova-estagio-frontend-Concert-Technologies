# Prova para o estagio da Concert Technologies
 Projeto feito para o prova de estágio da Concert Technologies.  

Foi utilizado o Angular CLI para gerar o projeto.  
O pseudo banco de dados usado foi o [JSON-Server](https://github.com/ArthurTerozendi/prova-estagio-frontend-Concert-Technologies/blob/main/concert-technologies/db.json)  
Foram criado 5 componentes principais, cada um deles com sua função:  
* [Home](https://github.com/ArthurTerozendi/prova-estagio-frontend-Concert-Technologies/tree/main/concert-technologies/src/app/home) Servindo como uma página de navegação, que ira conectar com os componentes dos clientes;  
* [Login](https://github.com/ArthurTerozendi/prova-estagio-frontend-Concert-Technologies/tree/main/concert-technologies/src/app/login) É a primeira página que irá aparecer para o usuário, sendo preciso efetuar o login para poder acessar as demais páginas;  
* [Clientes Empresas](https://github.com/ArthurTerozendi/prova-estagio-frontend-Concert-Technologies/tree/main/concert-technologies/src/app/clientes/clientes-empresas) É o componente que contém todo o CRUD das empresas, podendo cadastrar, editar, listar e remover. Dentro desse componente, tem um componente secundário que é o [formulário das empresas](https://github.com/ArthurTerozendi/prova-estagio-frontend-Concert-Technologies/tree/main/concert-technologies/src/app/clientes/clientes-empresas/clientes-empresas-form);
* [Clientes Pessoas](https://github.com/ArthurTerozendi/prova-estagio-frontend-Concert-Technologies/tree/main/concert-technologies/src/app/clientes/clientes-pessoas) É o componente que contém todo o CRUD das pessoas, podendo cadastrar, editar, listar e remover. Dentro desse componente, tem um componente secundário que é o [formulário das empresas](https://github.com/ArthurTerozendi/prova-estagio-frontend-Concert-Technologies/tree/main/concert-technologies/src/app/clientes/clientes-empresas/clientes-pessoas-form);
