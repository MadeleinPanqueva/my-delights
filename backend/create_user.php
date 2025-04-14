<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$sql = "INSERT INTO usuarios (nombre, cedula, sexo, fecha_nacimiento, direccion, telefono, correo, contrasena, tipo_usuario, fecha_registro)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['error' => '❌ Error en la preparación: ' . $conn->error]);
    exit;
}

$stmt->bind_param(
    "ssssssssss",
    $data->name,          // name -> nombre
    $data->cedula,        // cedula
    $data->sexo,          // sexo
    $data->nacimiento,    // fecha_nacimiento
    $data->direccion,     // direccion
    $data->phone,         // telefono
    $data->email,         // email -> correo
    $data->password,      // password -> contrasena
    $data->customerType,   // customerType -> tipo_usuario
    $data->createdAt      // createdAt -> fecha_registro
);

if ($stmt->execute()) {
    echo json_encode(['message' => '✅ Usuario registrado']);
} else {
    echo json_encode(['error' => '❌ Error al registrar: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
