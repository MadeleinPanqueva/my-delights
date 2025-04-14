<?php
include 'db.php';

$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

$clientes = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }
}

echo json_encode($clientes);

$conn->close();
?>
