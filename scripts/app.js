//
let productos = {};

const productosEnLS = localStorage.getItem("productos");
let productosCarritoLista;

try {
    productosCarritoLista = productosEnLS ? JSON.parse(productosEnLS) : [];
} catch (error) {
    console.error("Error al parsear JSON desde localStorage:", error);
    productosCarritoLista = [];
}

// Contantes

const IVA = 0.21

localStorage.setItem("Status", "OK")
console.log("Status OK!")

document.addEventListener('DOMContentLoaded', cargarCarrito)
console.log("Carrito iniciado")

document.addEventListener('DOMContentLoaded', cargarProductos)
console.log("Carrito iniciado")

function cargarCarrito() {
    if (localStorage.getItem("carrito") == []) {
        localStorage.removeItem("carrito")
    } else { }
}

function cargarProductos() {
    if (localStorage.getItem("productos")) {
        productosCarrito = localStorage.getItem("productos")
    } else {
        localStorage.setItem("productos", [])
    }
}
let contadorProductosCarrito = 1;
// Cargar los productos en el carrito
const agregarProductoPagina = (
    nombreProducto,
    precioProducto
  ) => {
    const productosColumna = document.getElementById("columna");

  
    if (!productosColumna) {
      console.error("Error: No se encontraron los contenedores de productos.");
      return;
    }
  
    // Crear un contenedor para el nuevo producto
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("card-cart");
  
    // Contenido del producto con valores dinámicos
    productoDiv.innerHTML = `
                  <div class="card-body">
                    <h5 class="card-title">${nombreProducto}</h5>
                    <p class="card-text">$ ${precioProducto}</p>
                    <p>Stock: <span id="stock-${nombreProducto}"
                        class="bold">10</span></p>
                    <button class="boton-agregar"
                      onclick="agregarAlCarrito('${nombreProducto}')">+</button>
                  </div>
      `;
  
    productosColumna.appendChild(productoDiv);
  
}


function agregarAlCarrito(productoKey) {
    const producto = productos[productoKey]
    console.log(producto)

    if (producto.stock <= 0) {
        alert('Sin stock')
        return
    }

    // obtener la info del carrito del LS
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
    console.log(`Carrito cargado!`)

    // agregar nuevo producto
    carrito.push({
        nombre: producto.nombre,
        precio: producto.precio,
        productoKey: productoKey
    })
    console.log(`Producto agregado`)

    // reducir stock
    producto.stock--
    document.getElementById(`stock-${productoKey}`).textContent = producto.stock
    console.log(`Stock Actualizado`)

    // Guardar en LS
    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(`Carrito actualizado!`)

    // actualizar la vista del carrito
    let precioCarrito = producto.precio
    let descuentoCarrito = precioCarrito * 0 // Por ahora todo con 0 descuento
    let ivaCarrito = (precioCarrito - descuentoCarrito) * 0.21

    console.log(precioCarrito, descuentoCarrito, ivaCarrito)

    renderizarCarrito(precioCarrito, descuentoCarrito, ivaCarrito)
}

function renderizarCarrito(subtotal, descuento, iva) {
    // Viejos valores
    let oldsubtotal = parseFloat(document.getElementById("subtotal-carrito").textContent)
    let olddescuento = parseFloat(document.getElementById("descuento-carrito").textContent)
    let oldiva = parseFloat(document.getElementById("iva-carrito").textContent)

    // To fixed
    console.log(`Subtotal: ${subtotal}`)
    subtotal = parseFloat(subtotal)
    descuento = parseFloat(descuento)
    iva = parseFloat(iva)

    console.log(subtotal, descuento, iva)


    // Calcular nuevos valores*
    subtotal += oldsubtotal
    descuento += olddescuento
    iva += oldiva
    console.log(subtotal, descuento, iva)


    // Renderizar carrito
    document.getElementById("subtotal-carrito").textContent = subtotal.toFixed(2)
    document.getElementById("descuento-carrito").textContent = descuento.toFixed(2)
    document.getElementById("iva-carrito").textContent = iva.toFixed(2)
    total = subtotal - descuento + iva
    document.getElementById("total-carrito").textContent = total.toFixed(2)
}

function vaciarCarrito() {

}

productosCarritoLista.forEach(element => {
    productos[element.nombre] = {
        nombre: element.nombre,
        precio: element.precio,
        stock: element.stock,
    }
    agregarProductoPagina(element.nombre,element.precio)
});


// Agregar producto al carrito
const agregarProductoAlCarrito = (
    nombreProducto,
    precioProducto,
    stockProducto
  ) => {
      // Cargar productos del carrito
      console.log("Entro a la funcion correctamente")
  
      const productosEnLS = localStorage.getItem("productos");
      let productosCarrito;
  
      try {
          const productosEnLS = localStorage.getItem("productos");
          productosCarrito = productosEnLS ? JSON.parse(productosEnLS) : [];
      } catch (error) {
          console.error("Error al parsear JSON desde localStorage:", error);
          productosCarrito = [];
      }
      console.log("Cargo los productso del carrito")
      productosCarrito.push({
          nombre: nombreProducto,
          precio: precioProducto,
          stock: stockProducto,
      });
      console.log("Agrego el nuevo producto")
      // Guardar en LS
      localStorage.setItem("productos", JSON.stringify(productosCarrito));
      console.log("Se guardo en LS")
  };
  