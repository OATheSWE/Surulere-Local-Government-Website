<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Accept, X-Requested-With");

// Load the .env file
require_once 'env.php';

// Get the environment (local or server)
$environment = getenv('ENVIRONMENT');

// Set the DB connection details based on the environment
if ($environment === 'local') {
    $host = getenv('DB_HOST_LOCAL');
    $database = getenv('DB_DATABASE_LOCAL');
    $user = getenv('DB_USER_LOCAL');
    $password = getenv('DB_PASSWORD_LOCAL');
} else {
    $host = getenv('DB_HOST_SERVER');
    $database = getenv('DB_DATABASE_SERVER');
    $user = getenv('DB_USER_SERVER');
    $password = getenv('DB_PASSWORD_SERVER');
}

// Establish connection
$connection = pg_connect("host=$host dbname=$database user=$user password=$password");

// Check connection
if (!$connection) {
    die("Connection failed: " . pg_last_error());
}

// $connection is now ready for database interactions
?>
