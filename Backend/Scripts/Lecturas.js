    
    
    document.getElementById("cargar_libs").onclick = loadfile;
    document.getElementById("cargar_aut").onclick = loadfile1;
    document.getElementById("cargar_user").onclick = loadfile2;
    let archivo;


    



    window.addEventListener('load',function(){
        let fileinput = document.getElementById("archivo");
        fileinput.addEventListener('change',function(event){
            archivo = event.target.files[0]
        })
    })
    function loadfile(){
        let reader= new FileReader()
        reader.readAsText(archivo)
        reader.addEventListener('load',enviar,false)

    }

    function loadfile1(){
        let reader= new FileReader()
        reader.readAsText(archivo)
        reader.addEventListener('load',enviar1,false)

    }

    function loadfile2(){
        let reader= new FileReader()
        reader.readAsText(archivo)
        reader.addEventListener('load',enviar2,false)

    }

    async function enviar(e){
        var text = e.target.result;
        var jsonData = JSON.parse(text);
        //var x= document.getElementById("content");
        //x.innerHTML+=text
        //console.log(text)
        console.log(jsonData)
        for (let index = 0; index < jsonData.length; index++) {
            console.log("__________ DATOS DEL LIBRO "+(index+1)+" __________")
            console.log(jsonData[index].isbm);
            console.log(jsonData[index].nombre_autor);
            console.log(jsonData[index].nombre_libro);
            console.log(jsonData[index].cantidad);
            console.log(jsonData[index].fila);
            console.log(jsonData[index].columna);
            console.log(jsonData[index].paginas);
            console.log(jsonData[index].categoria);
            
        }
        const arbol_binario = new Arbol_Binario()
            arbol_binario.agregar("AnaFrank")
            arbol_binario.agregar("AliceKellen")
            arbol_binario.agregar("JohnleCarré")
            arbol_binario.agregar("StephenieMeyer")
            arbol_binario.agregar("PauloCoelho")
            arbol_binario.agregar("MarthaCerda")

            console.log("Metodo preorden:\n")
            arbol_binario.pre_orden()

            console.log("****************\nMetodo inorden:\n")
            arbol_binario.inorden()

            console.log("****************\nMetodo postorden:\n")
            arbol_binario.post_orden()
        //arbol_binario.agregar()
        alert("Carga de libros exitosa :)")
        
    }

    async function enviar1(e){
        var text = e.target.result;
        var jsonData = JSON.parse(text);
        //var x= document.getElementById("content");
        //x.innerHTML+=text
        //console.log(text)
        console.log(jsonData)
        for (let index = 0; index < jsonData.length; index++) {
            console.log("__________ DATOS DEL AUTOR "+(index+1)+" __________")
            console.log(jsonData[index].dpi);
            console.log(jsonData[index].nombre_autor);
            console.log(jsonData[index].correo);
            console.log(jsonData[index].telefono);
            console.log(jsonData[index].direccion);
            console.log(jsonData[index].biografia);
            
        }
        alert("Carga de autores exitosa :)")
    }

    async function enviar2(e){
        var text = e.target.result;
        var jsonData = JSON.parse(text);
        //var x= document.getElementById("content");
        //x.innerHTML+=text
        //console.log(text)
        console.log(jsonData)
        for (let index = 0; index < jsonData.length; index++) {
            console.log("__________ DATOS DEL USUARIO "+(index+1)+" __________")
            console.log(jsonData[index].dpi);
            console.log(jsonData[index].nombre_completo);
            console.log(jsonData[index].nombre_usuario);
            console.log(jsonData[index].correo);
            console.log(jsonData[index].rol);
            console.log(jsonData[index].contrasenia);
            console.log(jsonData[index].telefono);
            
        }
        alert("Carga de usuarios exitosa :)")
        
    }

    
    
    
    
    