var _this = this;
var user = {
    nombre: "Mahatma",
    apellido: "Quijano",
    casado: 0,
    sueldo: 11.2,
    estado: "AC",
    imprimirUsuario: function (mensaje) {
        return "El mensaje es: " + mensaje;
    },
    calcularImpuesto: function (impuesto) {
        return _this.sueldo + _this.sueldo * impuesto;
    },
    estadoActual: function () {
        switch (_this.estado) {
            case "AC":
                return "AP";
            case "IN":
                return "AF";
            case "BN":
                return "AT";
        }
    }
};
