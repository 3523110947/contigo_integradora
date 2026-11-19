export const cursosData = [
  {
    id: "curso_1",
    titulo: "Fundamentos del Ciberacoso",
    nivel: "Inicial",
    descripcion: "Aprende a identificar las señales y proteger tu entorno.",
    modulos: [
      {
        id: "mod_1_1",
        titulo: "¿Qué es el ciberacoso?",
        lecciones: [
          { id: "lec_1_1_1", titulo: "Definiendo el acoso digital", contenido: "El ciberacoso es cualquier comportamiento repetido y hostil dirigido hacia una persona a través de medios digitales..." },
          { id: "lec_1_1_2", titulo: "Las formas más comunes", contenido: "Incluye mensajes ofensivos, suplantación de identidad, difusión de imágenes sin consentimiento y exclusión social..." }
        ],
        quiz: [
          { pregunta: "¿Cuál de estos NO es ciberacoso?", opciones: ["Enviar mensajes ofensivos", "Crear un perfil falso", "Discutir con un amigo por chat"], correcta: 2 }
        ]
      }
    ],
    examenFinal: [
      { pregunta: "¿El ciberacoso solo ocurre en redes sociales?", opciones: ["Verdadero", "Falso"], correcta: 1 }
    ]
  },
  {
    id: "curso_2",
    titulo: "Herramientas de Defensa",
    nivel: "Intermedio",
    descripcion: "Privacidad, contraseñas y recolección de pruebas.",
    modulos: []
  },
  {
    id: "curso_3",
    titulo: "Acción Legal y Denuncia",
    nivel: "Avanzado",
    descripcion: "Cómo denunciar y reportar en plataformas.",
    modulos: []
  }
];