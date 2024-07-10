document.addEventListener('DOMContentLoaded', () => {
    const addPatientBtn = document.getElementById('add-patient-btn');
    const patientForm = document.getElementById('patient-form');
    const form = document.getElementById('form');
    const patientsTableBody = document.querySelector('#patients-table tbody');

    addPatientBtn.addEventListener('click', () => {
        patientForm.classList.toggle('hidden');
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const condition = document.getElementById('condition').value;
        
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td>${condition}</td>
            <td><button class="delete-btn">Eliminar</button></td>
        `;
        
        patientsTableBody.appendChild(newRow);
        
        // Añadir el evento de eliminación al nuevo botón
        newRow.querySelector('.delete-btn').addEventListener('click', () => {
            newRow.remove();
        });

        form.reset();
        patientForm.classList.add('hidden');
    });

    // Añadir el evento de eliminación a todos los botones existentes (si los hubiera)
    patientsTableBody.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('tr').remove();
        });
    });
});
