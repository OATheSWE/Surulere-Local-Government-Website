<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'uploads/';

// Retrieve the advert image object from the frontend
$advertImage = json_decode($_POST['advert_image'], true);

// Check if the image object is provided
if (empty($advertImage) || !isset($advertImage['name'], $advertImage['size'], $advertImage['type'], $advertImage['data'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Incomplete advert image data provided."
    ]);
    exit;
}

// Generate a unique 8-character advert ID
$advert_id = substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyz", 8)), 0, 8);

// Save the image to the upload directory
$imageData = base64_decode($advertImage['data']);
$filePath = $uploadDir . basename($advertImage['name']);
if (!file_put_contents($filePath, $imageData)) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save the advert image."
    ]);
    exit;
}

// Create the advert data object
$advert_data = [
    'name' => $advertImage['name'],
    'type' => $advertImage['type'],
    'file_path' => $filePath,
    'size' => $advertImage['size']
];

// Insert the advert into the adverts table
$insertQuery = "INSERT INTO adverts (advert_id, advert_data) VALUES ($1, $2)";
$insertResult = pg_query_params($connection, $insertQuery, [$advert_id, json_encode($advert_data)]);

if (!$insertResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to add advert: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Advert added successfully."
]);
?>
