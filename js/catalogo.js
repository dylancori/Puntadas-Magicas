fetch('data/productos.json')
.then(r => r.json())
.then(productos => {

    const cont = document.getElementById('productos');
    const buscador = document.getElementById('buscador');
    const ordenar = document.getElementById('ordenar');
    let categoriaSeleccionada = '';

    function render(lista){

        cont.innerHTML = '';

        lista.forEach(p => {

            cont.innerHTML += `
            <div class="card" onclick="abrirProducto(${p.id})">
                <img class="producto-img" src="${p.imagenes[0]}" alt="${p.nombre}">
                ${p.nuevo ? '<span class="badge nuevo">🆕 Nuevo</span>' : ''}
                ${p.destacado ? '<span class="badge destacado">⭐ Destacado</span>' : ''}
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
                <p>${p.material}</p>
                <p>${p.alto}</p>
                <p class="precio">${p.precio || 'Consultar precio'}</p>
                <a
                class="btn-comprar"
                target="_blank"
                href="https://wa.me/541123461400?text=Hola! Me interesa el producto ${encodeURIComponent(p.nombre)}.">

                Comprar por WhatsApp

                </a>

            </div>`;
        });

        window.productosGlobal = productos;
    }

    function aplicarFiltros(){

        let lista = [...productos];

        const texto = buscador.value.toLowerCase();

        lista = lista.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        );
        if(categoriaSeleccionada){

   lista = lista.filter(
        p => 
        p.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
    );

                                }

        switch(ordenar.value){

            case 'precio-asc':

                lista.sort((a,b)=>
                    Number(a.precio.replace(/[^\d]/g,'')) -
                    Number(b.precio.replace(/[^\d]/g,''))
                );

                break;

            case 'precio-desc':

                lista.sort((a,b)=>
                    Number(b.precio.replace(/[^\d]/g,'')) -
                    Number(a.precio.replace(/[^\d]/g,''))
                );

                break;

            case 'nombre-asc':

                lista.sort((a,b)=>
                    a.nombre.localeCompare(b.nombre)
                );

                break;

            case 'nombre-desc':

                lista.sort((a,b)=>
                    b.nombre.localeCompare(a.nombre)
                );

                break;
        }

        render(lista);
    }

    render(productos);

    buscador.addEventListener('input', aplicarFiltros);

    ordenar.addEventListener('change', aplicarFiltros);
    window.filtrarCategoria = function(categoria){

    window.filtrarCategoria = function(categoria){

    categoriaSeleccionada = categoria;

    window.scrollTo({
        top: document.getElementById('catalogo').offsetTop - 100,
        behavior: 'smooth'
    });

    aplicarFiltros();

};

};

});
function abrirProducto(id){

    const producto =
        window.productosGlobal.find(p => p.id === id);

    const modal =
        document.getElementById('modalProducto');

    const imagen =
        document.getElementById('modalImagen');

    const info =
        document.getElementById('modalInfo');

    const miniaturas =
        document.querySelector('.galeria-miniaturas');

    imagen.src = producto.imagenes[0];

    miniaturas.innerHTML = '';

    producto.imagenes.forEach(img => {

        miniaturas.innerHTML += `
        <img
        src="${img}"
        onclick="document.getElementById('modalImagen').src='${img}'">
        `;
    });

    info.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <p>${producto.material || ''}</p>
        <p>${producto.precio}</p>

        <a
        class="btn-comprar"
        target="_blank"
        href="https://wa.me/541123461400?text=Hola! Me interesa el producto ${encodeURIComponent(producto.nombre)}">

        Comprar por WhatsApp

        </a>
    `;

    modal.classList.add('activo');
}

document
.querySelector('.cerrar-modal')
.addEventListener('click',()=>{

    document
    .getElementById('modalProducto')
    .classList
    .remove('activo');

});

const modalImagen =
    document.getElementById('modalImagen');

const zoomOverlay =
    document.getElementById('zoomOverlay');

const zoomImagen =
    document.getElementById('zoomImagen');

modalImagen.addEventListener('click',()=>{

    zoomImagen.src = modalImagen.src;

    zoomOverlay.classList.add('activo');

});

zoomOverlay.addEventListener('click',()=>{

    zoomOverlay.classList.remove('activo');

});