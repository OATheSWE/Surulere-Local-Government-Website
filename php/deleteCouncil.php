<?php
// Include the database connection
include 'db.php';

// Retrieve the council_id from the request
$council_id = $_POST['council_id'];

// Check if council_id is provided
if (empty($council_id)) {
    echo json_encode([
        "status" => "error",
        "message" => "Council ID is required."
    ]);
    exit;
}

// Check if the council exists in the database
$checkQuery = "SELECT * FROM councils WHERE council_id = $1";
$checkResult = pg_query_params($connection, $checkQuery, [$council_id]);

if (!$checkResult || pg_num_rows($checkResult) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Council not found."
    ]);
    exit;
}

// Delete the council from the database
$deleteQuery = "DELETE FROM councils WHERE council_id = $1";
$deleteResult = pg_query_params($connection, $deleteQuery, [$council_id]);

if (!$deleteResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to delete council: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Council deleted successfully."
]);
?>
