document.addEventListener("DOMContentLoaded", async () => {
    const employeesList = document.getElementById("employees-list");

    try {
        const response = await fetch('http://localhost:5000/employee');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const employees = await response.json();
        console.log(employees)

        sendingData(employees);

        // console.log(employeesList);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function sendingData(employees) {
    const tbody = document.querySelector("#tbody");
  
    employees.forEach((employee) => {
      // Create a new row for each employee
      const row = document.createElement("tr");
  
      // Create td elements for each property of the employee
      const firstNameTd = document.createElement("td");
      firstNameTd.innerHTML = `<p>${employee.firstName}</p>`;
      row.appendChild(firstNameTd);
  
      const lastNameTd = document.createElement("td");
      lastNameTd.innerHTML = `<p>${employee.lastName}</p>`;
      row.appendChild(lastNameTd);
  
      const phoneNumberTd = document.createElement("td");
      phoneNumberTd.innerHTML = `<p>${employee.phoneNumber}</p>`;
      row.appendChild(phoneNumberTd);
  
      const departmentTd = document.createElement("td");
      departmentTd.innerHTML = `<p>${employee.department}</p>`;
      row.appendChild(departmentTd);
  
      const salaryTd = document.createElement("td");
      salaryTd.innerHTML = `<p>${employee.salary}</p>`;
      row.appendChild(salaryTd);
  
      const addressTd = document.createElement("td");
      addressTd.innerHTML = `<p>${employee.address}</p>`;
      row.appendChild(addressTd);
  
      // Add action buttons with employee ID
      const actionTd = document.createElement("td");
      actionTd.innerHTML = `
        
        <button class="btn btn-danger" onclick="deleteEmployee('${employee._id}')">Delete</button>
      `;
      row.appendChild(actionTd);
  
      // Append the row to the tbody
      tbody.appendChild(row);
    });
}

// Example functions for view and delete
async function deleteEmployee(employeeId) {
    console.log(`Deleting employee with ID: ${employeeId}`);
    
    const response = await fetch("http://localhost:5000/employee/" + employeeId, { method: "DELETE" });

    if(response.ok){
        window.location.reload();
    }
    // Implement your logic to delete the employee
}
