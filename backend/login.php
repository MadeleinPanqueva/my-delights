<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

// Consulta solo por el email
$sql = "SELECT * FROM usuarios WHERE correo = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => '❌ Error en la preparación: ' . $conn->error]);
    exit;
}

$stmt->bind_param("s", $data->correo);
$stmt->execute();
$result = $stmt->get_result();

$usuario = $result->fetch_assoc();

if ($usuario && $data->contrasena === $usuario['contrasena']) {  // Compara contraseñas en texto plano
    echo json_encode(['success' => true, 'user' => $usuario]);
} else {
    echo json_encode(['success' => false, 'message' => '❌ Credenciales incorrectas', 'user' => $usuario]);
}

$stmt->close();
$conn->close();
?>
