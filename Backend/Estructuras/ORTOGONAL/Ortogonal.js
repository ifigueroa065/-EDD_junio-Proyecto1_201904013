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
                aux.bot=tempNodo    //apunta bot
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
    

    graficar() {
        if (this.cabeza != null) {
            var codigodot  = "digraph G{\n"
            codigodot+="node[ style=filled ,color=\"#819BE1\", shape=box];\n"
            codigodot+="label = \""+"MATRIZ ORTOGONAL"+"\";\n"
            var nodos = ""
            var conexiones = ""
            var rank = ""
            var num = 1
            var i = 0;
            codigodot += "\n"
                ///** */
            var aux = this.cabeza
            while (aux != null) {
                var auxi = aux
                var datos = ""
                while (auxi != null) {
                    nodos += "N" + num + "[label=\"" + auxi.pix + "\"];\n"

                    //apuntador bot
                    if (auxi.bot != null) {
                        conexiones += "N" + num + " -> N" + (num + this.cont) + "[ dir = both ];\n"
                    }

                    //apuntador derecha
                    if (auxi.right != null) {
                        conexiones += "N" + num + " -> N" + (num + 1) + "[ dir = both ];\n"
                    }
                    if (i == 0) {
                        var aux2 = aux;
                        var nodoaux = " ";
                        var auxnum = num;
                        while (aux2 != null) {

                            nodoaux += "N" + auxnum + ";"
                            aux2 = aux2.right
                            auxnum++;


                        }
                        rank += "{rank=same " + nodoaux + "};\n"
                    }
                    datos = datos + " " + auxi.pix
                    num++;
                    auxi = auxi.right
                    i++;
                }
                i = 0;
                aux = aux.bot
                console.log(datos)
            }


            ///** */
            codigodot += rank;
            codigodot += nodos;
            codigodot += conexiones;
            codigodot += "\n}";
            console.log(codigodot)
            d3.select("#ABBIMG").graphviz()
                .width(1200)
                .height(1200)
                .renderDot(codigodot)


        } else {
            console.log("no hay datos ")
        }
    }

}

const prueba= new L_Ortogonal

var i=1
while(i<=5){
    for (let index = 1; index <= 5; index++) {
        prueba.agregarNodo(" ",i)
        
    }
    i++
}

 

prueba.mostrarLista()
prueba.graficar()