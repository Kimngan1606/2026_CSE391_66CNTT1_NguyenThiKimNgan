function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

let id = 2;

function addEmployee() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let position = document.getElementById("position").value;

    if (name === "" || email === "") {
        alert("Vui lòng nhập đủ thông tin");
        return;
    }

    let table = document.getElementById("employeeTable");
    let row = table.insertRow();

    row.innerHTML = `
        <td>${id++}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${position}</td>
        <td>
            <button class="btn-edit">Edit</button>
            <button class="btn-delete">Delete</button>
        </td>
    `;

    closeModal();
}