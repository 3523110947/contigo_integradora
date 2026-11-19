export const pedirPermisoYNotificar = (titulo, cuerpo) => {
    if (!("Notification" in window)) {
        console.log("Este navegador no soporta notificaciones");
        return;
    }

    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            // Si el Service Worker está activo, le mandamos la notificación
            if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    action: 'mostrarNotificacion',
                    titulo: titulo,
                    cuerpo: cuerpo
                });
            } else {
                // Respaldo por si el SW aún no carga
                new Notification(titulo, {
                    body: cuerpo,
                    icon: "/logo.png" // Asegúrate de tener el logo en public
                });
            }
        }
    });
};

// Función específica para el botón de pánico
export const notificarEmergencia = () => {
    pedirPermisoYNotificar(
        "Espacio Seguro Activado", 
        "Iniciando guía de acción inmediata y registro de incidente..."
    );
};