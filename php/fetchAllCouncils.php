<?php
// Include the database connection
include 'db.php';

// Fetch all councils from the database
$query = "SELECT * FROM councils";
$result = pg_query($connection, $query);

// Check if the query was successful
if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch councils: " . pg_last_error()
    ]);
    exit;
}

// Initialize an array to store councils
$councils = [];

// Fetch each council and store it in the array
while ($row = pg_fetch_assoc($result)) {
    // Decode the council_data column
    if (isset($row['council_data'])) {
        $row['council_data'] = json_decode($row['council_data'], true);
    }
    $councils[] = $row;
}

// Return the councils as a JSON response
echo json_encode([
    "status" => "success",
    "councils" => $councils
]);
?>
