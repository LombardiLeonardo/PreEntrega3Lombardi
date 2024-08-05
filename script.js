// Arrays y Objetos necesarios para el proceso
const modelos = {
    auto: ["Toyota Cruze", "Ford Focus", "Clio Mio"],
    camioneta: ["Toyota Hilux", "Ford Ranger", "VW Amarok", "Chevrolet S10"],
    tractor: ["Scania P410", "Mercedez Benz Axor", "Volvo 420"]
};

const preciosBase = {
    auto: 20000,
    camioneta: 60000,
    tractor: 120000
};

const factoresMarca = {
    Ford: 1.2,
    Toyota: 1.3,
    VW: 1.5,
    Chevrolet: 1.6,
    Volvo: 1.4,
    Scania: 1.7,
    "Mercedez Benz": 1.8
};

const modelosPorMarca = {
    Ford: ["Ford Focus", "Ford Ranger"],
    Toyota: ["Toyota Cruze", "Toyota Hilux"],
    VW: ["VW Amarok"],
    Chevrolet: ["Chevrolet S10"],
    Volvo: ["Volvo 420"],
    Scania: ["Scania P410"],
    "Mercedez Benz": ["Mercedez Benz Axor"]
};

// Función para obtener el tipo de vehículo
function getTipoVehiculo(tipo) {
    switch (tipo) {
        case 'auto': return 'auto';
        case 'camioneta': return 'camioneta';
        case 'tractor': return 'tractor';
    }
}

// Función para cotizar el seguro
function cotizarSeguro(tipoVehiculo, modeloVehiculo, marcaVehiculo) {
    const precioBase = preciosBase[tipoVehiculo];
    const factorMarca = factoresMarca[marcaVehiculo];
    const cotizacion = precioBase * factorMarca;

    const resultado = document.getElementById('resultado');
    resultado.textContent = `La cotización del seguro para el ${modeloVehiculo} (${marcaVehiculo}) es $${cotizacion.toFixed(2)}`;
    resultado.style.display = 'block';

    // Guardar la cotización en el almacenamiento local
    guardarCotizacion(marcaVehiculo, tipoVehiculo, modeloVehiculo, cotizacion);
    mostrarCotizaciones();
}

// Función para actualizar los modelos según la marca y tipo de vehículo seleccionado
function actualizarModelos() {
    const marca = document.getElementById('marca').value;
    const tipo = document.getElementById('tipo').value;
    const modeloSelect = document.getElementById('modelo');

    // Filtrar los modelos según la marca y tipo de vehículo
    const modelosDisponibles = modelos[tipo].filter(modelo => modelosPorMarca[marca].includes(modelo));

    // Limpiar el select de modelos
    modeloSelect.innerHTML = '';

    // Agregar los modelos disponibles
    modelosDisponibles.forEach(modelo => {
        const option = document.createElement('option');
        option.value = modelo;
        option.textContent = modelo;
        modeloSelect.appendChild(option);
    });
}

// Evento para actualizar los modelos cuando se cambia la marca o el tipo de vehículo
document.getElementById('marca').addEventListener('change', actualizarModelos);
document.getElementById('tipo').addEventListener('change', actualizarModelos);

// Manejar el formulario de simulación
document.getElementById('simulador-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const marca = document.getElementById('marca').value;
    const tipo = document.getElementById('tipo').value;
    const modelo = document.getElementById('modelo').value;

    // Verificar que el modelo corresponde a la marca seleccionada
    if (!modelosPorMarca[marca].includes(modelo)) {
        alert("La marca que seleccionaste no coincide con el modelo del vehículo. Por favor, verifica los datos e intenta de nuevo. Gracias.");
        return;
    }

    // Cotizar el seguro
    cotizarSeguro(tipo, modelo, marca);
});

// Función para guardar la cotización en localStorage
function guardarCotizacion(marca, tipo, modelo, cotizacion) {
    const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    cotizaciones.push({ marca, tipo, modelo, cotizacion });
    localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
}

// Función para mostrar las cotizaciones guardadas
function mostrarCotizaciones() {
    const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    const cotizacionesDiv = document.getElementById('cotizaciones');
    cotizacionesDiv.innerHTML = '<h3>Cotizaciones Guardadas</h3>';

    cotizaciones.forEach(cotizacion => {
        const p = document.createElement('p');
        p.textContent = `Marca: ${cotizacion.marca}, Tipo: ${cotizacion.tipo}, Modelo: ${cotizacion.modelo}, Cotización: $${cotizacion.cotizacion.toFixed(2)}`;
        cotizacionesDiv.appendChild(p);
    });
}

// Mostrar cotizaciones al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCotizaciones);
