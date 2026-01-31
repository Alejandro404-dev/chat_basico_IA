import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";


export function generarWord(contenido: string, titulo: string) {

    // - 1 creamos un odcumento
    const docx = new Document({
        // 2 - definimos las distintas" secciones"
        sections: [
            {
                // 3 - dentro de cada seccion dividimos el contenido del mensaje en linea usando split
                children: contenido.split("\n").map((linea) =>
                    // 4- para cada linea creamos un nuevo parrafo con un TextRun
                    new Paragraph({
                        // - 5 vemos si cada fragmento del texto tiene algun estilo propio (cursiva,negrita, etc...).
                        // ytilizamos un arreglo porque podriamos tener varios Textruns
                        children: [
                            new TextRun(linea)
                        ],
                        // 6 - configuramos el espacion de cada parrafo. 100 es aprox 7px
                        spacing: { after : 100}
                    })
                )
            }
        ]

    })
    // 7 - Usamos packer para c convertit el doc en un blob y lo guardamos con file-saver
    Packer.toBlob(docx).then((blob)=> {saveAs(blob, `${titulo}.docx`)})

}