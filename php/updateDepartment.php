<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'uploads/';

// Retrieve data from the frontend
$department_id = $_POST['department_id'];
$department_name = $_POST['department_name'];
$department_data = json_decode($_POST['department_data'], true);

// Check if department_id, department_name, and department_data are provided
if (empty($department_id) || empty($department_name) || empty($department_data)) {
    echo json_encode([
        "status" => "error",
        "message" => "Department ID, name, and data are required."
    ]);
    exit;
}

// Check if the department exists in the database
$checkQuery = "SELECT * FROM departments WHERE department_id = $1";
$checkResult = pg_query_params($connection, $checkQuery, [$department_id]);

if (!$checkResult || pg_num_rows($checkResult) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Department not found."
    ]);
    exit;
}

// Process the image if the 'data' key is present in the image object
if (isset($department_data['image']) && isset($department_data['image']['data'])) {
    $image = $department_data['image'];

    // Check if all required image fields are present
    if (!isset($image['name'], $image['size'], $image['type'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Incomplete image data provided."
        ]);
        exit;
    }

    // Save the new image to the upload directory
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

// Update the department in the departments table
$updateQuery = "UPDATE departments SET department_name = $1, department_data = $2 WHERE department_id = $3";
$updateResult = pg_query_params($connection, $updateQuery, [$department_name, json_encode($department_data), $department_id]);

if (!$updateResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to update department: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Department updated successfully."
]);
?>
