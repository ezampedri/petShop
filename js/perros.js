// Variables y referencias
const botones = document.querySelectorAll('.botones');
const listaCarrito = document.querySelector('.lista-carrito');
const carritoBtn = document.querySelector('#carrito');
const overlay = document.createElement('div');
const contador = document.querySelector('#contador');
const carrito = {};

// Estilo dinámico para el overlay
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
overlay.style.zIndex = '999';
overlay.style.display = 'none';
overlay.style.cursor = 'pointer';
document.body.appendChild(overlay);

// Cargar el carrito al cargar la página
cargarCarrito();
actualizarContador();

// Actualizar contador
function actualizarContador() {
  const totalCantidad = Object.values(carrito).reduce((sum, item) => sum + item.cantidad, 0);
  contador.textContent = totalCantidad;
}

// Mostrar solapa
function mostrarCarrito() {
  listaCarrito.style.transform = 'translateX(0)';
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Deshabilita el scroll
}

// Ocultar solapa
function ocultarCarrito() {
  listaCarrito.style.transform = 'translateX(100%)';
  overlay.style.display = 'none';
  document.body.style.overflow = ''; // Habilita el scroll
}

// Agregar producto al carrito
function agregarAlCarrito(event) {
  const productoDiv = event.target.closest('.producto');
  const imagen = productoDiv.querySelector('img').src;
  const nombre = productoDiv.querySelector('.nombresprod').textContent;
  const precio = parseFloat(productoDiv.querySelector('.precio').textContent.replace('$', ''));

  carrito[nombre] = carrito[nombre] || { nombre, precio, imgSrc: imagen, cantidad: 0 };
  carrito[nombre].cantidad += 1;

  actualizarCarrito();
  actualizarContador();
}

// Actualizar vista del carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  for (const producto in carrito) {
    const item = carrito[producto];
    const divProducto = document.createElement('div');
    divProducto.classList.add('producto-carrito');

    const img = document.createElement('img');
    img.src = item.imgSrc;

    const nombre = document.createElement('p');
    nombre.textContent = item.nombre;

    const precio = document.createElement('p');
    precio.textContent = `$${item.precio}`;

    const cantidad = document.createElement('p');
    cantidad.textContent = `Cantidad: ${item.cantidad}`;

    divProducto.append(img, nombre, precio, cantidad);
    listaCarrito.appendChild(divProducto);
  }

  // Guardar el carrito en sessionStorage
  sessionStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = sessionStorage.getItem('carrito');
    if (carritoGuardado) {
      // Parsear el carrito guardado
      Object.assign(carrito, JSON.parse(carritoGuardado));
      actualizarCarrito(); // Actualizar la vista del carrito
    }
  }


// Eventos
botones.forEach(button => button.addEventListener('click', agregarAlCarrito));
carritoBtn.addEventListener('click', mostrarCarrito);
overlay.addEventListener('click', ocultarCarrito);
