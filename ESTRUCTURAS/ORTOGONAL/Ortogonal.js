class Node{
    constructor(pix){
        this.pix=pix;
        this.top=null;
        this.bot=null;
        this.left=null;
        this.right=null
    }
    setdato(pix){
        this.pix=pix
    }
}

class L_Ortogonal {
    
    constructor(){
        this.cabeza=null
        this.cont=0
    }

    estaVacia(){
        return this.cabeza==null
    }

    agregarNodo(pix,fila){
        if (this.estaVacia()) {
            var  tempNodo= new Node(pix)
            this.cabeza=tempNodo
            this.cont++
        } else {
            var aux= this.cabeza

            //recorrido vertical
            while (aux.bot!=null) {
                aux=aux.bot
            }

            if (this.cont!=fila) {
                this.cont++
                var tempNodo= new Node(pix)

                //creando una nueva fila
                aux.bot=tempNodo    //apunta abajo
                tempNodo.top=aux    //apunta arriba
            } else {
                //recorrido horizontal
                while (aux.right!=null) {
                    aux=aux.right
                }
            

                //agregando nodo en una fila    
                var tempNodo= new Node(pix)
                aux.right=tempNodo
                tempNodo.left=aux

                //si el nodo es de una fila <> a la principal
                if (this.cont>1) {
                    //se crea 2do nodo auxiliar
                    var aux2=aux.top.right
                    aux2.bot=tempNodo
                    tempNodo.top=aux2
                }
                
            }
        }
    }

    mostrarLista(){
        var contcol=1
        var contfila=1
        var aux = this.cabeza
        var img = ""
        while (aux.bot!=null || aux.right!=null) {
            img+=aux.pix
            if (aux.right!=null) {
                aux=aux.right
                contcol++
            } else {
                contfila++
                contcol=1
                //imprimo la fila que leí
                console.log(img)
                if (aux.bot!=null) {
                    img=""
                    aux=aux.bot
                    while (aux.left!=null) {
                        aux=aux.left
                    }
                }
            }
        }
        img+=aux.pix
        console.log(img)

    }

    graficar(){
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "PILA" + "\";\n";
        var aux = this.cabeza
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        var contcol=1
        var contfila=1
        var img = ""
        
        
        
        while (aux.bot!=null || aux.right!=null) {
            nodos+=  "N" + numnodo + "[label=\"" + aux.pix + "\" ];\n"
            
            
            
            if (aux.right!=null) {
                aux=aux.right
                contcol++
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                conexiones += "N" + auxnum + " -> N" + numnodo + ";\n"
                numnodo++
                
            } else {
                contfila++
                contcol=1
                //imprimo la fila que leí
                console.log(img)
                if (aux.bot!=null) {
                    img=""
                    aux=aux.bot
                    while (aux.left!=null) {
                        aux=aux.left
                    }
                }
            }
        }
        nodos+=  "N" + numnodo + "[label=\"" + aux.pix + "\" ];\n"
        console.log(img)
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#lienzo").graphviz()
            .width(1200)
            .height(500)
            .renderDot(codigodot)



            
    }

}

const prueba= new L_Ortogonal
prueba.agregarNodo("#",1)
prueba.agregarNodo("#",1)
prueba.agregarNodo("#",1)
prueba.agregarNodo("#",1)

prueba.agregarNodo("-",2)
prueba.agregarNodo("#",2)
prueba.agregarNodo("-",2)
prueba.agregarNodo("#",2)

prueba.agregarNodo("#",3)
prueba.agregarNodo("#",3)
prueba.agregarNodo("#",3)
prueba.agregarNodo("#",3)

prueba.agregarNodo("#",4)
prueba.agregarNodo("#",4)
prueba.agregarNodo("#",4)
prueba.agregarNodo("#",4)  

prueba.mostrarLista()
prueba.graficar()