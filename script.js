// Manejo del inicio de sesión
document.getElementById('loginButton')?.addEventListener('click', function() {
    const cedula = document.getElementById('cedula').value;
    const clave = document.getElementById('clave').value;

    // Simulación de inicio de sesión
    if (cedula && clave) {
        // Aquí podrías agregar lógica para validar las credenciales
        window.location.href = 'menu.html';
    } else {
        alert('Por favor, ingrese cédula y clave');
    }
});

// Manejo del registro de multas
document.getElementById('saveFineButton')?.addEventListener('click', function() {
    const ciudadanoCedula = document.getElementById('ciudadanoCedula').value;
    const nombreCiudadano = document.getElementById('nombreCiudadano').value;
    const concepto = document.getElementById('concepto').value;
    const descripcion = document.getElementById('descripcion').value;
    const coordenadas = document.getElementById('coordenadas').value;

    if (ciudadanoCedula && nombreCiudadano && concepto && descripcion && coordenadas) {
        const multa = {
            ciudadanoCedula,
            nombreCiudadano,
            concepto,
            descripcion,
            coordenadas,
            fecha: new Date().toLocaleString(), // Fecha actual
            estado: 'Activa' // Estado inicial
        };

        // Guardar en localStorage
        let multas = JSON.parse(localStorage.getItem('multas')) || [];
        multas.push(multa);
        localStorage.setItem('multas', JSON.stringify(multas));

        document.getElementById('message').textContent = 'Multa registrada exitosamente';
        
        // Limpiar formulario
        document.querySelector('.container').reset();
        
    } else {
        alert('Por favor, complete todos los campos');
    }
});

// Cargar y mostrar multas en listado_multas.html
if (document.getElementById('multasTable')) {
    const multas = JSON.parse(localStorage.getItem('multas')) || [];
    const tbody = document.querySelector('#multasTable tbody');

    if (multas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">No hay multas registradas.</td></tr>';
    } else {
        multas.forEach(multa => {
            const row = `<tr>
                <td>${multa.ciudadanoCedula}</td>
                <td>${multa.nombreCiudadano}</td>
                <td>${multa.concepto}</td>
                <td>${multa.descripcion}</td>
                <td>${multa.coordenadas}</td>
                <td>${multa.fecha}</td>
                <td>${multa.estado}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }

    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = 'menu.html';
    });
}

// Manejo del inicio de sesión para la oficina central
document.getElementById('oficinaLoginButton')?.addEventListener('click', function() {
    const cedula = document.getElementById('oficinaCedula').value;
    const clave = document.getElementById('oficinaClave').value;

    // Simulación de inicio de sesión
    if (cedula && clave) {
        window.location.href = 'gestionar_multas.html'; // Redirigir a gestionar multas
    } else {
        alert('Por favor, ingrese cédula y clave');
    }
});

// Manejo del buscar multas en gestionar_multas.html
// Manejo del inicio de sesión para el módulo administrativo
document.getElementById('adminLoginButton')?.addEventListener('click', function() {
    const user = document.getElementById('adminUser').value;
    const password = document.getElementById('adminPassword').value;

    // Validar credenciales
    if (user === 'adamix' && password === 'estoesfacil') {
        document.getElementById('adminMenu').style.display = 'block';
        document.getElementById('message').textContent = '';
    } else {
        alert('Credenciales incorrectas');
    }
});

// Manejo del agregar usuario
document.getElementById('addUserButton')?.addEventListener('click', function() {
    const newUser = document.getElementById('newUser').value.trim();
    
    if (newUser) {
        // Aquí podrías agregar lógica para guardar usuarios en localStorage o en una base de datos
        alert(`Usuario ${newUser} agregado exitosamente.`);
        document.getElementById('newUser').value = ''; // Limpiar campo
    } else {
        alert('Por favor, ingrese un nombre de usuario.');
    }
});

// Manejo del agregar concepto
document.getElementById('addConceptButton')?.addEventListener('click', function() {
    const newConcept = document.getElementById('newConcept').value.trim();
    
    if (newConcept) {
        // Guardar concepto en localStorage
        let conceptos = JSON.parse(localStorage.getItem('conceptos')) || [];
        conceptos.push(newConcept);
        localStorage.setItem('conceptos', JSON.stringify(conceptos));

        // Actualizar lista visible
        updateConceptList();
        
        alert(`Concepto "${newConcept}" agregado exitosamente.`);
        document.getElementById('newConcept').value = ''; // Limpiar campo
    } else {
        alert('Por favor, ingrese un concepto.');
    }
});

// Función para actualizar la lista de conceptos
function updateConceptList() {
    const conceptos = JSON.parse(localStorage.getItem('conceptos')) || [];
    const conceptList = document.getElementById('conceptList');
    
    conceptList.innerHTML = ''; // Limpiar lista antes de mostrar

    conceptos.forEach(concept => {
        const li = document.createElement('li');
        li.textContent = concept;
        conceptList.appendChild(li);
    });
}

// Cargar conceptos al iniciar el módulo administrativo
if (document.getElementById('conceptList')) {
    updateConceptList();
}

// Manejo del botón volver al menú
document.getElementById('backButton')?.addEventListener('click', function() {
    window.location.href = 'menu.html'; // Volver al menú principal
});