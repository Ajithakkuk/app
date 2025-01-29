<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rental";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Debug: Check request method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// Sanitize and validate inputs
$username = isset($_POST['username']) ? htmlspecialchars(trim($_POST['username'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit;
}

// Debug: Log hashed password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Check if email already exists
$emailCheckQuery = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($emailCheckQuery);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email is already registered."]);
    exit;
}

// Insert user into database
$sql = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User successfully registered."]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
