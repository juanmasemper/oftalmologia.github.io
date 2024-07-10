document.addEventListener('DOMContentLoaded', () => {
    const addPatientBtn = document.getElementById('add-patient-btn');
    const patientForm = document.getElementById('patient-form');
    const form = document.getElementById('form');
    const patientsTableBody = document.querySelector('#patients-table tbody');
    const editPatientForm = document.getElementById('edit-patient-form');
    const editForm = document.getElementById('edit-form');
    let editingIndex = null;

    addPatientBtn.addEventListener('click', () => {
        patientForm.classList.toggle('hidden');
        form.reset();
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
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;
        
        patientsTableBody.appendChild(newRow);
        
        // Añadir eventos a los nuevos botones
        newRow.querySelector('.delete-btn').addEventListener('click', () => {
            newRow.remove();
        });
        
        newRow.querySelector('.edit-btn').addEventListener('click', () => {
            const row = newRow;
            const name = row.children[0].textContent;
            const age = row.children[1].textContent;
            const condition = row.children[2].textContent;

            document.getElementById('edit-name').value = name;
            document.getElementById('edit-age').value = age;
            document.getElementById('edit-condition').value = condition;

            editingIndex = Array.from(patientsTableBody.children).indexOf(row);

            editPatientForm.classList.remove('hidden');
            patientForm.classList.add('hidden');
        });

        form.reset();
        patientForm.classList.add('hidden');
    });

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('edit-name').value;
        const age = document.getElementById('edit-age').value;
        const condition = document.getElementById('edit-condition').value;

        if (editingIndex !== null) {
            const row = patientsTableBody.children[editingIndex];
            row.children[0].textContent = name;
            row.children[1].textContent = age;
            row.children[2].textContent = condition;

            editingIndex = null;
        }

        editForm.reset();
        editPatientForm.classList.add('hidden');
    });

    document.getElementById('cancel-edit').addEventListener('click', () => {
        editForm.reset();
        editPatientForm.classList.add('hidden');
        editingIndex = null;
    });

    // Añadir eventos de eliminación y edición a los botones existentes (si los hubiera)
    patientsTableBody.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('tr').remove();
        });
    });

    patientsTableBody.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const name = row.children[0].textContent;
            const age = row.children[1].textContent;
            const condition = row.children[2].textContent;

            document.getElementById('edit-name').value = name;
            document.getElementById('edit-age').value = age;
            document.getElementById('edit-condition').value = condition;

            editingIndex = Array.from(patientsTableBody.children).indexOf(row);

            editPatientForm.classList.remove('hidden');
            patientForm.classList.add('hidden');
        });
    });
});
