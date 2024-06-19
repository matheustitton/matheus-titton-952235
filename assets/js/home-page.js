import { RepositorioService } from "../services/repositorio-service.js";

const repositorioService = new RepositorioService();

async function preencherPerfil() {
    try {
        const resposta = await fetch(`${repositorioService.urlBase}/users/matheustitton`);
        const usuario = await resposta.json();

        document.getElementById("profile-picture").src = usuario.avatar_url || "";
        document.getElementById("profile-bio").textContent = usuario.bio || "Nenhuma bio disponível";
        document.getElementById("profile-name").textContent = usuario.name || "Nome não disponível";
        document.getElementById("followers-count").innerHTML = `<i class="fa-solid fa-person-walking" style="color: #a22389;"></i> ${usuario.followers || 0}`;
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
                    <a href="repo.html?repo=matheustitton/${repo.name}" class="btn btn-primary">Ver repositório</a>
                </div>
                <div class="card-footer text-muted d-flex flex-column justify-content-center">
                    <div>${repo.language || "Linguagem não especificada"}</div>
                    <div class="d-flex flex-row justify-content-center">
                    <i class="fa-solid fa-person fa-lg mx-2 pt-2" style="color: #B197FC;"></i> <p>${repo.watchers_count}</p>
                    <i class="fa-solid fa-medal fa-lg mx-2 pt-2" style="color: #B197FC;"></i> <p>${repo.watchers_count}</p>
                    <i class="fa-solid fa-code-fork fa-lg mx-2 pt-2" style="color: #B197FC;"></i> <p>${repo.watchers_count}</p>
                    </div> 
                </div>
            `;
            repoCards.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao carregar os repositórios");
    }
}

function preencherConteudoESecaoPessoas() {
    const data = {
        "conteudo": [
            {
                "id": 1,
                "titulo": "From Swahili to Zulu, African techies develop AI language tools",
                "descricao": "African techies pioneer AI tools in local languages to bridge the digital divide but data scarcity, ethical concerns are challenges",
                "imagem": "https://ddc514qh7t05d.cloudfront.net/dA/0f6290ca16a4952dac171747534209b5/1000w/80q",
                "acesso": "https://www.context.news/ai/african-techies-develop-ai-language-tools-from-swahili-to-zulu"
            },
            {
                "id": 2,
                "titulo": "Can AI ever be smarter than humans?",
                "descricao": "Artificial general intelligence (AGI) - the benefits, the risks to security and jobs, and is it even possible?",
                "imagem": "https://ddc514qh7t05d.cloudfront.net/dA/c261780ce79adef5ca15420b1fed9e0e/1000w/80q",
                "acesso": "https://www.context.news/ai/opinion/addressing-ais-present-and-future-a-false-trichotomy"
            },
            {
                "id": 3,
                "titulo": "Addressing AI's present and future: a false trichotomy?",
                "descricao": "In-fighting between AI camps is distracting from immediate safeguards needed now",
                "imagem": "https://ddc514qh7t05d.cloudfront.net/dA/cfc7b447532850b73ce9cf3bfddabf62/1000w/80q",
                "acesso": "https://www.context.news/ai/opinion/addressing-ais-present-and-future-a-false-trichotomy"
            },
            {
                "id": 4,
                "titulo": "US TikTok ban: Which other countries have banned the app?",
                "descricao": "The United States could ban TikTok within a year, but it is not the first country to do so",
                "imagem": "https://ddc514qh7t05d.cloudfront.net/dA/9a3cbc8daa64ff9aa519c01c007fd530/1000w/80q",
                "acesso": "https://www.context.news/big-tech/us-tiktok-ban-which-other-countries-have-banned-the-app"
            },
            {
                "id": 5,
                "titulo": "Bitcoin environmental battles heat up in US",
                "descricao": "US investors pour billions of dollars into energy-intensive bitcoin, even as its environmental impact sparks national debate",
                "imagem": "https://ddc514qh7t05d.cloudfront.net/dA/e9834ca51f221987fe8ee67c8070e2d3/1000w/80q",
                "acesso": "https://www.context.news/digital-divides/bitcoin-environmental-battles-heat-up-in-us"
            }
        ],
        "pessoas": [
            {
                "id": 1,
                "nome": "Pedro Montandon",
                "link": "https://github.com/pedroMontandon",
                "imagem": "https://avatars.githubusercontent.com/u/115580599?v=4"
            },
            {
                "id": 2,
                "nome": "Victor Gabriel",
                "link": "https://github.com/Victorgabrielcruz",
                "imagem": "https://avatars.githubusercontent.com/u/112908892?v=4"
            },
            {
                "id": 3,
                "nome": "Rafael de Paiva",
                "link": "https://github.com/RafaelDePaiva",
                "imagem": "https://avatars.githubusercontent.com/u/64436487?v=4"
            },
            {
                "id": 4,
                "nome": "Jonathan Sena",
                "link": "https://github.com/Js3Silva",
                "imagem": "https://avatars.githubusercontent.com/u/157543782?v=4"
            },
            {
                "id": 5,
                "nome": "Pedro Ferreira",
                "link": "https://github.com/pedrodif",
                "imagem": "https://avatars.githubusercontent.com/u/83607190?v=4"
            }
        ]
    };

    // Preencher seção de conteúdo sugerido
    const contentSection = document.querySelector("#content .carousel-inner");
    const indicators = document.querySelector(".carousel-indicators");

    if (contentSection && indicators) {
        data.conteudo.forEach((item, index) => {
            // Criar item do carrossel
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            if (index === 0) {
                carouselItem.classList.add("active");
            }
            carouselItem.innerHTML = `
            <a class="text-decoration-none text-dark" href="${item.acesso}">
                <img src="${item.imagem}" class="d-block w-100" style="max-height: 30rem;" alt="Slide ${index + 1}">
            </a>
            <div class="carousel-caption d-none d-md-block">
                <a class="text-decoration-none text-dark" href="${item.acesso}">
                    <h5 class="text-dark slidertext">${item.titulo}</h5>
                </a>
                <p class="text-dark text-bg-light slidertext" style="--bs-bg-opacity: .25;">${item.descricao}</p>
            </div>
        `;
            contentSection.appendChild(carouselItem);

            // Criar indicador do carrossel
            const indicator = document.createElement("button");
            indicator.type = "button";
            indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
            indicator.setAttribute("data-bs-slide-to", index);
            if (index === 0) {
                indicator.classList.add("active");
                indicator.setAttribute("aria-current", "true");
            } else {
                indicator.setAttribute("aria-current", "false");
            }
            indicator.setAttribute("aria-label", `Slide ${index + 1}`);
            indicators.appendChild(indicator);
        });
    }


    // Preencher seção de colegas de trabalho
    const peopleSection = document.querySelector("#people ul");

    if (peopleSection) {
        data.pessoas.forEach(person => {
            const personItem = document.createElement("li");
            personItem.innerHTML = `
                <a href="${person.link}" class="text-decoration-none">
                    <p style="color:#901482;">
                        <img src="${person.imagem}" class="personas"><br>
                        ${person.nome}
                    </p>
                </a>
            `;
            peopleSection.appendChild(personItem);
        });
    } else {
        console.error("Seção de pessoas não encontrada.");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await preencherPerfil();
    await preencherRepositorios();
    preencherConteudoESecaoPessoas();
});

