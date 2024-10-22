<?php
// Include the database connection
include 'db.php';

// Retrieve the gallery ID from the frontend
$gallery_id = $_POST['gallery_id'];

// Check if gallery_id is provided
if (empty($gallery_id)) {
    echo json_encode([
        "status" => "error",
        "message" => "Gallery ID is required."
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

// Delete the existing image file from the uploads folder
$existingFilePath = $currentImageObject['file_path'];
if (file_exists($existingFilePath)) {
    unlink($existingFilePath);
}

// Delete the gallery entry from the database
$deleteQuery = "DELETE FROM gallery WHERE gallery_id = $1";
$deleteResult = pg_query_params($connection, $deleteQuery, [$gallery_id]);

if (!$deleteResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to delete gallery image: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Gallery image deleted successfully."
]);
?>
