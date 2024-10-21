<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'uploads/';

// Retrieve the image data from the frontend
$imageData = json_decode($_POST['image_data'], true);

// Check if the image data is provided
if (empty($imageData)) {
    echo json_encode([
        "status" => "error",
        "message" => "Image data is required."
    ]);
    exit;
}

// Check if all required fields are present in the image object
if (!isset($imageData['name'], $imageData['size'], $imageData['type'], $imageData['data'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Incomplete image data provided."
    ]);
    exit;
}

// Generate an 8-character gallery ID
$gallery_id = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);

// Decode the base64 image data
$imageDataDecoded = base64_decode($imageData['data']);

// Define the file path for saving the image
$filePath = $uploadDir . basename($imageData['name']);

// Save the image to the upload directory
if (!file_put_contents($filePath, $imageDataDecoded)) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save the image."
    ]);
    exit;
}

// Create the processed image object
$processedImage = [
    'name' => $imageData['name'],
    'type' => $imageData['type'],
    'file_path' => $filePath,
    'size' => $imageData['size']
];

// Insert the image object into the gallery table
$insertQuery = "INSERT INTO gallery (gallery_id, gallery_data) VALUES ($1, $2)";
$insertResult = pg_query_params($connection, $insertQuery, [$gallery_id, json_encode($processedImage)]);

if (!$insertResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to add image to gallery: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Image added to gallery successfully."
]);
?>
