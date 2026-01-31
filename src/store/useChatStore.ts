import { create } from "zustand";
import type { Mensaje } from "../types/mensaje";

type EstadoChat = {
    mensajes:Mensaje []
    agregarMensaje:(mensaje:Mensaje) => void
}


export const useChatStore = create <EstadoChat> ((set) =>({

    //estado inicial de - IndexVentanaChat
    mensajes: [{
        id: 1,
        rol:"bot",
        texto: "Hola, soy tu asistente inteligente, te puedo ayudar en algo?"

        }
    ],

    agregarMensaje: (mensaje)=>
        set((state)=>({
            mensajes: [
                ...state.mensajes,
                mensaje
            ]
        })),

}))