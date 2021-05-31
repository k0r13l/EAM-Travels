/* funciones de index.html */

function ampliar(imgId) {
    var modal = document.getElementById("myModal");

    var img = document.getElementById(imgId.id);
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgId.src;
    captionText.innerHTML = imgId.alt;

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    };
}

function cargarAsideDerecho(obj) {
    var r;
    var result;
    var info = [];
    fetch('data/ffFile.json')
            .then(response => response.json())
            .then(data => {
                r = JSON.stringify(data);
                result = JSON.parse(r);
                var divDe = document.getElementById("divDe");

                if (divDe.hasChildNodes()) {
                    divDe.innerHTML = '';
                }

                var imgs = [];
                var hallado = 0;

                for (var i = 0; i < result['flora'].length; i++) {
                    if (result['flora'][i]['nombre'] === obj.innerHTML) {
                        imgs = result['flora'][i]['img'];
                        info['description'] = result['flora'][i]['description'];
                        hallado = 1;
                        break;
                    }
                }

                if (hallado !== 1) {
                    for (var i = 0; i < result['fauna'].length; i++) {
                        if (result['fauna'][i]['nombre'] === obj.innerHTML) {
                            imgs = result['fauna'][i]['img'];
                            info['description'] = result['fauna'][i]['description'];
                            break;
                        }
                    }
                }

                var ulContenedor = document.createElement("ul");
                ulContenedor.setAttribute("id", "ulContenedorDerecho");
                
                info['rutaImagen'] = imgs[0]['rutaImagen'];

                for (var i = 0; i < imgs.length; i++) {
                    var image = document.createElement("img");
                    image.setAttribute("src", imgs[i]['rutaImagen']);
                    image.setAttribute("id", "img" + i);
                    image.setAttribute("onclick", "ampliar(this)");
                    image.setAttribute("alt", imgs[i]['alt']);
                    image.setAttribute("style", "width:100%;max-width:100px;bottom:1px");
                    ulContenedor.appendChild(image);
                    ulContenedor.appendChild(document.createElement("br"));
                }

                var titulo = document.createElement("h5");
                titulo.innerHTML = "Info adicional";

                var divDerecho = document.createElement("div");
                divDerecho.setAttribute("id", "rMenu");
                divDerecho.setAttribute("class", "center col-lg-3")

                divDerecho.appendChild(titulo);
                divDerecho.appendChild(ulContenedor);

                divDe.appendChild(divDerecho);
                try {
                    document.body.replaceChild(divDe, document.getElementById("divDe"));
                } catch (e) {
                    console.log("Cambió el aside derecho");
                }

                cargarCuerpoCentro(info);
            });
}

function cargarCuerpoCentro(obj) {
    var divDinamico = document.getElementById("divDinamico");

    if (divDinamico.hasChildNodes()) {
        divDinamico.innerHTML = '';
    }

    var imagen = document.createElement("img");
    var parr = document.createElement("p");
    parr.setAttribute("id", "parrCuerpo");

    imagen.setAttribute("src", obj['rutaImagen']);
    imagen.setAttribute("id", "imgContenido");
    imagen.setAttribute("style", "width:100%;max-width:100px;bottom:1px");

    parr.innerHTML = obj['description'];

    divDinamico.appendChild(imagen);
    divDinamico.appendChild(parr);
    try {
        document.body.replaceChild(divDinamico, document.getElementById("divDinamico"));
    } catch (e) {
        console.log("Cambió el div central con el cuerpo");
    }
}


function cargarBody() {
    var r;
    var result;
    fetch('data/ffFile.json')
            .then(response => response.json())
            .then(data => {
                r = JSON.stringify(data);
                result = JSON.parse(r);

                var divIz = document.getElementById("divIz");
                if (divIz.hasChildNodes()) {
                    divIz.innerHTML = '';
                }

                var divIzquierdo = document.createElement("div");
                divIzquierdo.setAttribute("id", "lMenu");
                divIzquierdo.setAttribute("class", "col-lg-2");
                divIzquierdo.setAttribute("align", "left");

                var titulo = document.createElement("h5");

                titulo.innerHTML = 'Flora y Fauna';
                divIzquierdo.appendChild(titulo);
                var ulContenedor = document.createElement("ul");

                for (var i = 0; i < result['flora'].length; i++) {
                    var li1 = document.createElement("li");
                    var aLink = document.createElement("a");
                    aLink.setAttribute("onclick", "cargarAsideDerecho(this)");
                    aLink.setAttribute("value", result['flora'][i]['nombre']);
                    aLink.innerHTML = result['flora'][i]['nombre'];
                    li1.appendChild(aLink);
                    ulContenedor.appendChild(li1);
                }

                for (var i = 0; i < result['fauna'].length; i++) {
                    var li1 = document.createElement("li");
                    var aLink = document.createElement("a");
                    aLink.setAttribute("onclick", "cargarAsideDerecho(this)");
                    aLink.setAttribute("value", result['fauna'][i]['nombre']);
                    aLink.innerHTML = result['fauna'][i]['nombre'];
                    li1.appendChild(aLink);
                    ulContenedor.appendChild(li1);
                }
                divIzquierdo.appendChild(ulContenedor);
                divIz.appendChild(divIzquierdo);
                try {
                    document.body.replaceChild(divIz, document.getElementById("divIz"));
                } catch (e) {
                    console.log("Cambió el aside izquierdo");
                }
            });
}


/* funciones de TourView.html */

function mostrarCuenta(selectedItem) {
    var cantidad = parseInt(document.getElementById("idInputCantidad").value, 10);
    var precioTour = parseInt(document.getElementById("idLabelPrecio").innerHTML.split(':')[1], 10);
    var tipo = document.getElementById("idLabelTipo").innerHTML.split(':')[1];
    var descuento = 0;

    if (tipo === ' Familiar' || cantidad > 5) {
        descuento = 0.13;
    }
    var total = cantidad * precioTour;
    total -= total * descuento;
    alert("Su cuenta es: " + total);
}

function cargarInfoTours() {
    var r;
    var result;
    fetch('data/tourFile.json')
            .then(response => response.json())
            .then(data => {
                r = JSON.stringify(data);
                result = JSON.parse(r);
                var select = document.getElementById("optionTours");
                var option = document.createElement("option");
                option.setAttribute("value", " ");
                select.appendChild(option);
                for (var i = 0; i < result['tours'].length; i++) {
                    option = document.createElement("option");
                    option.setAttribute("value", result['tours'][i]['nombre']);
                    option.innerHTML = result['tours'][i]['nombre'];
                    select.appendChild(option);
                }
                select.options.item(0).selected = 'selected';

                try {
                    document.body.replaceChild(select, document.getElementById("optionTours"));
                } catch (e) {

                }

            });
}

function updateData(selectedItem) {
    var r;
    var result;
    fetch('data/tourFile.json')
            .then(response => response.json())
            .then(data => {
                r = JSON.stringify(data);
                result = JSON.parse(r);
                for (var i = 0; i < result['tours'].length; i++) {
                    if (result['tours'][i]['nombre'] === selectedItem.value) {
                        var divWrapper = document.getElementById("divWrapper");

                        if (divWrapper.hasChildNodes()) {
                            divWrapper.innerHTML = '';
                        }

                        const botonEnviar = document.createElement("input");
                        botonEnviar.setAttribute("type", "submit");
                        botonEnviar.setAttribute("value", "Enviar");
                        botonEnviar.setAttribute("onclick", "mostrarCuenta()");

                        const labelTipo = document.createElement("label");
                        labelTipo.setAttribute("id", "idLabelTipo");
                        labelTipo.innerHTML = "Tipo: " + result['tours'][i]['tipo'];

                        const labelPrecio = document.createElement("label");
                        labelPrecio.setAttribute("id", "idLabelPrecio");
                        labelPrecio.innerHTML = "Precio: " + result['tours'][i]['precio'];

                        const labelCantidad = document.createElement("label");
                        labelCantidad.setAttribute("for", "inputCantidad");
                        labelCantidad.innerHTML = "Cantidad de tours";

                        const inputCantidad = document.createElement("input");
                        inputCantidad.setAttribute("type", "text");
                        inputCantidad.setAttribute("id", "idInputCantidad");
                        inputCantidad.setAttribute("name", "cantidadTours");

                        divWrapper.appendChild(labelTipo);
                        divWrapper.appendChild(document.createElement("br"));
                        divWrapper.appendChild(labelPrecio);
                        divWrapper.appendChild(document.createElement("br"));
                        divWrapper.appendChild(labelCantidad);
                        divWrapper.appendChild(document.createElement("br"));
                        divWrapper.appendChild(inputCantidad);
                        divWrapper.appendChild(document.createElement("br"));
                        divWrapper.appendChild(document.createElement("br"));
                        divWrapper.appendChild(botonEnviar);
                        divWrapper.appendChild(document.createElement("br"));

                        document.body.replaceChild(divWrapper, document.getElementById("divWrapper");
                        break;
                    }
                }
            });

}
