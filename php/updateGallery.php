<?php
// Include the database connection
include 'db.php';

// Retrieve the gallery ID and the new image data from the frontend
$gallery_id = $_POST['gallery_id'];
$imageData = json_decode($_POST['image_data'], true);

// Check if gallery_id and image data are provided
if (empty($gallery_id) || empty($imageData)) {
    echo json_encode([
        "status" => "error",
        "message" => "Gallery ID and image data are required."
    ]);
    exit;
}

// Check if the gallery ID exists in the database
$checkQuery = "SELECT gallery_data FROM gallery WHERE gallery_id = $1";
$checkResult = pg_query_params($connection, $checkQuery, [$gallery_id]);

if (!$checkResult || pg_num_rows($checkResult) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Gallery image not found."
    ]);
    exit;
}

// Fetch the current gallery data
$currentGalleryData = pg_fetch_assoc($checkResult);
$currentImageObject = json_decode($currentGalleryData['gallery_data'], true);

// Check if the incoming image data contains a file path
if (isset($imageData['file_path']) && !empty($imageData['file_path'])) {
    // No image processing needed, use the existing data
    $newImageObject = [
        'name' => $currentImageObject['name'],
        'type' => $currentImageObject['type'],
        'file_path' => $imageData['file_path'], // Use the provided file path
        'size' => $currentImageObject['size'],
    ];
} else {
    // Delete the existing image file from the uploads folder
    $existingFilePath = $currentImageObject['file_path'];
    if (file_exists($existingFilePath)) {
        unlink($existingFilePath);
    }

    // Process the new image
    if (!isset($imageData['name'], $imageData['size'], $imageData['type'], $imageData['data'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Incomplete new image data provided."
        ]);
        exit;
    }

    // Decode the new image data
    $newImageDataDecoded = base64_decode($imageData['data']);

    // Define the upload directory
    $uploadDir = 'uploads/';
    $newFilePath = $uploadDir . basename($imageData['name']);

    // Save the new image to the upload directory
    if (!file_put_contents($newFilePath, $newImageDataDecoded)) {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to save the new image."
        ]);
        exit;
    }

    // Create the new processed image object
    $newImageObject = [
        'name' => $imageData['name'],
        'type' => $imageData['type'],
        'file_path' => $newFilePath,
        'size' => $imageData['size'],
    ];
}

// Update the gallery data in the database
$updateQuery = "UPDATE gallery SET gallery_data = $1 WHERE gallery_id = $2";
$updateResult = pg_query_params($connection, $updateQuery, [json_encode($newImageObject), $gallery_id]);

if (!$updateResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to update gallery image: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Gallery image updated successfully."
]);
?>