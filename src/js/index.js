var alerta = document.querySelector("#alerta");
var btnCadastro = document.querySelector("#btn-cadastrar");
var pet = document.querySelector("#pet");
var email = document.querySelector("#email");

btnCadastro.addEventListener("click", (e) => {
  e.preventDefault();

  if (email.value === "" || pet.value === "seu pet") {
    alerta.innerHTML = "Email ou Pet não informado";
  } else if (!validaEmail(email.value)) {
    alerta.innerHTML = "Informe um email válido";
  } else {
    emailUsuario = email.value;
    petUsuario = pet.value;

    let usuarios = new Array();

    if (localStorage.hasOwnProperty("usuarios")) {
      usuarios = JSON.parse(localStorage.getItem("usuarios"));
    }

    usuarios.push({ emailUsuario, petUsuario });

    limpar();

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
});

function validaEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function limpar() {
  email.value = "";
  alerta.innerHTML = "";
  pet.innerHTML = `
     <select 
                  id="pet"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option value="seu pet" selected="">Seu pet</option>
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="aves">Aves</option>
                  <option value="repteis">Répteis</option>
                </select>
  `;
}
