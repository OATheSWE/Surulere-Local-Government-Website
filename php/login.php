<?php 
// Include the database connection
include 'db.php';

// Retrieve the password sent from the frontend
// Check if the password is provided in the request
if (isset($_POST["password"])) {
    $password = $_POST["password"];
} else {
    // Password not provided
    $response = [
        "status" => "error",
        "message" => "Password not provided."
    ];
    // Send JSON response back to the frontend and exit
    echo json_encode($response);
    exit();
}

// Define the correct password
$correctPassword = "443suru@2024";

// Check if the received password matches the correct password
if ($password === $correctPassword) {
    // Password is correct
    $response = [
        "status" => "success",
        "message" => "Login successful."
    ];
} else {
    // Password is incorrect
    $response = [
        "status" => "error",
        "message" => "Incorrect password. Login failed."
    ];
}

// Send JSON response back to the frontend
echo json_encode($response);
?>
