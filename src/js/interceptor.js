document.addEventListener('DOMContentLoaded', function () {

    const isLogged = isLoggedCurrentUser();

    modifyMenuIfUserLogged(isLogged);
    refreshAllMenu();
});

function isLoggedCurrentUser() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioLogado = usuarios.find(user => user.logged === true);
    return usuarioLogado ? usuarioLogado : false;
}

function modifyMenuIfUserLogged(usuarioLogado) {
    if (usuarioLogado) {
        const userName = getFirstUserName(usuarioLogado.nome);
        document.getElementById('welcome-message-user').textContent = `Olá ${userName}!`;
        document.getElementById('desktop-login-icon').textContent = `logout`;
        document.getElementById('tablet-login-icon').textContent = `logout`;
        document.getElementById('mobile-login-icon').textContent = `logout`;

        document.getElementById('last-item-menu').textContent = `Sair`;
    } else {
        const sidebarItem = document.getElementById('sidebar-item-logged');
        const sidebarTabletItem = document.getElementById('sidebar-tab-item-logged');
        const sidebarMobileItem = document.getElementById('sidebar-mob-item-logged');
        sidebarItem.style.display = 'none';
        sidebarTabletItem.style.display = 'none';
        sidebarMobileItem.style.display = 'none';

        var elements = document.getElementsByClassName("bottom-menu-item");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = 20 + "%";
        }
    }
}

function refreshAllMenu() {
    document.getElementById('logout-desktop').addEventListener('click', function () {
        unlogUser();
    });

    document.getElementById('logout-tablet').addEventListener('click', function () {
        unlogUser();
    });

    document.getElementById('logout-mobile').addEventListener('click', function () {
        unlogUser();
    });
}

function getFirstUserName(fullName) {
    const nameParts = fullName.split(' ');
    return nameParts[0];
}

function unlogUser() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.forEach(user => {
        if (user.logged) {
            user.logged = false;
        }
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    window.location.href = 'login.html';
}
