<?php
// Include the database connection
include 'db.php';

// Define the upload directory for images
$uploadDir = 'uploads/';

// Retrieve the advert ID and image object from the frontend
$advert_id = $_POST['advert_id'];
$advertImage = json_decode($_POST['advert_image'], true);

// Check if advert_id is provided
if (empty($advert_id)) {
    echo json_encode([
        "status" => "error",
        "message" => "Advert ID is required."
    ]);
    exit;
}

// Check if the advert ID exists in the database
$checkQuery = "SELECT advert_data FROM adverts WHERE advert_id = $1";
$checkResult = pg_query_params($connection, $checkQuery, [$advert_id]);

if (!$checkResult || pg_num_rows($checkResult) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Advert not found."
    ]);
    exit;
}

// Fetch the current advert data
$currentAdvertData = pg_fetch_assoc($checkResult);
$currentImageObject = json_decode($currentAdvertData['advert_data'], true);

// Process the image if 'file_path' is not present in the incoming object
if (!isset($advertImage['file_path'])) {
    // Delete the existing image file from the uploads folder
    $existingFilePath = $currentImageObject['file_path'];
    if (file_exists($existingFilePath)) {
        unlink($existingFilePath);
    }

    // Save the new image to the upload directory
    if (!isset($advertImage['name'], $advertImage['size'], $advertImage['type'], $advertImage['data'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Incomplete advert image data provided."
        ]);
        exit;
    }

    // Process new image data
    $imageData = base64_decode($advertImage['data']);
    $filePath = $uploadDir . basename($advertImage['name']);
    if (!file_put_contents($filePath, $imageData)) {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to save the new advert image."
        ]);
        exit;
    }

    // Update the advert data object
    $advertImage = [
        'name' => $advertImage['name'],
        'type' => $advertImage['type'],
        'file_path' => $filePath,
        'size' => $advertImage['size']
    ];
}

// Update the advert in the adverts table
$updateQuery = "UPDATE adverts SET advert_data = $1 WHERE advert_id = $2";
$updateResult = pg_query_params($connection, $updateQuery, [json_encode($advertImage), $advert_id]);

if (!$updateResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to update advert: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Advert updated successfully."
]);
?>
