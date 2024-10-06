<?php
function loadEnv($filePath) {
    if (!file_exists($filePath)) {
        throw new Exception("Env file not found: " . $filePath);
    }

    $env = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($env as $line) {
        if (strpos(trim($line), '#') === 0 || !strpos($line, '=')) {
            continue;
        }

        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        putenv("$name=$value");
    }
}

// Load the .env file
loadEnv(__DIR__ . '/.env');
