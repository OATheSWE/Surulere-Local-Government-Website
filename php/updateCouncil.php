<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'uploads/';

// Retrieve data from the frontend
$council_id = $_POST['council_id'];
$council_name = $_POST['council_name'];
$council_data = json_decode($_POST['council_data'], true);

// Check if council_id, council_name, and council_data are provided
if (empty($council_id) || empty($council_name) || !is_array($council_data)) {
    echo json_encode([
        "status" => "error",
        "message" => "Council ID, name, and valid council data are required."
    ]);
    exit;
}

// Check if the council exists in the database
$checkQuery = "SELECT * FROM councils WHERE council_id = $1";
$checkResult = pg_query_params($connection, $checkQuery, [$council_id]);

if (!$checkResult || pg_num_rows($checkResult) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Council not found."
    ]);
    exit;
}

// Process each object in council_data array
foreach ($council_data as &$data) {
    // Check if the object has an image key with data
    if (isset($data['image']) && isset($data['image']['data'])) {
        $image = $data['image'];

        // Check if all required image fields are present
        if (!isset($image['name'], $image['size'], $image['type'])) {
            echo json_encode([
                "status" => "error",
                "message" => "Incomplete image data provided for one of the items."
            ]);
            exit;
        }

        // Decode the base64 image data and save it to the upload directory
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
        $data['image'] = [
            'name' => $image['name'],
            'size' => $image['size'],
            'type' => $image['type'],
            'path' => $filePath
        ];
    }
}

// Update the council in the councils table
$updateQuery = "UPDATE councils SET council_name = $1, council_data = $2 WHERE council_id = $3";
$updateResult = pg_query_params($connection, $updateQuery, [$council_name, json_encode($council_data), $council_id]);

if (!$updateResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to update council: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Council updated successfully."
]);
?>
