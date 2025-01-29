<?php
// Database connection
$servername = "localhost"; // Database server
$username = "root";        // MySQL username
$password = "";            // MySQL password
$dbname = "rental"; // Database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if email and password are not empty
    if (empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Please fill in both fields."]);
        exit();
    }

    // Prepare SQL query to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User exists, now check password
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Login successful
            echo json_encode(["success" => true]);
        } else {
            // Invalid password
            echo json_encode(["success" => false, "message" => "Invalid email or password."]);
        }
    } else {
        // User not found
        echo json_encode(["success" => false, "message" => "No user found with this email."]);
    }
}

$conn->close();
?>
