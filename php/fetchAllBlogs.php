<?php
// Include the database connection
include 'db.php';

// Fetch all blogs from the blogs table
$fetchQuery = "SELECT blog_id, blog_data, created_at FROM blogs";
$fetchResult = pg_query($connection, $fetchQuery);

// Check if the query execution was successful
if (!$fetchResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch blogs: " . pg_last_error()
    ]);
    exit;
}

// Fetch all rows as an associative array
$blogs = [];
while ($row = pg_fetch_assoc($fetchResult)) {
    $blogs[] = [
        "blog_id" => $row['blog_id'],
        "blog_data" => json_decode($row['blog_data'], true),
        "created_at" => $row['created_at']
    ];
}

// Return the list of blogs in JSON format
echo json_encode([
    "status" => "success",
    "data" => $blogs
]);
?>
