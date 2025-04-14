<?php
// UserService.php

require_once '../backend/db.php'; // Asegúrate de tener conexión PDO en este archivo

class UserService {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function createUser($data) {
        $sql = "INSERT INTO usuarios (nombre, cedula, sexo, fecha_nacimiento, direccion, telefono, correo, contrasena, tipo_usuario, creado_en)
                VALUES (:nombre, :cedula, :sexo, :fecha_nacimiento, :direccion, :telefono, :correo, :contrasena, :tipo_usuario, :creado_en)";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            ':nombre' => $data['name'],
            ':cedula' => $data['cedula'],
            ':sexo' => $data['sexo'],
            ':fecha_nacimiento' => $data['nacimiento'],
            ':direccion' => $data['direccion'],
            ':telefono' => $data['phone'],
            ':correo' => $data['email'],
            ':contrasena' => $data['password'], // Recomendado: usar password_hash
            ':tipo_usuario' => $data['customerType'],
            ':creado_en' => $data['createdAt']
        ]);
    }

    public function loginUser($correo, $contrasena) {
        $sql = "SELECT * FROM usuarios WHERE correo = :correo AND contrasena = :contrasena";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':correo' => $correo,
            ':contrasena' => $contrasena // Mejor usar password_verify si están hasheadas
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateUser($data) {
        $sql = "UPDATE usuarios SET 
                    nombre = :nombre,
                    cedula = :cedula,
                    sexo = :sexo,
                    fecha_nacimiento = :fecha_nacimiento,
                    direccion = :direccion,
                    telefono = :telefono,
                    correo = :correo,
                    contrasena = :contrasena,
                    tipo_usuario = :tipo_usuario
                WHERE id = :id";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            ':id' => $data['id'],
            ':nombre' => $data['nombre'],
            ':cedula' => $data['cedula'],
            ':sexo' => $data['sexo'],
            ':fecha_nacimiento' => $data['fecha_nacimiento'],
            ':direccion' => $data['direccion'],
            ':telefono' => $data['telefono'],
            ':correo' => $data['correo'],
            ':contrasena' => $data['contrasena'],
            ':tipo_usuario' => $data['tipo_usuario']
        ]);
    }

    public function deleteUser($id) {
        $sql = "DELETE FROM usuarios WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([':id' => $id]);
    }
}