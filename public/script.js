let idEditando = null;

// 🔥 USA SOLO ESTA API
const API_URL = 'https://api-helicopteros-1.onrender.com/helicopteros';

// 🚁 Cargar helicópteros
async function cargarHelicopteros() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const tabla = document.getElementById('tabla-helicopteros');
    tabla.innerHTML = '';

    data.forEach(h => {
      tabla.innerHTML += `
        <tr>
          <td>${h.id}</td>
          <td>${h.marca || ''}</td>
          <td>${h.modelo || ''}</td>
          <td>${h.anio || ''}</td>
          <td>${h.precio || ''}</td>
          <td>${h.disponible ? '✅' : '❌'}</td>
          <td>
            <button onclick="eliminarHelicoptero(${h.id})">🗑️</button>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error cargando:", error);
  }
}

// 🚁 Agregar
async function agregarHelicoptero() {
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const anio = parseInt(document.getElementById('anio').value);
  const precio = parseFloat(document.getElementById('precio').value);
  const disponible = document.getElementById('disponible').checked;

  if (!marca || !modelo || !anio || !precio) {
    alert('Llena todos los campos');
    return;
  }

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ marca, modelo, anio, precio, disponible })
    });

    limpiarFormulario();
    cargarHelicopteros();

  } catch (error) {
    console.error("Error al agregar:", error);
  }
}

// 🚁 Eliminar
async function eliminarHelicoptero(id) {
  if (!confirm('¿Eliminar helicóptero?')) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    cargarHelicopteros();

  } catch (error) {
    console.error("Error al eliminar:", error);
  }
}

// 🚁 Limpiar
function limpiarFormulario() {
  document.getElementById('marca').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('anio').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('disponible').checked = true;
}

// 🚀 CARGA AUTOMÁTICA
window.onload = cargarHelicopteros;
