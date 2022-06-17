class NodoM {
    constructor(x,y,dato) {
        //punteros
        this.siguiente = null
        this.anterior = null
        this.abajo = null
        this.arriba = null
        //data
        this.dato=dato
        this.x=x
        this.y=y
    }
    
        
}

class Dispersa{
    constructor() {
        this.root  = new NodoM(0,0,"Root")
        
    }

    //Buscar columna
    buscar_columna(x){
        var aux=this.root
        while (aux!=null) {
            if (aux.x==x) {
                return aux
            }
            aux=aux.siguiente
        }
        return null
    }
    
    buscar_fila(y){
        var aux=this.root
        while (aux!=null) {
            if (aux.y==y) {
                return aux
            }
            aux=aux.abajo
        }
        return null
    }

  


    //Insertar Cabecera Columna
    crear_columna(x){
        var nodo_col =this.root
        var nuevo = new NodoM(x,0,"COL")
        var columna= this.insertar_orden_col(nuevo,nodo_col)
        return columna
    }
    

    //Insertar en orden columnas
    insertar_orden_col(nuevo,cabeza_col){
        var aux = cabeza_col
        var insertado = new Boolean(false)
        while (true) {
            if (nuevo.x==aux.x) {
                //si la posicion ya existe sobre escribimos
                aux.y=nuevo.y
                aux.dato=nuevo.dato
                return aux
            }else if (aux.x>nuevo.x){
                //insertar en medio, antes del aux
                insertado=true
                break
            }

            if (aux.siguiente != null) {
                aux=aux.siguiente
            } else {
                //insertar despues del auxiliar
                insertado=false
                break
            }
        }
        if (insertado) {
            nuevo.siguiente=aux
            aux.anterior.siguiente=nuevo
            nuevo.anterior=aux.anterior
            aux.anterior=nuevo
        } else {
            aux.siguiente=nuevo
            nuevo.anterior=aux
        }
        return nuevo
    }
    

    //nsertar Cabecera Fila
    crear_fila(y){
        var nodo_fila= this.root
        var nuevo = new NodoM(0,y,"Fila")
        var columna = this.insertar_orden_fil(nuevo,nodo_fila)
        return columna
    }

    //Insertar en orden Filas
    insertar_orden_fil(nuevo,cabeza_fila){
        var aux = cabeza_fila
        var insertado= new Boolean(false)
        while(true){
            if (nuevo.y==aux.y) {
                //si la posicion ya existe sobre escribimos
                aux.x=nuevo.x
                aux.dato=nuevo.dato
                return aux
            }else if (aux.y>nuevo.y){
                //insertar en medio, antes del aux
                insertado=true
                break
            }

            if (aux.abajo != null) {
                aux=aux.abajo
            } else {
                //insertar despues del auxiliar
                insertado=false
                break
            }
        }
        if (insertado) {
            nuevo.abajo=aux
            aux.arriba.abajo=nuevo
            nuevo.arriba=aux.arriba
            aux.arriba=nuevo
        } else {
            aux.abajo=nuevo
            nuevo.arriba=aux
        }
        return nuevo
        }

        //Metodo para insertar  
    insertarNodo(x,y,dato){
        var nuevo = new NodoM(x,y,dato)
        var NodoColumna = this.buscar_columna(x)
        var NodoFila =this.buscar_fila(y)

        
        if (NodoFila==null && NodoColumna==null) {
            //Caso 1---No existe fila ni columna
            //console.log("Caso1, ---No existe fila ni columna")

            //crear las cabeceras
            NodoColumna=this.crear_columna(x)
            NodoFila=this.crear_fila(y)

            //insertamos contenido
            nuevo=this.insertar_orden_col(nuevo,NodoFila)
            nuevo=this.insertar_orden_fil(nuevo,NodoColumna)
            return
        }else if(NodoFila==null && NodoColumna!=null){
            //Caso 2---No existe Fila, pero si columna
            //console.log("Caso2")

            //crear las cabeceras
            //NodoColumna=this.crear_columna(x)
            NodoFila=this.crear_fila(y)

            //insertamos contenido
            nuevo=this.insertar_orden_col(nuevo,NodoFila)
            nuevo=this.insertar_orden_fil(nuevo,NodoColumna)
            return
        }else if(NodoFila!=null && NodoColumna==null){
            //Caso 3---No existe columna, pero si fila
            //console.log("Caso3")

            //crear las cabeceras
            NodoColumna=this.crear_columna(x)
            //NodoFila=self.crear_fila(y)
            
            //insertamos contenido
            nuevo=this.insertar_orden_col(nuevo,NodoFila)
            nuevo=this.insertar_orden_fil(nuevo,NodoColumna)
            return
        }else if(NodoFila!=null && NodoColumna!=null){
            //Caso 4 ---  si existe fila y columna

            //console.log("Caso4")
            
            //crear las cabeceras
            //NodoColumna=self.crear_columna(x)
            //NodoFila=self.crear_fila(y)
            
            //insertamos contenido
            nuevo=this.insertar_orden_col(nuevo,NodoFila)
            nuevo=this.insertar_orden_fil(nuevo,NodoColumna)
            return
        }
    }
    
    imprimir(){
        var aux =this.root
        while(aux!=null){
            var text = ""
            var aux2 = aux
            while(aux2!=null){
                text+= "["+ aux2.x +","+ aux2.y+"]"
                aux2=aux2.siguiente
            }
            console.log(text)
            aux=aux.abajo
        }
        return null
    }
    imprimir_horizontal(){
        let cabecera=this.root
        let aux
        while(cabecera!=null){
            aux=cabecera.abajo
            while(aux!=null){
                console.log("Valor :", aux.dato, " X:",aux.x , " Y:", aux.y)
                aux=aux.abajo
            }
            cabecera=cabecera.siguiente

        }
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

        var aux =this.root
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
                aux2=aux2.abajo
               
            }
            console.log(text)
            aux=aux.siguiente
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
        var temporal =this.root
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

                auxiliar=auxiliar.abajo
            }
            
            temporal=temporal.siguiente
        }
        //AQUI VALGO MADRE
        var cx="{rank = same;"
        var cp = "{rank = same;"
        var init = new Boolean(true)
        var popeye =this.root

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
            
                jux=jux.abajo
            }
            init=true
            cx+="}"
            codigodot+=cx+"\n"
            cx=cp
            popeye=popeye.siguiente
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
        var cols= this.root
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

                sprus=sprus.abajo
            }
            codigodot+="\n" 
            codigodot+=tx+"\n" 
            cols=cols.siguiente
            init=true
            tx=""
        }

        //uniendo filas
        var pou=1
        codigodot+="\n"
        init=true
        tx="" 
        while (pou<=py) {
            var papasito =this.root
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
                    mamasita=mamasita.abajo
                }
                papasito=papasito.siguiente
                
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

    
    


var matrizAux=new Dispersa()

matrizAux.insertarNodo(1,1,"hola")
matrizAux.insertarNodo(2,2,"hola")
matrizAux.insertarNodo(3,3,"hola")
matrizAux.insertarNodo(1,3,"hola")
matrizAux.insertarNodo(5,1,"hola")

console.log("______________ CONTENIDO")
matrizAux.imprimir()
matrizAux.graficar()