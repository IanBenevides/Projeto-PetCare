
var formSignin = document.querySelector('#signin');
var formSignup = document.querySelector('#signup');
var btnColor = document.querySelector('.btnColor');

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelCadNome')
let validNome = false

let email = document.querySelector('#email')
let labelCadEmail = document.querySelector('#labelCadEmail')
let validEmail = false

let senha = document.querySelector('#cadSenha')
let labelCadSenha = document.querySelector('#labelCadSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

// muda para login
document.querySelector('#btnSignin').addEventListener('click', () => {
    formSignin.style.left = "25px";
    formSignup.style.left = "450px";
    btnColor.style.left = "0px";
});

// muda para cadastro
document.querySelector('#btnSignup').addEventListener('click', () => {
    formSignin.style.left = "-450px";
    formSignup.style.left = "25px";
    btnColor.style.left = "110px";
});

// Validações do preenchimento do cadastro

lblErro.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres*'
        validNome = false
    } else {
        labelNome.setAttribute('style', 'color: black')
        labelNome.innerHTML = 'Nome'
        validNome = true
    }
})

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres*'
        validNome = false
    } else {
        labelNome.setAttribute('style', 'color: black')
        labelNome.innerHTML = 'Nome'
        validNome = true
    }
})

email.addEventListener('keyup', () => {
    if (email.value.length <= 7) {
        labelCadEmail.setAttribute('style', 'color: red')
        labelCadEmail.innerHTML = 'Email *Insira um email válido*'
        validEmail = false
    } else {
        labelCadEmail.setAttribute('style', 'color: black')
        labelCadEmail.innerHTML = 'Email'
        validEmail = true
    }
})


senha.addEventListener('keyup', () => {
    if (senha.value.length <= 7) {
        labelCadSenha.setAttribute('style', 'color: red')
        labelCadSenha.innerHTML = 'Senha *A senha deve conter no mínimo 8 caracteres*'
        validSenha = false
    } else {
        labelCadSenha.setAttribute('style', 'color: black')
        labelCadSenha.innerHTML = 'Senha'
        validSenha = true
    }
})

confirmSenha.addEventListener('keyup', () => {
    if (senha.value != confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red')
        labelConfirmSenha.innerHTML = 'Confirme sua senha *As senhas não conferem*'
        validConfirmSenha = false
    } else {
        labelConfirmSenha.setAttribute('style', 'color: black')
        labelConfirmSenha.innerHTML = 'Confime sua senha'
        validConfirmSenha = true
    }
})

function navegar() {
    window.location.href = '../../index.html';
}

function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('cadSenha').value;
    const confirmSenha = document.getElementById('confirmSenha').value;

    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmSenha.trim()) {
        alert('Preencha todos os dados!');
        return;
    }

    if (senha !== confirmSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha,
        logged: false
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
}


function entrar() {
    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(user => user.email === emailLogin && user.senha === senhaLogin);

    if (usuario) {
        usuario.logged = true;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        window.location.href = '../../index.html';
    } else {
        alert('Email ou senha incorretos!');
    }
}

