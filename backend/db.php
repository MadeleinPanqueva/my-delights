<?php
$host = 'localhost';
$db = 'mydelights';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $db);
if ($conn->connect_error) {
    die(json_encode(['error' => '❌ Error de conexión: ' . $conn->connect_error]));
}
?>
