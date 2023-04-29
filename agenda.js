const formularioContacto = document.querySelector('#formularioContacto');
const nombreInput = document.querySelector('#nombre');
const telefonoInput = document.querySelector('#telefono');
const emailInput = document.querySelector('#email');
const listaContactos = document.querySelector('#contacto-lista');
const contenedorTarjetas = document.querySelector('#card-container');

class Contacto {
  constructor(nombre, telefono, email) {
    this.nombre = nombre;
    this.telefono = parseFloat(telefono) || 0;
    this.email = email;
  }
}

class Agenda {
  constructor() {
    this.contactos = JSON.parse(localStorage.getItem('contactos')) || [];
  }

  addContacto(contacto) {
    this.contactos.push(contacto);
    localStorage.setItem('contactos', JSON.stringify(this.contactos));
  }

  removeContacto(index) {
    this.contactos.splice(index, 1);
    localStorage.setItem('contactos', JSON.stringify(this.contactos));
  }
}

const agenda = new Agenda();

function renderContactos() {
  listaContactos.innerHTML = '';
  agenda.contactos.forEach((contacto, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contacto.nombre}</td>
      <td>${contacto.telefono}</td>
      <td>${contacto.email}</td>
      <td>
        <button type="button" onclick="eliminarContacto(${index})">Eliminar</button>
      </td>
    `;
    listaContactos.appendChild(row);
  });
}

function renderContactoCard(contacto) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h3>${contacto.nombre}</h3>
    <p>${contacto.telefono}</p>
    <p>${contacto.email}</p>
  `;
  contenedorTarjetas.appendChild(card);
}

function eliminarContacto(index) {
  agenda.removeContacto(index);
  renderContactos();
  renderContactoCards();
}

formularioContacto.addEventListener('submit', (event) => {
  event.preventDefault();
  const nombre = nombreInput.value;
  const telefono = telefonoInput.value;
  const email = emailInput.value;
  const contacto = new Contacto(nombre, telefono, email);
  agenda.addContacto(contacto);
  renderContactos();
  renderContactoCard(contacto);
  formularioContacto.reset();
});

renderContactos();
agenda.contactos.forEach((contacto) => renderContactoCard(contacto));


