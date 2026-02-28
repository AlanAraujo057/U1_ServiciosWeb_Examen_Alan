const btnBuscar = document.getElementById("btnBuscar");
const contentData = document.getElementById("contentData");
const API = "5897731015394a89904a582f1a6a93b9";

const buscar = async () => {
    const busqueda = document.getElementById("busqueda").value;
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;

    contentData.innerHTML = "";

    if (busqueda === "" || fechaInicio === "" || fechaFin === "") {
        contentData.innerHTML = "<h2>Todos los campos son obligatorios</h2>";
        return;
    }
    if(fechaFin<fechaInicio){
         contentData.innerHTML = "<h2>La fecha fin es mayor a la de inicio, elige una fecha valida</h2>";
        return;
    }

    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${busqueda}&from=${fechaInicio}&to=${fechaFin}&sortBy=popularity&apiKey=${API}`
        );

        if (!response.ok) {
            contentData.innerHTML = "<h2>No se encontró ninguna noticia</h2>";
            return;
        }

        const data = await response.json();

        if (data.articles.length===0) {
            contentData.innerHTML = "<h2>No hay noticias disponibles</h2>";
            return;
        }

        data.articles.forEach(noticia => {
            const divX = document.createElement("div");
            divX.classList.add("col-md-6");

            divX.innerHTML = `
                <div class="card">
                    <img src="${noticia.urlToImage ?noticia.urlToImage :'https://ih1.redbubble.net/image.1861329650.2941/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${noticia.title}</h5>
                        <p>Descripción:${noticia.description}</p>
                        <p>Nombre del medio: ${noticia.source.name}</p>
                        <p>Fecha de publicación:${noticia.publishedAt}</p>
                        <a href="${noticia.url}" class="btn btn-primary">Ir a la noticia original</a>
                    </div>
                </div>`;

            contentData.appendChild(divX);
        });

    } catch (error) {
        console.log(error);
        contentData.innerHTML = "<h2>Hubo un error en la búsqueda</h2>";
    }
};
btnBuscar.addEventListener("click", buscar);