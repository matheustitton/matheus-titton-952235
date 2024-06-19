import { RepositorioService } from "../services/repositorio-service.js";

const repositorioService = new RepositorioService();

async function preencherDetalhesRepositorio() {
    const urlParams = new URLSearchParams(window.location.search);
    const repoName = urlParams.get('repo');

    if (!repoName) {
        alert("Nome do repositório não fornecido");
        return;
    }

    try {
        const resposta = await fetch(`${repositorioService.urlBase}/repos/${repoName}`);
        if (!resposta.ok) {
            throw new Error('Erro ao buscar os detalhes do repositório');
        }
        const repo = await resposta.json();

        document.getElementById("repo-image").src = repo.owner.avatar_url || "https://www.insper.edu.br/wp-content/uploads/2023/04/Linguagen-de-programacao-2-shutterstock_1680857539.jpg.jpeg";
        document.getElementById("repo-name").textContent = repo.name || "Nome não disponível";
        document.getElementById("repo-description").textContent = repo.description || "Sem descrição disponível";
        document.getElementById("repo-created-at").textContent = new Date(repo.created_at).toLocaleDateString() || "Data não disponível";
        document.getElementById("repo-language").textContent = repo.language || "Linguagem não especificada";
        document.getElementById("repo-url").href = repo.html_url || "#";
        document.getElementById("repo-url").textContent = repo.html_url || "Link não disponível";
        document.getElementById("repo-watchers").textContent = repo.watchers_count || 0;
        document.getElementById("repo-stars").textContent = repo.stargazers_count || 0;
        document.getElementById("repo-forks").textContent = repo.forks_count || 0;

        const topicsContainer = document.getElementById("repo-topics");
        topicsContainer.innerHTML = "";
        if (repo.topics && repo.topics.length > 0) {
            repo.topics.forEach(topic => {
                const topicButton = document.createElement("button");
                topicButton.type = "button";
                topicButton.classList.add("btn", "btn-outline-secondary", "mx-2");
                topicButton.textContent = topic;
                topicsContainer.appendChild(topicButton);
            });
        } else {
            topicsContainer.textContent = "Sem tópicos";
        }
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao carregar as informações do repositório");
    }
}

document.addEventListener("DOMContentLoaded", preencherDetalhesRepositorio);
