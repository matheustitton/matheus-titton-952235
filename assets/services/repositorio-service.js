export class RepositorioService {

    constructor() {
        this.urlBase = "https://api.github.com";
        this.token = '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';
    }

    async getAll() {
        const resposta = await fetch(`${this.urlBase}/users/matheustitton/repos`, {
            headers: {
                Authorization: `token ${this.token}`
            }
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível buscar os repositórios deste usuário');
        }

        return resposta.json();
    }

    async getUser(idUsuario) {
        const resposta = await fetch(`${this.urlBase}/users/matheustitton`, {
            headers: {
                Authorization: `token ${this.token}`
            }
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível buscar as informações deste usuário');
        }

        return resposta.json();
    }
    
}
