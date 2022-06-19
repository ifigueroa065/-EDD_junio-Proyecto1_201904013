class Nodo_Ortogonal{
    constructor(x,y,isbn,nombre_autor,nombre_libro,cantidad,paginas,categoria){
        //el objeto xd
        this.x=x
        this.y=y
        this.isbn=isbn
        this.nombre_autor=nombre_autor
        this.nombre_libro=nombre_libro
        this.cantidad=cantidad
        this.paginas=paginas
        this.categoria=categoria
        
        
        //apuntadores
        this.top=null;
        this.bot=null;
        this.left=null;
        this.right=null
    }
    
}

class L_Ortogonal {
    
    constructor(){
        this.cabeza=null
        this.cont=0
        this.m = 25
        this.n = 25
        var auxiliar = null
        var auxiliar2 = null
        for (var i = 1; i < this.n + 1; i++) {
            for (var j = 1; j < this.m + 1; j++) {
                var nuevo = new Nodo_Ortogonal(i,j,"","","","","","")
                nuevo.right = null
                nuevo.bot = null
                if (j == 1) {
                    nuevo.left = null
                    if (this.cabeza == null) {
                        this.cabeza = nuevo
                    }
                    auxiliar = nuevo
                } else {
                    nuevo.left = auxiliar
                    auxiliar.right = nuevo
                }
                if (i == 1) {
                    nuevo.top = null
                    auxiliar = nuevo
                } else {
                    nuevo.top = auxiliar2
                    auxiliar2.bot = nuevo
                    auxiliar2 = auxiliar2.right
                    auxiliar = nuevo
                }
            }
            auxiliar2 = this.cabeza
            while (auxiliar2.bot != null) {
                auxiliar2 = auxiliar2.bot
            }
        }
    }

    estaVacia(){
        return this.cabeza==null
    }

    add(pix,fila){
        if (this.estaVacia()) {
            var  tempNodo= new Nodo_Ortogonal(pix)
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
                var tempNodo= new Nodo_Ortogonal(pix)

                //creando una nueva fila
                aux.bot=tempNodo    //apunta bot
                tempNodo.top=aux    //apunta arriba
            } else {
                //recorrido horizontal
                while (aux.right!=null) {
                    aux=aux.right
                }
            

                //agregando nodo en una fila    
                var tempNodo= new Nodo_Ortogonal(pix)
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

    agregarnodo(x,y,isbn,nombre_autor,nombre_libro,cantidad,paginas,categoria) {
        var temporal = this.cabeza
        while (temporal != null) {
            var toreto = temporal
            while (toreto != null) {
                if (toreto.x == x && toreto.y == y) {
                    toreto.isbn = isbn
                    toreto.nombre_autor=nombre_autor
                    toreto.nombre_libro=nombre_libro
                    toreto.cantidad=cantidad
                    toreto.paginas=paginas
                    toreto.categoria=categoria
                }
                toreto = toreto.right
            }
            temporal = temporal.bot
        }
    }

    Mostrar() {
        if (this.cabeza != null) {
            var temporal = this.cabeza
            while (temporal != null) {
                var toreto = temporal
                var img = ""
                while (toreto != null) {
                    img = img + " " + toreto.nombre_libro
                    toreto = toreto.right
                }
                temporal = temporal.bot
                console.log(img)
            }
        } else {
            console.log("no hay datos ")
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
            codigodot+="label = \""+"CATEGORÍA FANTASÍA"+"\";\n"
            var nodos = ""
            var conexiones = ""
            var rank = ""
            var num = 1
            var i = 0;
           
                ///** */
            var temporal = this.cabeza
            while (temporal != null) {
                var toreto = temporal
                
                while (toreto != null) {
                    codigodot += "\n"
                    codigodot += "Nodo" + num + "[label=\"" + toreto.nombre_libro + "\"];"
                    //apuntador bot
                    if (toreto.bot != null) {
                        
                        conexiones += "Nodo" + num + " -> Nodo" + (num + this.m) + "[ dir = both ];\n"
                    }
                    //apuntador derecha
                    if (toreto.right != null) {
                        
                        conexiones += "Nodo" + num + " -> Nodo" + (num + 1) + "[ dir = both ];\n"
                    }
                    if (i == 0) {
                        var bryan = temporal;
                        var auxiliar2 = " ";
                        var auxnum = num;
                        while (bryan != null) {
                            auxiliar2 += "Nodo" + auxnum + ";"
                            bryan = bryan.right
                            auxnum++;
                        }
                        codigodot += "\n"
                        codigodot += "{rank=same " + auxiliar2 + "};\n"
                    }
                    
                    num++;
                    toreto = toreto.right
                    i++;
                }
                i = 0;
                temporal = temporal.bot
                
            }
            codigodot += "\n"
            codigodot += "//relacionando nodos\n"

            codigodot += conexiones;
            codigodot += "\n}";
            console.log(codigodot)
            d3.select("#lienzo_fantasia1").graphviz()
                .width(1200)
                .height(1200)
                .renderDot(codigodot)


        } else {
            console.log("no hay datos ")
        }
    }

}



/**var prueba= new L_Ortogonal()


 
prueba.agregarnodo(2, 3, "2-3")
prueba.agregarnodo(5, 5, "5-5")
prueba.agregarnodo(1, 1, "25-25")
prueba.agregarnodo(3, 2, "6-2")
prueba.agregarnodo(1, 1, "1-1")

prueba.Mostrar()
prueba.graficar()**/