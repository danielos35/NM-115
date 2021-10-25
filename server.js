import express from 'express';
import path from 'path';
import {Insertar_Registro, Consultar_Correo, Consultar_Contrasena,Consultar_Datos} from './js/db.js';

const app=express();
const dirname=path.resolve();

app.use(express.static("./"));


app.listen('3000', function(){
    console.log('Servidor iniciado');
});


app.get("/", function(peticion,respuesta){
    respuesta.sendFile(dirname+"/registro.html");
});
// Agregar Registros a la base de datos
app.get('/agregar/:nombre/:apellidos/:telefono/:correo/:password', function(peticion,
    respuesta){
        let nombre=peticion.params.nombre;
        let apellidos=peticion.params.apellidos;
        let telefono=peticion.params.telefono;
        let correo=peticion.params.correo;
        let password=peticion.params.password;
        //Enviando a la base de datos
        Insertar_Registro(nombre,apellidos,telefono,correo,password);
        console.log("Ingresando a URl agregar")
        //respuesta=console.log("Guardado en base de batos")
        setTimeout(function(){respuesta.redirect('/registro.html')},7000);
});


app.get("/", function(peticion,respuesta){
    respuesta.sendFile(dirname+"/login.html");
});

app.get('/consulta/:correo/:password',function(peticion,respuesta){
    let correo=peticion.params.correo;
    let password=peticion.params.password;
    let Registros=Consultar_Datos();
    //let Correos=Consultar_Correo(correo);
    //let Contrasenas=Consultar_Contrasena(password);
    console.log(Registros);
    //console.log(typeof(Registros));
    //console.log(Registros.length);
    //console.log(Object.values(Registros[0])[4])

    //console.log(Contrasenas);

    
});
