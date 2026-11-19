import { jsPDF } from "jspdf";

export const generarPDF = (datos) => {
    const doc = new jsPDF();
    let y = 20; // Variable para controlar la altura del texto

    // Encabezado
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Formato de Denuncia por Ciberacoso", 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Contigo · Documento de apoyo para presentar una denuncia", 20, y);
    y += 10;
    doc.text("Folio: ______________ (lo asigna la autoridad)", 20, y);
    y += 10;
    doc.text(`Fecha de elaboración: ${new Date().toLocaleDateString()}`, 20, y);
    y += 15;

    // SECCIÓN 1
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("1. Datos de quien presenta la denuncia", 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    doc.text(`Nombre completo: ${datos.nombre}`, 20, y); y += 6;
    doc.text(`Edad: ${datos.edad || 'No especificada'} | Teléfono: ${datos.telefono || 'No registrado'}`, 20, y); y += 6;
    doc.text(`Correo: ${datos.correo || 'No registrado'}`, 20, y); y += 6;
    doc.text(`Estado y Municipio: ${datos.estadoMunicipio || 'No especificado'}`, 20, y); y += 6;
    doc.text(`¿Es menor de edad?: ${datos.esMenor ? 'Sí' : 'No'}`, 20, y); y += 6;
    
    if (datos.esMenor) {
        doc.text(`Tutor: ${datos.nombreTutor} | Tel: ${datos.telefonoTutor}`, 20, y); y += 6;
    }
    y += 5;

    // SECCIÓN 2
    doc.setFont("helvetica", "bold");
    doc.text("2. Datos de la persona denunciada", 20, y); y += 8;
    doc.setFont("helvetica", "normal");
    
    doc.text(`Alias: ${datos.alias || 'No especificado'}`, 20, y); y += 6;
    doc.text(`Enlace: ${datos.enlacePerfil || 'No especificado'}`, 20, y); y += 6;
    doc.text(`Relación: ${datos.relacion || 'No especificada'}`, 20, y); y += 10;

    // SECCIÓN 3
    doc.setFont("helvetica", "bold");
    doc.text("3. Hechos", 20, y); y += 8;
    doc.setFont("helvetica", "normal");
    
    doc.text(`Fecha de inicio: ${datos.fechaInicio}`, 20, y); y += 6;
    doc.text(`Plataforma: ${datos.plataforma} | Frecuencia: ${datos.frecuencia}`, 20, y); y += 6;
    
    // Formatear el tipo de conducta (que es un array)
    const conductas = Array.isArray(datos.tipoConducta) ? datos.tipoConducta.join(', ') : datos.tipoConducta;
    const textConductas = doc.splitTextToSize(`Tipo de conducta: ${conductas || 'No especificado'}`, 170);
    doc.text(textConductas, 20, y); 
    y += (textConductas.length * 6) + 2;

    // Descripción con salto de línea automático
    doc.text("Descripción de los hechos:", 20, y); y += 6;
    const splitDesc = doc.splitTextToSize(datos.descripcion, 170);
    doc.text(splitDesc, 20, y);
    y += (splitDesc.length * 6) + 10;

    // SECCIÓN 4 (Simulada para las imágenes)
    doc.setFont("helvetica", "bold");
    doc.text("4. Evidencias", 20, y); y += 8;
    doc.setFont("helvetica", "normal");
    doc.text("Se anexan las capturas de pantalla seleccionadas en la aplicación.", 20, y); y += 15;

    // SECCIÓN 6 (Declaración)
    doc.setFont("helvetica", "bold");
    doc.text("6. Declaración y firma", 20, y); y += 8;
    doc.setFont("helvetica", "normal");
    doc.text("Declaro bajo protesta de decir verdad que la información presentada es verdadera.", 20, y); y += 15;
    
    doc.text("_________________________________________________", 20, y); y += 5;
    doc.text("Nombre y firma de quien presenta la denuncia", 20, y); 

    // Guardar PDF
    doc.save(`Contigo_Denuncia_${datos.nombre.replace(/\s+/g, '_')}.pdf`);
};