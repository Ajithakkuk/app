fetch('header.html')
  .then(response => response.text())
  .then(data => {
    // Insert the header HTML into the placeholder
    document.getElementById('header-placeholder').innerHTML = data;

    // Add functionality to the logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        alert('You have been logged out. Thank you!');
        window.location.href = 'login.html';
      });
    }
  })
  .catch(error => console.error('Error loading header:', error));
