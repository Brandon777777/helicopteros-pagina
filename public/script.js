let idEditando = null;

// 🔥 API CORRECTA
const API_URL = 'https://api-helicopteros-1.onrender.com/helicopteros';

// 🚁 Cargar helicópteros
async function cargarHelicopteros() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const tabla = document.getElementById('tabla-helicopteros');
    tabla.innerHTML = '';

    data.forEach(h => {
      const fila = document.createElement('tr');

      fila.innerHTML = `
        <td>${h.id}</td>
        <td>${h.marca || ''}</td>
        <td>${h.modelo || ''}</td>
        <td>${h.anio || ''}</td>
        <td>$${h.precio ? Number(h.precio).toLocaleString() : ''}</td>
        <td>${h.disponible ? '✅' : '❌'}</td>
        <td>
          <button onclick="editarHelicoptero(${h.id}, '${h.marca}', '${h.modelo}', ${h.anio}, ${h.precio}, ${h.disponible})">✏️</button>
          <button onclick="eliminarHelicoptero(${h.id})">🗑️</button>
        </td>
      `;

      tabla.appendChild(fila);
    });

  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}

// 🚁 Agregar
async function agregarHelicoptero() {
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const anio = document.getElementById('anio').value;
  const precio = document.getElementById('precio').value;
  const disponible = document.getElementById('disponible').checked;

  if (!marca || !modelo || !anio || !precio) {
    alert('Llena todos los campos');
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

// 🚁 Editar
function editarHelicoptero(id, marca, modelo, anio, precio, disponible) {
  idEditando = id;

  document.getElementById('marca').value = marca;
  document.getElementById('modelo').value = modelo;
  document.getElementById('anio').value = anio;
  document.getElementById('precio').value = precio;
  document.getElementById('disponible').checked = disponible;

  const boton = document.querySelector('.formulario button');
  boton.textContent = 'Actualizar';
  boton.onclick = actualizarHelicoptero;
}

// 🚁 Actualizar
async function actualizarHelicoptero() {
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const anio = document.getElementById('anio').value;
  const precio = document.getElementById('precio').value;
  const disponible = document.getElementById('disponible').checked;

  await fetch(`${API_URL}/${idEditando}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ marca, modelo, anio, precio, disponible })
  });

  idEditando = null;
  limpiarFormulario();
  cargarHelicopteros();

  const boton = document.querySelector('.formulario button');
  boton.textContent = 'Agregar';
  boton.onclick = agregarHelicoptero;
}

// 🚁 Eliminar
async function eliminarHelicoptero(id) {
  if (!confirm('¿Eliminar helicóptero?')) return;

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

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

// 🔥 CARGA AUTOMÁTICA
window.onload = cargarHelicopteros;
