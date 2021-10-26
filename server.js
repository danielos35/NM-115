import express from 'express';
import path from 'path';
import {Insertar_Registro,Consultar_Datos} from './js/db.js';

const app=express();
const dirname=path.resolve();

app.use(express.static("./"));


app.listen('4000', function(){
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

app.set()

app.get('/consulta/:correo/:password/:validar_captcha',function(peticion,respuesta){
    let correoingresado=peticion.params.correo;
    let contrasenaingresada=peticion.params.password;
    let captcha=peticion.params.validar_captcha;
    let result=Consultar_Datos();
    //let Correos=Consultar_Correo(correo);
    //let Contrasenas=Consultar_Contrasena(password);
    const Registros = Object.values(JSON.parse(JSON.stringify(result)));
    console.log(Registros);

    let flag_usuario=false;
    let flag_captcha=false; 
    let flag_contrasena=false;
    let Validacion=false;

    Registros.forEach(function(usuario){
        if(usuario.Correo==correoingresado){
            flag_usuario=true;
            if(usuario['Contraseña']==contrasenaingresada){
                flag_contrasena=true;
            }
        }
        console.log(usuario.Correo)
    });
    
    if (captcha=true){
        flag_captcha=true;
    }
    if(flag_usuario==false){
        console.log("Usuario no registrado")
    }
    if(flag_usuario==true && flag_contrasena==false){
        console.log("Contraseña incorrecta")
    }
    if(flag_usuario==true && flag_contrasena==true && flag_captcha==false){
        console.log("Error en el CAPTCHA")
    }

    if(flag_usuario==true && flag_contrasena==true && flag_captcha==true){
         Validacion=true;
        console.log("Bienvenido")

    }
    setTimeout(function(){respuesta.redirect('/login.html')},5000);

    
});
