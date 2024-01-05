const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info"><img src="${user.avatarUrl}" alt="Foto de perfil do usuário" />
         <div class="data">
             <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
             <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
             <p>👥 Seguidores: ${user.followers}</p>
             <p>👥 Seguindo: ${user.following}</p>
         </div>
         </div>`

        // Render repositories
        let repositoriesItems = "";
        user.repositories.forEach(repo => repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <div class="repositories-details">
                <p>🍴${repo.forks}</p>
                <p>⭐${repo.stargazers_count}</p>
                <p>👀${repo.watchers}</p>
                <p>👩‍💻${repo.language ?? ''}</p>
        </div>
    </li>`);

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
            <h2>Repositórios</h2>
            <ul>${repositoriesItems}</ul>
            </div>`
        }

        // Render events
        let eventsItems = "";
        user.events.forEach(item => {
            if (item.type === "CreateEvent") {
                eventsItems += `<div class="event">
                <h3>${item.repo.name}</h3>
                <p>Evento Criado</p>
            </div>`;
            } else {
                eventsItems += `<div class="event">
                <h3>${item.repo.name}</h3>
                <p> ${item.payload.commits[0].message}</p>
            </div>`;
            }
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
        <h2>Eventos</h2>
        ${eventsItems}
        </div>`;
        }

    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado.</h3>"
    }
}

export { screen }