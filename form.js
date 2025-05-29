const form = document.getElementById('registrationForm');
const table = document.getElementById('userDataTable').getElementsByTagName('tbody')[0];

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  return age;
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const termsAccepted = document.getElementById('terms').checked;

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert('Age must be between 18 and 55 years.');
    return;
  }

  const userData = { 
    name,
    email,
    password, 
    dob,
    termsAccepted
 };

  let savedData = JSON.parse(localStorage.getItem('userData')) || [];

  savedData.push(userData);

  localStorage.setItem('userData', JSON.stringify(savedData));

  const row = table.insertRow();
  row.innerHTML = `
    <td>${name}</td>
    <td>${email}</td>
    <td>${password}</td>
    <td>${dob}</td>
    <td>${termsAccepted}</td>
  `;

  form.reset();
});

window.addEventListener('load', function() {
  const savedData = JSON.parse(localStorage.getItem('userData')) || [];
  
  savedData.forEach(data => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.email}</td>
      <td>${data.password}</td>
      <td>${data.dob}</td>
      <td>${data.termsAccepted}</td>
    `;
  });
});
