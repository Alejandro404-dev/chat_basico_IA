import { jsPDF } from "jspdf";

export function generarPdf(contenido: string, titulo: string) {

    // 1- pdf en blanco
    const pdf = new jsPDF()
    // 2 - le damos margen respecto al ancho, para que no se desborde el texto
    const maxWidth = pdf.internal.pageSize.getWidth() - 20
    // 3 - agregamos el texto con el formato
    pdf.text(contenido, 10, 20, { maxWidth})
    // 4- guardamos el pdf con el titulo
    pdf.save(`${titulo}.pdf`)

}
