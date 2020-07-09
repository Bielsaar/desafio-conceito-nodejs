const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//Lista os repositórios
app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

//Cria os repositórios
app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const likes = 0;
  const repository = { id: uuid(), title, url, techs, likes}

  repositories.push(repository);

  return response.json(repository);
});

//Atualiza os repositórios
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found. "})
  }

  const likes = repositories[repositoryIndex].likes;
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository)
});

//Deleta os repositórios
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found. "})
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

//Adiciona um "like" no repositório
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes} = request.query;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found. "})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes ,
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository)
});

module.exports = app;
