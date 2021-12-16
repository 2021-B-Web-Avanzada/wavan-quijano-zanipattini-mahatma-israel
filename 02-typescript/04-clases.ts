class Persona {
    public nombre: string;
    public apellido: string;
    // Propiedades estaticas
    static nombreReferencial: string = "Humano";
    protected nombreYApellido = ""; // DuckTyping -> string
    // Constructor
    constructor(
        nombreParametro: string,
        apellidoParametro: string,
    ) {
        this.nombre = nombreParametro;
        this.apellido = apellidoParametro;
        this.nombreYApellido = nombreParametro + " " + apellidoParametro;
    }
}

class Usuario extends Persona {
    constructor(
        nombreParametro: string,
        apellidoParametro: string,
        public cedula: string,  // Modificador de acceso
        public estadoCivil: string
    ) {
        super(nombreParametro, apellidoParametro);
    }
}

const mahatma = new Usuario(
    "Mahatma",
    "Quijano",
    "1724466543",
    "Soltero"
);

mahatma.nombre;
mahatma.apellido;
mahatma.cedula;
mahatma.estadoCivil;