<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'uploads/';

// Retrieve data from the frontend
$department_name = $_POST['department_name'];
$department_data = json_decode($_POST['department_data'], true);

// Check if department_name and department_data are provided
if (empty($department_name) || empty($department_data)) {
    echo json_encode([
        "status" => "error",
        "message" => "Department name and data are required."
    ]);
    exit;
}

// Process the image in department_data
if (isset($department_data['image'])) {
    $image = $department_data['image'];

    // Check if all required image fields are present
    if (!isset($image['name'], $image['size'], $image['type'], $image['data'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Incomplete image data provided."
        ]);
        exit;
    }

    // Save the image to the upload directory
    $imageData = base64_decode($image['data']);
    $filePath = $uploadDir . basename($image['name']);
    if (!file_put_contents($filePath, $imageData)) {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to save the image."
        ]);
        exit;
    }

    // Update the image object to store the file path and remove the data key
    $department_data['image'] = [
        'name' => $image['name'],
        'size' => $image['size'],
        'type' => $image['type'],
        'path' => $filePath
    ];
}

// Generate an 8-character department ID
$department_id = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);

// Insert the new department into the departments table
$query = "INSERT INTO departments (department_id, department_name, department_data) VALUES ($1, $2, $3)";
$result = pg_query_params($connection, $query, [$department_id, $department_name, json_encode($department_data)]);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to create department: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Department created successfully.",
]);
?>
