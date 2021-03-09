import { useEffect, useState } from "react";
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  //useState usa interface Repository para tipagem: 
  //<Repository[]> (Repository Array)
  const [repositories, setRepositories] = useState<Repository[]>([]);

  // Acessa a api do github, recebe resposta, 
  // converte para json, e seta resposta de data,
  // na primeira vez que o componente for exibido em tela
  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, [])

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
        {
          //percorre lista de repositorio, 
          //e para cada um , retorna um repositoryItem
          repositories.map(repository => {
            return <RepositoryItem key={repository.name} repository={repository} />
          })
        }
      </ul>
    </section>
  )
}