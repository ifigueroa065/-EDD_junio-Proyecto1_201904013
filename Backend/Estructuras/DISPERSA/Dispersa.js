class Nodo {
    constructor(n) {
        this.n = n
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

    add(digito) {
        var nuevo = new Nodo(digito)

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
            console.log(temporal.n)
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
            
            nodos+=  "N" + numnodo + "[label=\"" + temporal.n + "\" ];\n"
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
            
            nodos+=  "N" + numnodo + "[label=\"" + temporal.n + "\" ];\n"
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
        nodos+=  "N" + numnodo + "[label=\"" + temporal.n + "\" ];\n"
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
            
            nodos+=  "N" + numnodo + "[label=\"" + temporal.n + "\" ];\n"
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
}

var LDC = new ListaDobleCircular();
LDC.add(2)
LDC.add(0)
LDC.add(1)
LDC.add(9)
LDC.add(0)
LDC.add(4)
LDC.add(0)
LDC.add(1)
LDC.add(3)

LDC.mostrar()
LDC.graficar()
console.log("________________")
LDC.mostrar_alreves()
LDC.graficar_alreves()
LDC.add(2)
LDC.add(0)
LDC.add(1)
LDC.add(9)
LDC.add(0)
LDC.add(4)
LDC.add(0)
LDC.add(1)
LDC.add(3)
LDC.graficar_doble()
