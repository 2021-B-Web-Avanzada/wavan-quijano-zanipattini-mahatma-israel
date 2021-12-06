const inquirer = require("inquirer");

async function main(){
    try{
        const respuesta = await inquirer
            .prompt([
                {
                    type: "input",
                    name: "apellido",
                    message: "Ingrese su nombre:"
                },
                {
                    type: "input",
                    name: "edad",
                    message: "Ingrese su edad:"
                }
            ]);
        console.log("Respuesta:", respuesta);
    } catch (error){
        console.error(error);
    }
}

main()