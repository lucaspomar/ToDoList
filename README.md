# ToDoList

# Sobre o projeto

Projeto fullstack para gerenciamento de tarefas, desenvolvido com Django Rest Framework no back-end e React no front-end. O sistema permite o cadastro, edição, deleção e visualização de tarefas, com funcionalidades como autenticação de usuários, paginação e filtragem.

# Tecnologias utilizadas

- Python
- Django
- Django Rest Framework
- JavaScript
- React
- Vite

# Como instalar o projeto

Clone o repositório com o comando abaixo:

```
git clone https://github.com/lucaspomar/ToDoList.git
```

Crie um arquivo de configuração de ambiente .env na raiz do projeto

````
echo "" > .env
````

Escrever no arquivo .env sua chave de API

````
DJANGO_SECRET_KEY='SUA-CHAVE-DE-API'
````

## Back-end

Navegue até a pasta backend

````
cd backend
````

Crie um ambiente virtual python e ative ele

````
python -m venv venv
venv\Scripts\activate.bat
````

Leia o arquivo requirements.txt para instalar as dependências

````
pip install -r requirements.txt
````

## Front-end

Navegue até a pasta todoApp

````
cd frontend/todoApp
````

Instale as dependências do front

````
npm install
````

# Como executar o projeto

## Back-end

Navegue até o app do backend

````
cd backend/todoApp
````

Execute o servidor django

````
python manage.py runserver
````

O servidor ficará disponível na porta 8000

````
http://localhost:8000/
````

## Front-end

Navegue até o app do frontend

````
cd frontend/todoApp
````

Execute o servidor vite

````
npm run dev
````

O servidor ficará disponível na porta 5173

````
http://localhost:5173/
````

# Documentação

A documentação da API está disponível em /schema/swagger-ui/

```
http://localhost:8000/schema/swagger-ui/
```

# Atualizações futuras

- Cadastro e edição de Tarefas pelo front
- Utilização da paginação no front
- Aplicar refresh token

# Autor

Lucas Detogni Pomar
