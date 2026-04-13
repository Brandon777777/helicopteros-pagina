let idEditando = null;
const API_URL = 'https://api-helicopteros.onrender.com';

// 🚁 Cargar lista de helicópteros
async function cargarHelicopteros() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const tabla = document.getElementById('tabla-helicopteros');
  tabla.innerHTML = '';

  data.forEach(h => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${h.id}</td>
      <td>${h.marca}</td>
      <td>${h.modelo}</td>
      <td>${h.anio}</td>
      <td>$${h.precio.toLocaleString()}</td>
      <td>${h.disponible ? 'Disponible' : 'No Disponible'}</td>
      <td>
        <button onclick="editarHelicoptero(${h.id}, '${h.marca}', '${h.modelo}', ${h.anio}, ${h.precio}, ${h.disponible})">Editar</button>

        <td><button onclick="eliminarHelicoptero(${h.id})">Eliminar</button></td>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// 🚁 Agregar nuevo helicóptero
async function agregarHelicoptero() {
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const anio = document.getElementById('anio').value;
  const precio = document.getElementById('precio').value;
  const disponible = document.getElementById('disponible').checked;

  if (!marca || !modelo || !anio || !precio) {
    alert('Por favor llena todos los campos');
    return;
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ marca, modelo, anio, precio, disponible })
  });

  limpiarFormulario();
  cargarHelicopteros();
}

// 🚁 Editar helicóptero (cargar datos en el formulario)
function editarHelicoptero(id, marca, modelo, anio, precio, disponible) {
  idEditando = id; // guardamos el id que se editará

  // cargamos los datos en los inputs
  document.getElementById('marca').value = marca;
  document.getElementById('modelo').value = modelo;
  document.getElementById('anio').value = anio;
  document.getElementById('precio').value = precio;
  document.getElementById('disponible').checked = disponible;

  // cambiamos el texto del botón principal
  const boton = document.querySelector('.formulario button');
  boton.textContent = 'Actualizar';
  boton.onclick = actualizarHelicoptero;
}

// 🚁 Actualizar helicóptero
async function actualizarHelicoptero() {
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const anio = document.getElementById('anio').value;
  const precio = document.getElementById('precio').value;
  const disponible = document.getElementById('disponible').checked;

  if (!marca || !modelo || !anio || !precio) {
    alert('Por favor completa todos los campos antes de actualizar.');
    return;
  }

  await fetch(`${API_URL}/${idEditando}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ marca, modelo, anio, precio, disponible })
  });

  idEditando = null;
  limpiarFormulario();
  cargarHelicopteros();

  // restaurar botón al modo "Agregar"
  const boton = document.querySelector('.formulario button');
  boton.textContent = 'Agregar';
  boton.onclick = agregarHelicoptero;
}

// 🚁 Eliminar helicóptero
async function eliminarHelicoptero(id) {
  if (!confirm('¿Seguro que quieres eliminar este helicóptero?')) return;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  cargarHelicopteros();
}

// 🚁 Limpiar formulario
function limpiarFormulario() {
  document.getElementById('marca').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('anio').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('disponible').checked = true;
}

window.onload = cargarHelicopteros;
