<?php
// Include the database connection
include 'db.php';

// Retrieve the blog ID from the frontend
$blog_id = $_POST['blog_id'];

// Check if the blog_id is provided
if (empty($blog_id)) {
    echo json_encode([
        "status" => "error",
        "message" => "Blog ID is required."
    ]);
    exit;
}

// Check if the blog exists in the database
$checkQuery = "SELECT * FROM blogs WHERE blog_id = $1";
$checkResult = pg_query_params($connection, $checkQuery, [$blog_id]);

if (!$checkResult || pg_num_rows($checkResult) === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Blog not found."
    ]);
    exit;
}

// Get the current blog data
$currentBlog = pg_fetch_assoc($checkResult);
$currentBlogData = json_decode($currentBlog['blog_data'], true);

// Delete the associated image file if it exists
if (isset($currentBlogData['image']['file_path'])) {
    unlink($currentBlogData['image']['file_path']);
}

// Delete the blog from the blogs table
$deleteQuery = "DELETE FROM blogs WHERE blog_id = $1";
$deleteResult = pg_query_params($connection, $deleteQuery, [$blog_id]);

if (!$deleteResult) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to delete blog: " . pg_last_error()
    ]);
    exit;
}

// Return a success response
echo json_encode([
    "status" => "success",
    "message" => "Blog deleted successfully."
]);
?>
