document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username === "demo_user" && password === "demo_password") {
        alert("Login successful!");
      
        window.location.href = "dashboard.html"; 
    } else {
        alert("Incorrect username or password. Please try again.");
    }
});
document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    
    alert(`Reset password link has been sent to ${email}`);
});
var carListData = [];

function addCar(id, make, model, year) {
    var newCar = {
        id: id,
        make: make,
        model: model,
        year: year
    };
    carListData.push(newCar);
    console.log(carListData);

    updateDashboard();

    updateCarList();
}

function updateDashboard() {
    var carListElement = document.getElementById('car-list-dashboard');
    carListElement.innerHTML = ''; 

    carListData.forEach(function(car, index) {
        var carItem = document.createElement('div');
        carItem.classList.add('car-item');
        carItem.textContent = 'Car ID: ' + car.id + ', ' + car.make + ' ' + car.model + ' (' + car.year + ')';
        carListElement.appendChild(carItem);
    });
}
window.onload = function() {
    console.log("Page is loaded."); 
    updateCarList();
};
function updateCarList() {
    var carListTable = document.getElementById('car-list-table');
    carListTable.innerHTML = ''; 

    carListData.forEach(function(car, index) {
        var row = carListTable.insertRow();
        var cellId = row.insertCell(0);
        cellId.textContent = car.id;

        var cellMake = row.insertCell(1);
        cellMake.textContent = car.make;

        var cellModel = row.insertCell(2);
        cellModel.textContent = car.model;

        var cellYear = row.insertCell(3);
        cellYear.textContent = car.year;

        var cellCheckIn = row.insertCell(4);
        if (car.checkedIn) {
            cellCheckIn.textContent = 'Yes';
        } else {
            var checkInButton = document.createElement('button');
            checkInButton.textContent = 'Check-in';
            checkInButton.addEventListener('click', function() {
                checkIn(car.id);
            });
            cellCheckIn.appendChild(checkInButton);
        }
    });
}
function checkIn(carId) {
    var car = carListData.find(function(car) {
        return car.id === carId;
    });

    if (car) {
        car.checkedIn = true;
        updateCarList();
        alert('Car with ID ' + carId + ' checked-in successfully!');
    } else {
        alert('Car with ID ' + carId + ' not found!');
    }
}

document.getElementById('add-car-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var id = parseInt(document.getElementById('car-id').value);
    var make = document.getElementById('car-make').value;
    var model = document.getElementById('car-model').value;
    var year = document.getElementById('car-year').value;
    

    addCar(id, make, model, year);

    document.getElementById('car-id').value = '';
    document.getElementById('car-make').value = '';
    document.getElementById('car-model').value = '';
    document.getElementById('car-year').value = '';

    alert('Car added successfully!');
});

window.onload = function() {
    updateCarList();
    updateDashboard();
};

document.addEventListener('DOMContentLoaded', function() {
    const scheduleTable = document.getElementById('schedule-table');
    const rows = scheduleTable.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
            const cellContent = localStorage.getItem(`cell-${i}-${j}`);
            if (cellContent !== null) {
                cells[j].innerText = cellContent;
            }
        }
    }
});

document.getElementById('schedule-table').addEventListener('input', function(event) {
    const cell = event.target;
    const rowIndex = cell.parentElement.rowIndex;
    const cellIndex = cell.cellIndex;
    const cellContent = cell.innerText;
    
    localStorage.setItem(`cell-${rowIndex}-${cellIndex}`, cellContent);
});



