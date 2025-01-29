document.getElementById("offerForm").addEventListener("submit", function(event) {  
    event.preventDefault();  
    let email = event.target.elements[0].value;  

    if (email) {  
        alert(`Thank you for signing up with ${email}!`);  
        event.target.elements[0].value = ''; // Clear the input  
    } else {  
        alert(`Please enter a valid email address.`);  
    }  
});