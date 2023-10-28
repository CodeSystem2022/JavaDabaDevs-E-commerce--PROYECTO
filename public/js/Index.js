let celulares
let marcas
let Samnsung = []
let Xiaomi = []
let Iphone = []
let Motorola = []
let Nokia = []
let ZTE = []
let Ofertas = []
let Novedades = []
let container = document.getElementById("container")
let arrayFiltro = []
let formulario = document.getElementById("form")
let contenedorCard = document.getElementById("cartas")
var searchContainer = document.getElementById("search")
var inputSearch = document.getElementById("inputSearch")
let checkedCheckboxes = []
let search = ""
var botonNavegacion = []
let carritoCompras = document.getElementById("carritoCompras")
let valorTotal = document.querySelector(".total-pagar")
let contadorProductos = document.getElementById("contador-arrayProductos")
let allProducts = [];
let carruselInicio = document.getElementById("carruselInicio")

async function getData() {
  let datosApi;
  await fetch("./json/Daba.json")
    .then(response => response.json())
    .then(json => datosApi = json);

  marcas = datosApi.celulares;
  celulares = marcas;

  for (let i = 0; i < marcas.length; i++) {
    if (marcas[i].categoria === "Samnsung") {
      Samnsung.push(marcas[i])
    } else
      if (marcas[i].categoria === "Xiaomi") {
        Xiaomi.push(marcas[i])
      } else
        if (marcas[i].categoria === "Iphone") {
          Iphone.push(marcas[i])
        } else
          if (marcas[i].categoria === "Motorola") {
            Motorola.push(marcas[i])
          } else
            if (marcas[i].categoria === "ZTE") {
              ZTE.push(marcas[i])
            } else
              if (marcas[i].categoria === "Ofertas") {
                Ofertas.push(marcas[i])
              } else
                if (marcas[i].categoria === "Novedades") {
                  Novedades.push(marcas[i])
                } else {
                  Nokia.push(marcas[i])
                }
  }
  rutasPaginas()
  display(celulares)
}
getData()

var buttonNav = document.getElementsByClassName("nav-item")
for (var i = 0; i < buttonNav.length; i++) {
  const element = buttonNav[i];
  botonNavegacion.push(buttonNav[i].innerText)
  element.addEventListener("click", function (e) {
    imprimir(e.target.id);

  })
}

function imprimir(id) {
  switch (id) {
    case "Ofertas":
      arrayFiltro = Ofertas
      searchContainer.style.display = "flex"
      contenedorCard.style.display = "flex"
      carritoCompras.style.display = "none"
      formulario.style.display = "none"
      inputSearch.value = ""
      checkedCheckboxes = []
      display(Ofertas)
      //eventsCategories(eventosFuturos)
      break;

    case "Novedades":
      arrayFiltro = Novedades
      searchContainer.style.display = "flex"
      contenedorCard.style.display = "flex"
      carritoCompras.style.display = "none"
      formulario.style.display = "none"
      inputSearch.value = ""
      checkedCheckboxes = []
      display(Novedades)
      //eventsCategories(eventosFuturos)
      break;

    case "Producto":
      arrayFiltro = Producto
      searchContainer.style.display = "flex"
      contenedorCard.style.display = "flex"
      carritoCompras.style.display = "none"
      formulario.style.display = "none"
      inputSearch.value = ""
      checkedCheckboxes = []
      display(celulares)
      //eventsCategories(eventosPasados)
      break;

    case "Contacto":
      contenedorCard.style.display = "none"
      searchContainer.style.display = "none"
      carritoCompras.style.display = "none"
      formulario.style.display = "flex"
      formulario.innerHTML = `
      <!-- formulario de contacto en html y css -->

        <div class="container col-sm-8 col-md-9 col-lg-8 col-xl-6 h-75 my-4 p-3" id="formulario">

            <form>
                <!-- Name input -->
                <div class="form-outline mb-4">
                    <label class="form-label ms-2" for="form4Example1">Nombre
                        <span class="obligatorio">*</span>
                    </label>
                    <input type="text" name="introducir_nombre" id="form4Example1" required="obligatorio"
                        placeholder="Escribe tu nombre" class="form-control">
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                    <label class="form-label ms-2" for="form4Example2">Email
                        <span class="obligatorio">*</span>
                    </label>
                    <input type="email" name="introducir_email" id="form4Example2" required="obligatorio"
                        placeholder="Escribe tu Email" class="form-control">
                </div>

                <!-- Celular input -->
                <div class="form-outline mb-4">
                    <label class="form-label ms-2" for="form4Example2">Celular
                        <span class="obligatorio">*</span>
                    </label>
                    <input type="Celular" name="introducir_celular" id="form4Example2" required="obligatorio"
                        placeholder="+5491165656969" class="form-control">
                </div>
                <!-- Message input -->
                <div class="form-outline mb-4">
                    <label class="form-label ms-2" for="form4Example3">Mensaje
                        <span class="obligatorio">*</span>
                    </label>
                    <textarea class="form-control" id="form4Example3" required="obligatorio"
                        placeholder="Deja aquí tu comentario..." rows="4"></textarea>
                </div>

                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form4Example4" checked>
                    <label class="form-check-label" for="form4Example4">
                        Envíame una copia de este mensaje
                    </label>
                </div>

                <!-- Submit button -->
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-danger btn-block mb-3">Enviar</button>
                </div>
            </form>
            <div id="modal" class="modal">
              <div class="modal-content">
                <span class="close">&times;</span>
                <p>¡Gracias por comunicarte con nosotros en breve te estaremos contactando!</p>
              </div>
            </div>
        </div>
      `
      let form = document.querySelector("form")
      const modal = document.querySelector('#modal')
      const cerrar = document.querySelector('.close')
      form.addEventListener("submit", (event) => {
        actionForm(event)
        modal.style.display = "block"
      })

      function modalForm() {
        modal.style.display = "none";
        location.reload()
      }
      cerrar.addEventListener("click", modalForm);

      window.addEventListener("click", (event) => {
        if (event.target == modal) {
          modal.style.display = "none"
        }
      })
      break;

    case "Compras":
      contenedorCard.style.display = "none"
      searchContainer.style.display = "none"
      formulario.style.display = "none"
      carritoCompras.style.display = "flex"
      carritoCompras.innerHTML =
        `
    <section id="siete">
        <div class="carrito">
            <div class="container-cart-products hidden-cart">
            <div class="row-product" id="tarjetasProductos">
      <div class="cart-product">
        <div class="info-cart-product" id="contenedorCarrito">
                    </div>
      </div>
            </div>
            <div class="cart-total" id="totalDelCarrito">
            <h3>Total:</h3>
            <span class="total-pagar">$0</span>
            <span id="descuentoAplicado" style="display: none;">Descuento aplicado</span>
        </div>
    </div>
                    <div class="eresSocio" id="eresSocio">
                        <label class="codigoDescuento">¿Eres Socio? Ingresa tu código de descuento</label>
                        
                                <input type="number" id="codigoSocio" placeholder="000-000-0000">

                       <p class="descuentoSocio">Con el codigo de socio tendras un 15% de descuento del total en tu compra</p>
                    </div>
                </div>
        </div>
        <div class="carritoDos">
                <div class="pagar">
                    <div class="total">
                        <div id="totalDescuento">
                        </div>
                        <label for="email"></label>
                        <input type="email" name="email" placeholder="E-mail">
                        <p class="facturaCorreo">A este correo se enviara la factura y detalles de su envío.</p>
                    </div>
                    <div class="datosTDC" id="datosTDC">
                        <form class="form" id="datosCarrito">
                        <img src="#" alt="">
                        <label for="number"></label>
                        <input type="number" name="nombre" placeholder="0000-0000-0000-0000" required>
                        <label for="nombre"></label>
                        <input type="text" name="nombre" placeholder="Nombre" required>
                        <label for="date"></label>
                        <input type="text" name="date" placeholder="Fecha" required>
                        <label for="text"></label>
                        <input type="text" name="text" placeholder="CVC" required>
                        <button id="content" type="submit">Enviar</button>
                        </form>
                        <div id="Modalito" class="modal">
                            <div class="modal-content">
                                <span id="Carrito">&times;</span>
                                <p>¡Gracias por tu compra!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
    </section>
        `
      carrito()
      let formSocio = document.getElementById("datosTDC");
      formSocio.addEventListener("submit", function (event) {
        event.preventDefault();
        let modalSocio = document.getElementById("Modalito");
        modalSocio.style.display = "flex";
        let closeBtnSocio = document.getElementById("Carrito");
        closeBtnSocio.addEventListener("click", function () {
          modalSocio.style.display = "none";
          location.reload()
        });
      });
    default:
      arrayFiltro = celulares
      checkedCheckboxes = []
      contenedorCard.style.display = "flex"
      searchContainer.style.display = "flex"
      formulario.style.display = "none"
      inputSearch.value = ""
      carritoCompras.style.display = "none"
      display(celulares)
    //       document.getElementById("contador-productos").innerHTML = `
    //             <span>${allProducts.length}</span>
    //             `;
    //eventsCategories(eventos)
  }
}

function display(tarjeta) {
  var html = "";
  for (var i = 0; i < tarjeta.length; i++) {
    html +=
      `<div class="mb-4 d-flex justify-content-center item" (${tarjeta[i]._id})">
      <img src="${tarjeta[i].imagen}" class="card-img-top" alt="${tarjeta[i].nombre} image">
      <h5 class="card-title prueba text-center">${tarjeta[i].nombre}</h5>
      <div  justify-content-evenly">
        <p class="card-price d-inline mb-0"><strong>$${tarjeta[i].precio}</strong></p>
      </div>
      <button onclick="detalle(${tarjeta[i].id})" class="detalles botonCard" id="detalles" value="${tarjeta[i].id}" id="detalles">Detalles</button>
      <button class="add-cart">Agregar al Carrito</button>
      </div>
    </div>
  </div>
  `

  }
  contenedorCard.innerHTML = html
}
let body = document.getElementById("body")
let fadeout = document.getElementById("seis")
let containerDetalles = document.getElementById("containerDetalles")
let arrayProducto = []
function detalle(id) {
  fadeout.style.display = "flex"
  fadeout.style.top = window.scrollY + "px"
  fadeout.style.left = window.scrollX + "px"
  body.style.overflow = "hidden"
  arrayProducto = marcas.filter(celular => celular.id === id);
  if (arrayProducto.length > 0) {
    containerDetalles.innerHTML = ` 
        <div class="t-detalle">
          <h1>${arrayProducto[0].nombre}</h1> 
        </div> 
        <div class="detallesDos"> 
            <div class="detalle-Producto"> 
                <div class="img-product"> 
                    <img src="${arrayProducto[0].imagen}" alt=""> 
                </div>
            </div> 
            <div class="detalles-arrayProducto"> 
                <ul class="lista-detalles"> 
                    <li>DESCRIPCIÓN: ${arrayProducto[0].descripcion}</li>  
                </ul> 
                <div class="precioProducto"> 
                    <p>PRECIO $${arrayProducto[0].precio}</p> 
                </div>
            </div>      
        </div> 
 `;
  }
  fadeout.addEventListener("click", function () {
    fadeout.style.display = "none"
    body.style.overflow = "scroll"
  })
}

var time = location.search.split("?time=")
function rutasPaginas() {

  switch (time[1]) {
    case "Producto":
      imprimir("Producto")
      break;
    case "Ofertas":
      imprimir("Ofertas")
      break;
    case "Novedades":
      imprimir("Novedades")
      break;
    case "Contacto":
      imprimir("Contacto")
      break;
    case "Compras":
      imprimir("Carrito")
      break;
    default:
      imprimir("Home")

  }
}


function actionForm(event) {
  event.preventDefault()
  let formDatos = {
    Nombre: event.target[0].value,
    Email: event.target[1].value,
    Celular: event.target[2].value,
    Mensaje: event.target[3].value
  }
}

inputSearch.addEventListener("keyup", function (evento) {
  var datoInput = evento.target.value
  search = datoInput.trim().toLowerCase()
  filtrosCombinados()
})

function eventsCategories(array) {
  let categories = array.map(evento => evento.categoria)
  let unica = new Set(categories)
  let lastCategories = [...unica]
  let categoriasCelulares = ""
  lastCategories.map(categoria =>
    categoriasCelulares +=
    `
    <label><input type="checkbox" value="${categoria}"> ${categoria}</label>
    `
  )
  document.getElementById("container").innerHTML = categoriasCelulares
  checkboxListener()
}

function checkboxListener() {
  var checkboxs = document.querySelectorAll('input[type=checkbox]')
  for (i = 0; i < checkboxs.length; i++) {
    checkboxs[i].addEventListener("change", function () {
      checkedCheckboxes = []
      for (i = 0; i < checkboxs.length; i++) {
        if (checkboxs[i].checked) {
          checkedCheckboxes.push(checkboxs[i].value)
        }
      }
      filtrosCombinados()
    })
  }
}

function filtrosCombinados() {
  var filtrado = []
  if (search !== "" && checkedCheckboxes.length > 0) {
    checkedCheckboxes.map(categoria => filtrado.push(...arrayFiltro.filter(evento =>
      evento.nombre.toLowerCase().trim().includes(search) && evento.categoria === categoria)
    ))
  }
  else if (search !== "" && checkedCheckboxes.length == 0) {
    filtrado = arrayFiltro.filter(evento => evento.nombre.toLowerCase().trim().includes(search))
  }
  else if (search === "" && checkedCheckboxes.length > 0) {
    checkedCheckboxes.map(categoria =>
      filtrado.push(...arrayFiltro.filter(evento => evento.categoria === categoria))
    )
  }
  else {
    filtrado = arrayFiltro
  }
  filtrado.length > 0 ?
    display(filtrado) :
    contenedorCard.innerHTML = `
    <div class="ceroResultado">
    <h1 class="sinEventos" >No se encontraron eventos para tu busqueda...</h1>
    </div>
    `
}
let titulo // Array para almacenar los productos del carrito

contenedorCard.addEventListener("click", e => {
  if (e.target.classList.contains("add-cart")) {
    let producto = e.target.parentElement;
    let infProducto = {
      cantidad: 1,
      titulo: producto.querySelector(".prueba").textContent,
      precio: producto.querySelector(".card-price").textContent
    };

    let siExiste = allProducts.some(producto => producto.titulo === infProducto.titulo);
    if (siExiste) {
      let productoRepetido = allProducts.map(producto => {
        if (producto.titulo === infProducto.titulo) {
          producto.cantidad++;
          return producto;
        } else {
          return producto;
        }
      });
      allProducts = [...productoRepetido];
    } else {
      allProducts = [...allProducts, infProducto];
    }
  }
  // Función para sumar el total a pagar

  //   document.getElementById("contador-productos").innerHTML = `
  // <span>${allProducts.length}</span>
  //     `;
});
// Función para mostrar el carrito
function carrito() {
  let listaCarrito = "";
  for (let i = 0; i < allProducts.length; i++) {
    listaCarrito += `
      <div class="cardCarrito">
        <p class="titulo-producto-carrito">${allProducts[i].titulo}</p>
        <div class="selector-cantidad">
          <i class = "cantidad" onclick="sumarCantidad(${i})">➕</i>
          <input type="text" value="${allProducts[i].cantidad}" class="carrito-item-cantidad" disabled>
          <i class = "cantidad" onclick="restarCantidad(${i})">➖</i>
          <button class="btn-eliminar" onclick="eliminarProducto(${i})">🗑</button>
        </div>
        <span class="precio-producto-carrito">${allProducts[i].precio}</span>
      </div>
    `;
  }
  document.getElementById("contenedorCarrito").innerHTML = listaCarrito;

  let codigoSocio = document.getElementById("codigoSocio")
  let totalAPagar = document.getElementById("totalSocio")
  let valor = sumarTotal();
  codigoSocio.style.border = "3px solid red"
  totalAPagar.innerHTML = `
          Total a pagar: $${valor}
          `
  codigoSocio.addEventListener("keyup", function (e) {
    if (e.target.value.length == 10) {
      codigoSocio.style.border = "3px solid green"
      totalAPagar.innerHTML = `
          Total a pagar: $${valor * 0.85}
          `
    } else {
      codigoSocio.style.border = "3px solid red"
      totalAPagar.innerHTML = `
          Total a pagar: $${valor}
          `
    }
  })
}

function sumarCantidad(index) {
  allProducts[index].cantidad++;
  carrito();
}

function restarCantidad(index) {
  if (allProducts[index].cantidad > 1) {
    allProducts[index].cantidad--;
    carrito();
  }
}

function eliminarProducto(index) {
  allProducts.splice(index, 1);
  carrito();
}

// Función para sumar el total a pagar
function sumarTotal() {
  let totalPagar = 0;
  let totalProductos = 0;
  for (let i = 0; i < allProducts.length; i++) {
    let precio = allProducts[i].precio;
    precio = parseInt(precio.replace(/\D/g, "")); // Extraer solo los dígitos numéricos de un string
    totalPagar += allProducts[i].cantidad * precio;
    totalProductos += allProducts[i].cantidad;
  }
  document.getElementById("totalDelCarrito").innerHTML = `
  <h3>Total:</h3>
  <span class="total-pagar">$${totalPagar}</span>
`;
  let valorTotal
  valorTotal == `$${totalPagar}`;

  document.getElementById("contador-productos").innerHTML = `
  <span>${totalProductos}</span>
`;
  contadorProductos += totalProductos;

  return totalPagar
}
