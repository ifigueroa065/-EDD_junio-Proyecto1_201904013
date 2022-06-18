class NodeM {
    constructor(x,y,dato) {
        //punteros
        this.up = null
        this.down = null
        this.next = null
        this.prev = null
        //data
        this.dato=dato
        this.x=x
        this.y=y
    }
    
        
}


class HeaderNode {
    constructor(pos) {
        this.next = null;
        this.prev = null;
        this.access = null;
        this.pos = pos;
    }
}

class Header{
    constructor(){
        this.head=null
    }
 
    isVoid(){
        return this.head == null;
    }
    getHeader(pos){
        var aux = this.head;
        while (aux != null) {
            if (aux.pos == pos){
                return aux;
            }
            aux = aux.next;
        }
        return null;
    }
    
    setHeader(newNode){
        if (this.isVoid()){
            this.head = newNode;
        } else if (newNode.pos < this.head.pos){
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        } else {
            var aux = this.head;
            while (aux.next != null) {
                if (newNode.pos < aux.next.pos){
                    newNode.next = aux.next;
                    aux.next.prev = newNode;
                    newNode.prev = aux;
                    aux.next = newNode;
                    break;
                }
                aux = aux.next;
            }
            
            if (aux.next == null){
                aux.next = newNode;
                newNode.prev = aux;
            }
        }
    }
}

class Matrix{
    constructor(id,name){
        this.id=id;
        this.name=name 
        this.columna = new Header();
        this.fila = new Header(); 
    }
    printCols(){
        console.log("Imprimir por columnas");
        var auxc = this.columna.head;
        while (auxc != null) {
            console.log("Columna: " + auxc.pos + " -> ");
            var aux = auxc.access;
            while (aux != null){
                console.log("X: " + aux.x + " Y: "+ aux.y + ". ");
                aux = aux.down;
            }
            auxc = auxc.next;
            console.log();
        }
    }
    
    printRows(){
        console.log("Imprimir por filas");
        var auxr = this.fila.head;
        while (auxr != null) {
            console.log("Fila: " + auxr.pos + " -> ");
            var aux = auxr.access;
            while (aux != null){
                console.log("X: " + aux.x + " Y: "+ aux.y + ". ");
                aux = aux.next;
            }
            auxr = auxr.next;
            console.log();
        }
    }

   
    insert(x,y,color){
        var newCell = new NodeM(x, y, color);
        
        var check = this.returnIfExists(x, y);
        if (check != null){
            check.dato = color;
            return;
        }
        
        var nodoCol = this.columna.getHeader(x);
        if (nodoCol == null){
            nodoCol = new HeaderNode(x);
            this.columna.setHeader(nodoCol);
            nodoCol.access = newCell;
        } else if (y < nodoCol.access.y) {
            newCell.down = nodoCol.access;
            nodoCol.access.up = newCell;
            nodoCol.access = newCell;
        } else {
            var aux = nodoCol.access;
            while (aux.down != null){
                if (y < aux.down.y){
                    newCell.down = aux.down;
                    aux.down.up = newCell;
                    aux.down = newCell;
                    newCell.up = aux;
                    break;
                }
                aux = aux.down;
            }

            if (aux.down == null){
                aux.down = newCell;
                newCell.up = aux;
            }
        }
        

        var nodoFil = this.fila.getHeader(y);
        if (nodoFil == null){
            nodoFil = new HeaderNode(y);
            this.fila.setHeader(nodoFil);
            nodoFil.access = newCell;
        } else if (x < nodoFil.access.x){
            newCell.next = nodoFil.access;
            nodoFil.access.prev = newCell;
            nodoFil.access = newCell;
        } else {
            var aux = nodoFil.access;
            while (aux.next != null) {
                if (x < aux.next.x) {
                    newCell.next = aux.next;
                    aux.next.prev = newCell;
                    aux.next = newCell;
                    newCell.prev = aux;
                    break;
                }
                aux = aux.next;
            }

            if (aux.next == null){
                aux.next = newCell;
                newCell.up = aux;
            }
        }
    }

    returnIfExists(x, y){
        var headRow = this.fila.getHeader(y);
        if (headRow == null)
            return null;
        var headCol = this.columna.getHeader(x);
        if (headCol == null)
            return null;
        
        var aux = headRow.access;
        while (aux != null){
            if (aux.x == x)
                return aux;
            
            aux = aux.next;
        }
        
        return null;
    }

    insertMatriz(m){
        var auxc = m.columna.head;
        while (auxc != null){
            var aux = auxc.access;
            while (aux != null){
                this.insert(aux.x, aux.y, aux.dato);
                aux = aux.down;
            }
            auxc = auxc.next;
        }
    }

    graph_matrix(){
        var codigodot  = "digraph G{\n"
        codigodot+="node[ style=filled ,color=\"#819BE1\", shape=box];\n"
        codigodot+="label = \""+"MATRIZ DISPERSA"+"\";\n"
        
        codigodot+="edge[dir = \"both\"];\n";
        codigodot += "\n"
        
        //creando nodos columna
        
        var auxc = this.columna.head;
        codigodot+= "Root -> m"+auxc.pos+";\n"
        codigodot += "\n"
        codigodot += "//creando encabezados columna\n"
        codigodot += "\n"
        while (auxc != null){
            codigodot+="m"+auxc.pos+"[label = \""+auxc.pos+"\",group ="+(auxc.pos + 1)+", color=\"#81E1D7\" ];\n"
            if (auxc.next != null){
                codigodot+="m"+auxc.pos+" -> m"+auxc.next.pos+";\n"
                
            }
            
            auxc = auxc.next;
        }
        
        auxc = this.columna.head;
        codigodot += "\n"
        codigodot+="{ rank = same; Root;"

        while (auxc != null){
            codigodot+="m"+auxc.pos+";"
           
            auxc = auxc.next;
        }
        codigodot+="}\n"
        
        //creando nodos filas
        var auxr = this.fila.head;
        codigodot+="Root -> n"+auxr.pos+";\n"
        codigodot += "\n"
        codigodot += "//creando encabezados fila\n"
        while (auxr != null){
            
            codigodot+="n"+auxr.pos+"[label = \""+auxr.pos+"\",group = 1, color=\"#81E1D7\" ];\n"
          
            if (auxr.next != null){
                codigodot+="n"+auxr.pos+" -> n"+auxr.next.pos+";\n"
                
            }
            auxr = auxr.next;
        }
        
        //noditos
        var auxc = this.columna.head;
        codigodot += "\n"
        codigodot += "//creando nodos \n"
        while (auxc != null){
            var aux = auxc.access;
            while (aux != null){
                codigodot+="M"+aux.x+"N"+aux.y+"[label = \""+aux.dato+"\", group = "+(aux.x + 1)+"];\n"
                aux = aux.down;
            }
            auxc = auxc.next;
        }
        
        //conectando columnas
        
        var auxc = this.columna.head;
        codigodot += "\n"
        codigodot += "//creando conexiones\n"
        while (auxc != null){
            if (auxc.access != null){
                codigodot+="m"+auxc.pos+" -> "+"M"+auxc.access.x+"N"+auxc.access.y+";\n"
            }
               
            var aux = auxc.access;
            while (aux != null){
                if (aux.down != null){
                    codigodot+="M"+aux.x+"N"+aux.y+" -> "+"M"+aux.down.x+"N"+aux.down.y+";\n"
                }
                   
                aux = aux.down;
            }
            
            auxc = auxc.next;
        }
        
        //conectando filas

        
        var auxr = this.fila.head;
        
        while (auxr != null){
            if (auxr.access != null){
                codigodot+="n"+auxr.pos+" -> "+"M"+auxr.access.x+"N"+auxr.access.y+";\n"
            }
            
            var aux = auxr.access;
            while (aux != null){
                if (aux.next != null){
                    codigodot+="M"+aux.x+"N"+aux.y+" -> "+"M"+aux.next.x+"N"+aux.next.y+";\n"
                }
                aux = aux.next;
            }
            
            auxr = auxr.next;
        }

        //haciendo la magia :)
        
        var auxr = this.fila.head;
        codigodot += "\n"

        while (auxr != null){
            codigodot+="{ rank = same; n"+auxr.pos+";"
            var aux = auxr.access;

            while (aux != null){
                codigodot+="M"+aux.x+"N"+aux.y+";"
                aux = aux.next;
            }
            codigodot+="}\n"
            auxr = auxr.next;
        }
        codigodot+="\n}"
        
        return console.log(codigodot);

    }


    graficar(){
        

        var val = new Boolean(true)
        var codigodot = "digraph G {\n"
        codigodot +="edge[dir=both]\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "DISPERSA" + "\";\n";
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        var px=0;
        var py=0;

        var aux =this.columna.head
        while(aux!=null){
            var text = ""
            var aux2 = aux
            while(aux2!=null){
                if (val==true) {
                    px=aux2.x
                    py=aux2.y
                    val=false
                }else{
                    if (aux2.x>px) {
                        px=aux2.x
                    }
                    if (aux2.y>py) {
                        py=aux2.y   
                    }

                }
                console.log("Pos"+"["+aux2.x +","+aux2.y+"]"+ " Valor :"+aux2.dato)
                aux2=aux2.down
               
            }
            console.log(text)
            aux=aux.next
        }
        console.log("MAX "+"["+px+","+py+"]")

        console.log("_____________________ CODIGO GRAPHVIZ ___________________")
        //NODOS X
        codigodot += "//agregando nodos\n"
        for (let index = 1; index <= px; index++) {
            codigodot+=  "x" + index + "[label=\"" + index+ "\",shape=box, group=0 ];\n"
            
        }
        codigodot+="\n"
        //NODOS Y
        for (let index = 1; index <= py; index++) {
            codigodot+=  "y" + index + "[label=\"" + index+ "\",shape=box, group= "+index+"];\n"
            
        }
        codigodot+="\n"
        var temporal =this.columna.head
        var val2 = new Boolean(true)

        while(temporal!=null){
            var auxiliar = temporal
            while(auxiliar!=null){
                if (val2) {
                   codigodot+="Nraiz[label=\"raiz\",shape=box, group=0]\n"
                   codigodot+="\n"
                   val2=false
                }
                codigodot+="N" +auxiliar.x + "_" + auxiliar.y + "[label=\""+ "(" +auxiliar.x+ "," + auxiliar.y  + ")" + "\",shape=box"+", group="+auxiliar.y+ ",style=filled," + "]\n"

                auxiliar=auxiliar.down
            }
            
            temporal=temporal.next
        }
        //AQUI VALGO MADRE
        var cx="{rank = same;"
        var cp = "{rank = same;"
        var init = new Boolean(true)
        var popeye =this.columna.head

        while(popeye!=null){
            var jux = popeye
            while(jux!=null){
                if (init) {
                   cx+="x"+jux.x+";"
                    init=false
                }
                if (init==false) {
                    cx+="N"+jux.x+"_"+jux.y+";";
                }
            
                jux=jux.down
            }
            init=true
            cx+="}"
            codigodot+=cx+"\n"
            cx=cp
            popeye=popeye.next
        }

        var op = new Boolean(true)
        var ayuda = "{rank = same;"

        for (let index = 1; index <= py; index++) {
            if (op) {
               ayuda+= "Nraiz->"
               op=false
            }
            ayuda+="y"+index+";"
            
        }
        ayuda+="}"
        codigodot+=ayuda+"\n"
        
        var tx =""
        op=true

        //uniendo ejes verticales
        for (let index = 1; index <= px; index++) {
            if (op) {
                tx="Nraiz->"
                op=false
            }
            if (index<px) {
                tx+="x" + index +" -> "
            } else {
                tx+="x" + index
            }
            
        }

        codigodot+=tx+"\n"
        tx=""
        op=true
        //uniendo ejes horizontales
        for (let index = 1; index <= py; index++) {
            if (op) {
                tx="Nraiz->"
                op=false
            }
            if (index<py) {
                tx+="y" + index +" -> "
            } else {
                tx+="y" + index
            }   
        }   
        codigodot+=tx+"\n" 

        //uniendo columnas
        
        init=true
        tx=""
        var cols= this.columna.head
        while(cols!=null){ 
            var sprus = cols
            while(sprus!=null){
                if (init) {
                    tx+= "x" + sprus.x;
                    init=false;
                }
                if(init==false){
                    tx+="->"+ "N"+sprus.x+"_"+sprus.y;
                }

                sprus=sprus.down
            }
            codigodot+="\n" 
            codigodot+=tx+"\n" 
            cols=cols.next
            init=true
            tx=""
        }

        //uniendo filas
        var pou=1
        codigodot+="\n"
        init=true
        tx="" 
        while (pou<=py) {
            var papasito =this.head
            while (papasito!=null) {
                var mamasita = papasito
                while (mamasita!=null) {
                    if(pou==mamasita.y){
                        if(init){
                            tx+="y" + mamasita.y
                            init = false
                        }
                        if(init==false){
                            tx+="->"+ "N"+mamasita.x+"_"+mamasita.y;
                        }
                    }
                    mamasita=mamasita.down
                }
                papasito=papasito.next
                
            }
            codigodot+="\n"
            codigodot+=tx+"\n"
            init=true
            tx=""
            pou++
        }
        codigodot+="}\n"



        
        
        console.log(codigodot)

    }
}

var matrizAux = new Matrix()

matrizAux.insert(1,1,"hola")
matrizAux.insert(2,2,"hola")
matrizAux.insert(3,3,"hola")
matrizAux.insert(1,3,"hola")
matrizAux.insert(5,1,"hola")

console.log("_________________ imprimiendo ___________")
matrizAux.printCols()
matrizAux.graph_matrix()
