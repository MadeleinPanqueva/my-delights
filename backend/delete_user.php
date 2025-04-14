<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$sql = "DELETE FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['error' => '❌ Error en la preparación: ' . $conn->error]);
    exit;
}

$stmt->bind_param("i", $data->id);

if ($stmt->execute()) {
    echo json_encode(['message' => '✅ Usuario eliminado']);
} else {
    echo json_encode(['error' => '❌ Error al eliminar: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
