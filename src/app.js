const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body
  const rep = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(rep)
  return response.json(rep)
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body
  const repIndex = repositories.findIndex((element) => element.id == request.params.id)
  if(repIndex < 0){
    return response.status(400).json({msg: "rep not found"})
  }
  const rep = repositories[repIndex]
  rep.title = title
  rep.url = url
  rep.techs = techs
  return response.json(rep)
});

app.delete("/repositories/:id", (request, response) => {
  const repIndex = repositories.findIndex((element) => element.id == request.params.id)
  if(repIndex < 0){
    return response.status(400).json({msg: "rep not found"})
  }
  repositories.splice(repIndex, 1)
  return response.status(204).json({done: "done"})
});

app.post("/repositories/:id/like", (request, response) => {
  const repIndex = repositories.findIndex((element) => element.id == request.params.id)
  if(repIndex < 0){
    return response.status(400).json({msg: "rep not found"})
  }
  const rep = repositories[repIndex]
  rep.likes += 1
  return response.json(rep)
});

module.exports = app;
