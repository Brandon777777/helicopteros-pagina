const productos = [
  { id: 1, nombre: "Bell 429", precio: 7200000, imagen: "img/bell429.jpg" },
  { id: 2, nombre: "Airbus H130", precio: 5900000, imagen: "img/airbusH130.jpg" },
  { id: 3, nombre: "Sikorsky S-76", precio: 8700000, imagen: "img/sikorskyS76.jpg" },
  { id: 4, nombre: "Robinson R66", precio: 920000, imagen: "img/robinsonR66.jpg" },
  { id: 5, nombre: "Leonardo AW139", precio: 9500000, imagen: "img/leonardoAW139.jpg" },
  { id: 6, nombre: "Black Hawk", precio: 50000000, imagen: "img/blackhawk.jpg" },
  { id: 7, nombre: "Mil-Mi 24", precio: 45000000, imagen: "img/milmi.jpg" },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Mostrar lista de productos
if (document.getElementById('lista-productos')) {
  const contenedor = document.getElementById('lista-productos');
  productos.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toLocaleString()}</p>
      <button onclick="agregarCarrito(${p.id})">Añadir</button>
      <button onclick="agregarFavorito(${p.id})">Favoritos</button>
    `;
    contenedor.appendChild(div);
  });
}

// Mostrar carrito
if (document.getElementById('carrito')) {
  const contenedor = document.getElementById('carrito');
  mostrarCarrito(contenedor);
}

// Mostrar favoritos
if (document.getElementById('favoritos')) {
  const contenedor = document.getElementById('favoritos');
  mostrarFavoritos(contenedor);
}

function agregarCarrito(id) {
  const prod = productos.find(p => p.id === id);
  carrito.push(prod);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`🚁 ${prod.nombre} agregado al carrito`);
}

function agregarFavorito(id) {
  const prod = productos.find(p => p.id === id);
  favoritos.push(prod);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  alert(`❤️ ${prod.nombre} agregado a favoritos`);
}

function mostrarCarrito(contenedor) {
  contenedor.innerHTML = '';
  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }
  carrito.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toLocaleString()}</p>
    `;
    contenedor.appendChild(div);
  });
}

function mostrarFavoritos(contenedor) {
  contenedor.innerHTML = '';
  if (favoritos.length === 0) {
    contenedor.innerHTML = '<p>No tienes favoritos aún.</p>';
    return;
  }
  favoritos.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toLocaleString()}</p>
    `;
    contenedor.appendChild(div);
  });
}
