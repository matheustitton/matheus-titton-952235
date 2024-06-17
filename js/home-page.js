import { RepositorioService } from "../services/repositorio-service.js";

const repositorioService = new RepositorioService();

const usuarioGithubInput = document.querySelector("#usuario-github");

const listaRepositorios = document.querySelector("#lista-repositorios");
const totalRepositorios = document.querySelector("#qtde-repositorios");
const buscarRepositoriosBtn = document.querySelector("#buscarRepositorios");

async function preencherPerfil() {
    try {
        const resposta = await fetch(`${repositorioService.urlBase}/users/matheustitton`);
        const usuario = await resposta.json();

        document.getElementById("profile-bio").textContent = usuario.bio || "Nenhuma bio disponível";
        document.getElementById("profile-name").textContent = usuario.name || "Nome não disponível";
        document.getElementById("followers-count").textContent = `${usuario.followers || 0}`;
        document.getElementById("facebook-link").href = usuario.blog || "#";
        document.getElementById("instagram-link").href = `https://www.instagram.com/${usuario.login}` || "#";
        document.getElementById("linkedin-link").href = `https://www.linkedin.com/in/${usuario.login}` || "#";
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao carregar as informações do perfil");
    }
}


async function preencherRepositorios() {
    try {
        const repositorios = await repositorioService.getAll();
        const repoCards = document.getElementById("repo-cards");

        repositorios.forEach((repo) => {
            const card = document.createElement("div");
            card.classList.add("card", "m-2", "text-center");
            card.innerHTML = `
                <div class="card-header">${repo.name}</div>
                <div class="card-body">
                    <p class="card-text">${repo.description || "Sem descrição"}</p>
                    <a href="${repo.html_url}" class="btn btn-primary">Ver repositório</a>
                </div>
                <div class="card-footer text-muted">
                    ${repo.language || "Linguagem não especificada"}
                </div>
            `;
            repoCards.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao carregar os repositórios");
    }
}

// Chamada das funções para preencher perfil e repositórios
preencherPerfil();
preencherRepositorios();
