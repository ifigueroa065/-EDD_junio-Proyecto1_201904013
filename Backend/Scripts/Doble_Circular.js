class Nodo_Circular {
    constructor(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono) {
        
        //Data 
        this.dpi = dpi
        this.nombre_completo=nombre_completo
        this.nombre_usuario= nombre_usuario
        this.correo=correo
        this.rol=rol
        this.contrasenia=contrasenia
        this.telefono=telefono
        this.obtenidos= new Cola_Obs() //Lista de libros obtenidos

        //Apuntadores
        this.siguiente = null
        this.anterior = null
    }
}

class ListaDobleCircular{
    constructor() {
        this.primero = null
        this.ultimo = null
        this.tam=0
    }

    add(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono) {
        var nuevo = new Nodo_Circular(dpi,nombre_completo,nombre_usuario,correo,rol,contrasenia,telefono)

        if (this.primero==null) {
            this.primero=nuevo
            this.primero.siguiente=this.primero
            this.primero.anterior=this.ultimo
            this.ultimo=nuevo
            this.tam++
        }else{
            nuevo.anterior=this.ultimo
            this.ultimo.siguiente=nuevo
            nuevo.siguiente=this.primero
            this.ultimo=nuevo
            this.primero.anterior=this.ultimo
            this.tam++
        }


    }

    mostrar(){
        var temporal = this.primero
        var cont =0;
        while(cont<this.tam){
            console.log("__________ DATOS DEL USUARIO "+(cont+1)+" __________")
            console.log("dpi : "+ temporal.dpi)
            console.log("nombre_completo : "+ temporal.nombre_completo)
            console.log("nombre_usuario : "+ temporal.nombre_usuario)
            console.log("correo : "+ temporal.correo)
            console.log("rol : "+ temporal.rol)
            console.log("contrasenia : "+ temporal.contrasenia)
            console.log("teléfono : "+ temporal.telefono)
            temporal = temporal.siguiente
            cont++;
        }
        
    }

    comprar(nombre_usuario,nombre_libro,cantidad){
        var temporal = this.primero
        var cont =0;
        while(cont<this.tam){

            if (nombre_usuario==temporal.nombre_usuario) {
                for (let index = 1; index <= cantidad; index++) {
                    temporal.obtenidos.encolar(nombre_libro)
                    
                }
                break;
                
            }
           
            temporal = temporal.siguiente
            cont++;
        }
        
    }

    isExiste(user,pass){
        var temporal = this.primero
        var cont =0; 
        
        while(cont<this.tam){

            if (user==temporal.nombre_usuario && pass==temporal.contrasenia) {
                //si existe verifico el rol
                return true
                
            }
            temporal = temporal.siguiente
            cont++;
        }

        return false
        
    }

    getRol(user){
        var temporal = this.primero
        var cont =0; 
        
        while(cont<this.tam){
            if (user==temporal.nombre_usuario) {
                //si existe verifico el rol
                return temporal.rol
                
            }
            temporal = temporal.siguiente
            cont++;
        }
        
    }

    mostrar_alreves(){
        
        var temporal= this.ultimo

        while (temporal!=this.primero) {
            console.log(temporal.n)
            temporal=temporal.anterior
        }
        console.log(temporal.n)
    
    }

    graficar(){
        
        
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "RECORRIDO INICO A FIN" + "\";\n";
        var temporal = this.primero
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        var cont =0;
        while (cont<this.tam) {
            
            nodos+=  "N" + numnodo + "[label=\"" + temporal.nombre_usuario + "\" ];\n"
            if(temporal.siguiente==this.ultimo){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                
            }else if(temporal.siguiente != this.primero){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                conexiones += "N" + auxnum + " -> N" + numnodo + ";\n"

            }else{
                var auxnum = 0
                var auxnum2= numnodo-1
                conexiones += "N" + auxnum + " -> N" + numnodo + ";\n"
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                conexiones += "N" + numnodo + " -> N" + auxnum2 + ";\n"
            }
            temporal = temporal.siguiente
            numnodo++;
            cont++;  
                      
        }
        
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#lienzo").graphviz()
            .width(1800)
            .height(200)
            .renderDot(codigodot)
    }

    graficar_alreves(){
        
        
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "RECORRIDO FIN A INICIO" + "\";\n";
        var temporal = this.ultimo
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        var cont =0;
        while (temporal!=this.primero) {
            
            nodos+=  "N" + numnodo + "[label=\"" + temporal.nombre_usuario + "\" ];\n"
            if(temporal.anterior==this.ultimo){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                
            }else if(temporal.anterior != this.primero){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                conexiones += "N" + auxnum + " -> N" + numnodo + ";\n"

            }
            temporal = temporal.anterior
            numnodo++;
            cont++;  
                      
        }
        nodos+=  "N" + numnodo + "[label=\"" + temporal.nombre_usuario + "\" ];\n"
        var auxnum = numnodo-1
        var auxo=0
        conexiones += "N" + auxnum + " -> N" + numnodo + ";\n"
        conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"

        conexiones += "N" + numnodo + " -> N" + auxo + ";\n"
        conexiones += "N" + auxo + " -> N" + numnodo + ";\n"


        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#lienzo2").graphviz()
            .width(1800)
            .height(200)
            .renderDot(codigodot)
    }

    graficar_doble(){
        
        
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "DOBLE RECORRIDO" + "\";\n";
        var temporal = this.primero
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        var cont =0;
        while (cont<this.tam) {
            
            nodos+=  "N" + numnodo + "[label=\"" + temporal.nombre_usuario + "\" ];\n"
            if(temporal.siguiente==this.ultimo){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                
            }else if(temporal.siguiente != this.primero){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                conexiones += "N" + auxnum + " -> N" + numnodo + ";\n"

            }else{
                var auxnum = 0
                var auxnum2= numnodo-1
                conexiones += "N" + auxnum + " -> N" + numnodo + ";\n"
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                conexiones += "N" + numnodo + " -> N" + auxnum2 + ";\n"
            }
            temporal = temporal.siguiente
            numnodo++;
            cont++;  
                      
        }
        
        
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#lienzo3").graphviz()
            .width(1800)
            .height(200)
            .renderDot(codigodot)
    }

    graficar_lista_de_listas(){
        if (this.primero != null) {
            var codigodot = "digraph G {\n"
            codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
            codigodot +="label=\"" + "RECORRIDO INICO A FIN" + "\";\n";
            var nodos = ""
            var conexiones = ""
            var rank = "{rank=same "
            var num = 1
            var aux = this.primero
            var nodosHijos = ""
            while (aux.siguiente != this.primero) {
                nodos += "N" + num + "[label=\"" + aux.nombre_usuario + "\"];\n"
                conexiones += "N" + num + " -> N" + (num + 1) + ";\n"
                rank += "N" + num + ";"
                nodosHijos += aux.obtenidos.subgra(aux.dpi, num)
                aux = aux.siguiente
                num++;
                if (aux.siguiente == this.primero) {
                    nodos += "N" + num + "[label=\"" + aux.nombre_usuario + "\"];\n"
                    conexiones += "N" + num + " -> N1;\n"
                    nodosHijos += aux.obtenidos.subgra(aux.dpi, num)
                    rank += "N" + num + ";"
                }
            }
            rank += "};\n"
            codigodot += rank + nodos + conexiones;
            codigodot += nodosHijos;
            codigodot += "\n}"
            console.log(codigodot)
            d3.select("#lienzo").graphviz()
                .width(1100)
                .height(700)
                .renderDot(codigodot)
        }
    }
}


