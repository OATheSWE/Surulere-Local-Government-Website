<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'uploads/';

// Retrieve data from the frontend
$council_name = $_POST['council_name'];
$council_data = json_decode($_POST['council_data'], true);

// Check if council_name and council_data are provided
if (empty($council_name) || !is_array($council_data)) {
    echo json_encode([
        "status" => "error",
        "message" => "Council name and valid council data are required."
    ]);
    exit;
}

// Process each object in council_data array
foreach ($council_data as &$data) {
    // Check if the object has an image key
    if (isset($data['image'])) {
        $image = $data['image'];

        // Check if all required image fields are present
        if (!isset($image['name'], $image['size'], $image['type'], $image['data'])) {
            echo json_encode([
                "status" => "error",
                "message" => "Incomplete image data provided for one of the items."
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
        $data['image'] = [
            'name' => $image['name'],
            'size' => $image['size'],
            'type' => $image['type'],
            'path' => $filePath
        ];
    }
}

// // Generate an 8-character council ID
// $council_id = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);

// Insert the new council into the councils table
$query = "INSERT INTO councils (council_name, council_data) VALUES ($1, $2)";
$result = pg_query_params($connection, $query, [$council_name, json_encode($council_data)]);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to create council: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Council created successfully."
]);
?>
