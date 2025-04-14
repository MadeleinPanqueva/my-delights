<?php
$host = 'localhost'; // o 'localhost'
$db = 'mydelights'; // tu base de datos
$username = 'root'; // o el usuario que uses en Workbench
$password = ''; // reemplaza con tu contraseña real

try {
    $conn = new mysqli($host, $username, $password, $db);
    if ($conn->connect_error) {
        echo json_encode(['error' => '❌ Error de conexión: ' . $conn->connect_error]);
        exit;
    } else{
        echo json_encode(['success' => '✅ Conexión exitosa a la base de datos.']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => '❌ Error: ' . $e->getMessage()]);
} finally {
    if (isset($conn) && $conn->ping()) {
        $conn->close();
    }
}
?>
