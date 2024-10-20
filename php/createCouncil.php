<?php
// Include the database connection
include 'db.php';

// Retrieve data from the frontend
$council_name = $_POST['council_name'];

// Check if council_name is provided
if (empty($council_name)) {
    echo json_encode([
        "status" => "error",
        "message" => "Council name is required."
    ]);
    exit;
}

// Set council_data as an empty array
$council_data = [];

// Generate an 8-character council ID
$council_id = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);

// Insert the new council into the councils table
$query = "INSERT INTO councils (council_id, council_name, council_data) VALUES ($1, $2, $3)";
$result = pg_query_params($connection, $query, [$council_id, $council_name, json_encode($council_data)]);

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
    "message" => "Council created successfully.",
]);
?>
