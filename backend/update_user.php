<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

// Verificar si el usuario existe y obtener sus datos actuales
$checkSql = "SELECT * FROM usuarios WHERE id = ?";
$checkStmt = $conn->prepare($checkSql);
if (!$checkStmt) {
    echo json_encode(['error' => '❌ Error en la preparación: ' . $conn->error]);
    exit;
}

$checkStmt->bind_param("i", $data->id);
$checkStmt->execute();
$result = $checkStmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['error' => '❌ Usuario no encontrado por id']);
    $checkStmt->close();
    exit;
}

$usuarioActual = $result->fetch_assoc();
$checkStmt->close();

// Usar los datos nuevos si existen, si no, mantener los actuales
$nombre = isset($data->nombre) ? $data->nombre : $usuarioActual['nombre'];
$cedula = isset($data->cedula) ? $data->cedula : $usuarioActual['cedula'];
$sexo = isset($data->sexo) ? $data->sexo : $usuarioActual['sexo'];
$fecha_nacimiento = isset($data->fecha_nacimiento) ? $data->fecha_nacimiento : $usuarioActual['fecha_nacimiento'];
$direccion = isset($data->direccion) ? $data->direccion : $usuarioActual['direccion'];
$telefono = isset($data->telefono) ? $data->telefono : $usuarioActual['telefono'];
$correo = isset($data->correo) ? $data->correo : $usuarioActual['correo'];
$contrasena = isset($data->contrasena) ? $data->contrasena : $usuarioActual['contrasena'];
$tipo_usuario = isset($data->tipo_usuario) ? $data->tipo_usuario : $usuarioActual['tipo_usuario'];

// Puedes agregar cifrado solo si envían nueva contraseña
// if (isset($data->contrasena)) {
//     $contrasena = password_hash($data->contrasena, PASSWORD_DEFAULT);
// }

$sql = "UPDATE usuarios SET 
    nombre = ?, 
    cedula = ?, 
    sexo = ?, 
    fecha_nacimiento = ?, 
    direccion = ?, 
    telefono = ?, 
    correo = ?, 
    contrasena = ?, 
    tipo_usuario = ?
    WHERE id = ?";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['error' => '❌ Error en la preparación: ' . $conn->error]);
    exit;
}

$stmt->bind_param(
    "sssssssssi",
    $nombre,
    $cedula,
    $sexo,
    $fecha_nacimiento,
    $direccion,
    $telefono,
    $correo,
    $contrasena,
    $tipo_usuario,
    $data->id
);

if ($stmt->execute()) {
    echo json_encode(['message' => '✅ Usuario actualizado']);
} else {
    echo json_encode(['error' => '❌ Error al actualizar: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
