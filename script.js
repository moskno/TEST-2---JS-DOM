const fullNameInput = document.getElementById('fullName');
const rankInput = document.getElementById('rank');
const positionInput = document.getElementById('position');
const platoonInput = document.getElementById('platoon');
const missionTimeInput = document.getElementById('missionTime');
const statusInput = document.getElementById('status');
const dataTable = document.getElementById('data-table').querySelector('tbody');


function getFormData(){
    return {
        fullName: fullNameInput.value,
        rank: rankInput.value,
        position: positionInput.value,
        platoon: platoonInput.value,
        missionTime: missionTimeInput.value,
        status: statusInput.value
    };
}

function createSoldierRow(soldier){
    const { missionTime, ...rest } = soldier; 

    const tableRow = document.createElement('tr');
    
    Object.values(rest).forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        tableRow.appendChild(cell);
    });

    const actionCell = document.createElement('td');
    ['Remove', 'Mission', 'Edit'].forEach(label => {
        const button = document.createElement('button')
        button.textContent = label;
        button.classList.add('btn');
        actionCell.appendChild(button);
    });
    tableRow.appendChild(actionCell);

    return tableRow;
}


function saveFormData(formData) {
    const storedFormData = JSON.parse(localStorage.getItem('formData')) || [];
    storedFormData.push(formData);
    localStorage.setItem('formData', JSON.stringify(storedFormData));
}

function loadFromData() {
    const storedSoldiers = JSON.parse(localStorage.getItem('formData')) || [];
    storedSoldiers.forEach(soldier => dataTable.appendChild(createSoldierRow(soldier)));
}


document.addEventListener('DOMContentLoaded', loadFromData);

document.getElementById('form-add-details').addEventListener('submit', function(event){
    event.preventDefault();
    const formData = getFormData();
    saveFormData(formData);
    document.getElementById('form-add-details').reset();

    dataTable.appendChild(createSoldierRow(formData));
})

