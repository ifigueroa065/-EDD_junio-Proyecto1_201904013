    
    
    document.getElementById("cargar_libs").onclick = loadfile;
    document.getElementById("cargar_aut").onclick = loadfile1;
    document.getElementById("cargar_user").onclick = loadfile2;
    
    document.getElementById("logearse").onclick= logear;
    document.getElementById("ver_pendientes").onclick= ver_cola;
    document.getElementById("ver_usuarios").onclick= ver_circular;
    document.getElementById("ver_fantasia").onclick= cargar;

    document.getElementById("bubblesort").onclick= mostrarbubblesort;
    document.getElementById("quicksort").onclick= mostrarquicksort;

    let archivo;


    //DECLARANDO ESTRUCTURAS GLOBALES
    var Autores_BST = new Arbol_Binario()
    var UserList = new ListaDobleCircular()
    var FantasyBooks = new L_Ortogonal()
    var ThrillerBooks = new M_Dispersa()
    var C_Pendientes= new Cola_Pendientes()
    
    
    
    //DECLARANDO ADMINISTRADOR POR DEFECTO
    UserList.add(2354168452525,"WIlfred Perez","Wilfred","admin@catbock.com","Administrador","123","+502 (123) 123-4567")
   

    //LECTURAS DE ARCHIVOS

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
            console.log(jsonData[index].isbn);
            console.log(jsonData[index].nombre_autor);
            console.log(jsonData[index].nombre_libro);
            console.log(jsonData[index].cantidad);
            console.log(jsonData[index].fila);
            console.log(jsonData[index].columna);
            console.log(jsonData[index].paginas);
            console.log(jsonData[index].categoria);

            

            
            if (jsonData[index].categoria=="Fantasia") {
                //si es Fantasía lo envío a ortogonal
                FantasyBooks.agregarnodo(jsonData[index].fila,
                    jsonData[index].columna,
                    jsonData[index].isbn,
                    jsonData[index].nombre_autor,
                    jsonData[index].nombre_libro,
                    jsonData[index].cantidad,
                    jsonData[index].paginas,
                    jsonData[index].categoria
                )
                

            } 
            if(jsonData[index].categoria=="Thriller"){
                // si es Thriller lo envío a la dispersa
                ThrillerBooks.insert(jsonData[index].fila,
                    jsonData[index].columna,
                    jsonData[index].isbn,
                    jsonData[index].nombre_autor,
                    jsonData[index].nombre_libro,
                    jsonData[index].cantidad,
                    jsonData[index].paginas,
                    jsonData[index].categoria
                )
            }
            
        }
        
        //FantasyBooks.Mostrar()
        //FantasyBooks.graficar()

        //ThrillerBooks.printCols()
        //ThrillerBooks.graph_matrix()


            

            
        //Autores_BST.agregar()
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
            Autores_BST.agregar(jsonData[index].dpi,
                jsonData[index].nombre_autor,
                jsonData[index].correo,
                jsonData[index].direccion,
                jsonData[index].telefono,
                jsonData[index].biografia)
        }

        console.log("Metodo preorden:\n")
        Autores_BST.pre_orden()
        d3.select("#lienzo").graphviz()
            .width(1200)
            .height(500)
            .renderDot(Autores_BST.obtener_codigo_Graphviz())
        
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
            UserList.add(jsonData[index].dpi,
                jsonData[index].nombre_completo,
                jsonData[index].nombre_usuario,
                jsonData[index].correo,
                jsonData[index].rol,
                jsonData[index].contrasenia,
                jsonData[index].telefono
                )
        }
        UserList.mostrar()

        alert("Carga de usuarios exitosa :)")
        
    }


    function logear() {
        //console.log("esta es la lista de usuarios actual")
        //UserList.mostrar()

        var user  =document.getElementById("l_usuario").value
        var pass = document.getElementById("l_pass").value
        console.log("user :"+ user + " pass : "+ pass )
        //VALIDACIONES

        if (UserList.isExiste(user,pass)==true) {
            //si existe verifico el rol
            if (UserList.getRol(user)=="Administrador") {
                document.getElementById("ADMINISTRADOR").style.display="block";
                document.getElementById("LOGIN").style.display = "none";
                document.getElementById("l_usuario").value=""
                document.getElementById("l_pass").value=""
            } else {
                document.getElementById("USUARIO").style.display="block";
                document.getElementById("LOGIN").style.display = "none";
                document.getElementById("l_usuario").value=""
                document.getElementById("l_pass").value=""
            }
        } else {    
            alert("Credenciales Incorrectas")
            document.getElementById("l_usuario").value=""
            document.getElementById("l_pass").value=""
        }   


       


        
    }

    function ver_cola() {
        C_Pendientes.encolar("isai","lol",8)
        C_Pendientes.encolar("as","lib1",25)
        C_Pendientes.encolar("fe","lib3",2)
        C_Pendientes.encolar("qw","lib5",7)
        C_Pendientes.encolar("ty","lib9",9)
        C_Pendientes.encolar("ui","lib0",11)
        C_Pendientes.graficar()
    }

    function ver_circular() {
        
        UserList.graficar()
    }

    function cargar() {
        
        FantasyBooks.graficar()
        ThrillerBooks.graph_matrix()
    }

    function mostrarbubblesort() {
        document.getElementById("content").value=
        "acá va el algoritmo del bubble"
    }

    function mostrarquicksort() {
        document.getElementById("content").value=
        "acá va el algoritmo del quicks"
    }

    
    
    
    
    