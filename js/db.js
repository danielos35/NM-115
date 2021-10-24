// Crear la conexion 
// var mysql=require('mysql');
import mysql from 'mysql'

var conexion=mysql.createConnection({
        host: 'localhost',
        database: 'BD_NereaMessis',
        user: 'root',
        password: '12345'
    });
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexión exitosa')
    }});
// Insertar Registro
function Insertar_Registro(nombre,apellidos,telefono,correo,password){
    conexion.query("INSERT INTO Usuarios_Registrados(Nombre, Apellido, Telefono, Correo, Contraseña) VALUES('"+nombre+"', '"+apellidos+"', '"+telefono+"','"+correo+"','"+password+"')", function(error,resultados){
        if(error){
            throw error;
        }else{
            console.log("Registro exitoso");
        }});
    
}

function Consultar_Registro(){
    conexion.query("SELECT * FROM Usuarios_Registrados WHERE nombre='Maik'", function(error,resultados){
    if(error){
        throw error;
    }else{
        console.log(resultados);
    }        
});
}
export{Insertar_Registro, Consultar_Registro}
// conexion.end();