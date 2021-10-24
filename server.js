import express from 'express';
import {Insertar_Registro, Consultar_Registro} from './js/db.js';
import path from 'path';

const app=express();
const dirname=path.resolve();

app.use(express.static("./"));


app.listen('3000', function(){
    console.log('Servidor iniciado');
});


app.get("/", function(peticion,respuesta){
    respuesta.sendFile(dirname+"/registro.html");
});

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
        setTimeout(function(){respuesta.redirect('/registro.html')},10000);
    });