const modelListItems = document.querySelectorAll('.model-list li');
const carImage = document.querySelector('.model-details img');
const modelDetails = document.querySelector('.details ul');
const price = document.querySelector('.details .price');

const carData = {
    "Royal Enfield Classic 350": {
        image: "images/Royal-Enfield-Classic-350.jpg" , alt: "Royal Enfield Classic 350",
        details: [
            { label: "Model", value: "Classic 350" },
            { label: "Mileage", value: "35 kmpl" },
            { label: "Seats", value: "2" },
            { label: "Tank Capacity", value: "13 liters" },
            { label: "Max Speed", value: "110 kmph" },
            { label: "Riding modes", value: "No" },
            { label: "Bike Color", value: "Black" },
        ],
        price: "₹800"
        
    },
    "Royal Enfield Himalayan": {
        image: "images/himalayan.jpg",
        details: [
            { label: "Model", value: "Himalayan 411" },
            { label: "Mileage", value: "30 kmpl" },
            { label: "Seats", value: "2" },
            { label: "Tank Capacity", value: "15 liters" },
            { label: "Max Speed", value: "140 kmph" },
            { label: "Riding modes", value: "Yes" },
            { label: "Bike Color", value: "gravel gray" },
        ],
        price: "₹1500"
    },
    "Activa 6G": {
        image: "images/activa-6g.jpeg",
        details: [
            { label: "Model", value: "Activa 6G" },
            { label: "Mileage", value: "55 kmpl" },
            { label: "Seats", value: "2" },
            { label: "Tank Capacity", value: "5.3 liters" },
            { label: "Max Speed", value: "85 kmph" },
            { label: "Riding modes", value: "No" },
            { label: "Bike Color", value: "Blue" },
        ],
        price: "₹600"
    },
    "JEEP wrangler": {
        image: "images/jeep.jpg",
        details: [
            { label: "Model", value: "Jeep wrangler" },
            { label: "Doors", value: "5" },
            { label: "Seats", value: "5" },
            { label: "Luggage", value: "2 Suitcases / 1 Bag" },
            { label: "Transmission", value: "Automatic" },
            { label: "Air conditioning", value: "Yes" },
            { label: "Jeep Color", value: "Black" },
        ],
        price: "₹4500"
    },
    "Maruti swift": {
        image: "images/swift.jpg",
        details: [
            { label: "Model", value: "Swift" },
            { label: "Doors", value: "4" },
            { label: "Seats", value: "5" },
            { label: "Luggage", value: "2 Suitcases / 2 Bags" },
            { label: "Transmission", value: "Manual" },
            { label: "Air conditioning", value: "Yes" },
            { label: "Car Color", value: "Red" },
        ],
        price: "₹2500"
    },
    "Mahidra XUV 700": {
        image: "images/Mahindra-XUV700-Bison-Edition-img4.jpg",
        details: [
            { label: "Model", value: "XUV 700" },
            { label: "Doors", value: "4" },
            { label: "Seats", value: "7" },
            { label: "Luggage", value: "2 Suitcases / 2 Bags" },
            { label: "Transmission", value: "Automatic" },
            { label: "Air conditioning", value: "Yes" },
            { label: "Car Color", value: "Red" },
        ],
        price: "₹4000"
    }
};



// Function to update vehicle details
function updateCarDetails(selectedCar) {
    const data = carData[selectedCar];
    if (data) {
        // Update the image
        carImage.src = data.image;
        carImage.alt = `${selectedCar} image`;

        // Update the details list
        modelDetails.innerHTML = data.details
            .map(detail => `<li><strong>${detail.label}:</strong> ${detail.value}</li>`)
            .join('');

        // Update the price
        price.innerHTML = `${data.price} <span>/ per day</span>`;
    }
}

// Add click event listeners to each list item
modelListItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'active' class from all items
        modelListItems.forEach(li => li.classList.remove('active'));

        // Add 'active' class to the clicked item
        item.classList.add('active');

        // Get the selected vehicle name
        const selectedCar = item.textContent.trim();

        // Update the details based on the selected vehicle
        updateCarDetails(selectedCar);
    });
});

// Initialize with the first vehicle
const firstVehicle = document.querySelector('.model-list li');
if (firstVehicle) {
    firstVehicle.classList.add('active');
    updateCarDetails(firstVehicle.textContent.trim());
}



