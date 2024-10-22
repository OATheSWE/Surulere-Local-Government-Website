<?php
// Include the database connection
include 'db.php';

// Fetch all gallery items from the gallery table
$fetchQuery = "SELECT gallery_id, gallery_data FROM gallery";
$fetchResult = pg_query($connection, $fetchQuery);

// Check if the query execution was successful
if (!$fetchResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch gallery items: " . pg_last_error()
    ]);
    exit;
}

// Fetch all rows as an associative array
$galleryItems = [];
while ($row = pg_fetch_assoc($fetchResult)) {
    $galleryItems[] = [
        "gallery_id" => $row['gallery_id'],
        "gallery_data" => json_decode($row['gallery_data'], true)
    ];
}

// Return the list of gallery items in JSON format
echo json_encode([
    "status" => "success",
    "gallery" => $galleryItems
]);
?>
