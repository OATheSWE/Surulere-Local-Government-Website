<?php
// Include the database connection
include 'db.php';

// Fetch all adverts from the adverts table
$fetchQuery = "SELECT advert_id, advert_data FROM adverts";
$fetchResult = pg_query($connection, $fetchQuery);

// Check if the query execution was successful
if (!$fetchResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch adverts: " . pg_last_error()
    ]);
    exit;
}

// Fetch all rows as an associative array
$adverts = [];
while ($row = pg_fetch_assoc($fetchResult)) {
    $adverts[] = [
        "advert_id" => $row['advert_id'],
        "advert_data" => json_decode($row['advert_data'], true)
    ];
}

// Return the list of adverts in JSON format
echo json_encode([
    "status" => "success",
    "adverts" => $adverts
]);
?>
