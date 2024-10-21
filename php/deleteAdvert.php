<?php
// Include the database connection
include 'db.php';

// Retrieve the advert ID from the frontend
$advert_id = $_POST['advert_id'];

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

// Delete the existing image file from the uploads folder
$existingFilePath = $currentImageObject['file_path'];
if (file_exists($existingFilePath)) {
    unlink($existingFilePath);
}

// Delete the advert entry from the database
$deleteQuery = "DELETE FROM adverts WHERE advert_id = $1";
$deleteResult = pg_query_params($connection, $deleteQuery, [$advert_id]);

if (!$deleteResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to delete advert: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Advert deleted successfully."
]);
?>
