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
    nodo_str(){
        return "("+str(this.x)+","+str(this.y)+")="+str(this.dato)
    }
        
}

class Dispersa{
    constructor() {
        this.root  = new NodoM(-1,-1,"Root")
        
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
        var nuevo = new NodoM(x,-1,"COL")
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
        var nuevo = new NodoM(-1,y,"Fila")
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
            console.log("Caso1, ---No existe fila ni columna")

            //crear las cabeceras
            NodoColumna=this.crear_columna(x)
            NodoFila=this.crear_fila(y)

            //insertamos contenido
            nuevo=this.insertar_orden_col(nuevo,NodoFila)
            nuevo=this.insertar_orden_fil(nuevo,NodoColumna)
            return
        }else if(NodoFila==null && NodoColumna!=null){
            //Caso 2---No existe Fila, pero si columna
            console.log("Caso2")

            //crear las cabeceras
            //NodoColumna=this.crear_columna(x)
            NodoFila=this.crear_fila(y)

            //insertamos contenido
            nuevo=this.insertar_orden_col(nuevo,NodoFila)
            nuevo=this.insertar_orden_fil(nuevo,NodoColumna)
            return
        }else if(NodoFila!=null && NodoColumna==null){
            //Caso 3---No existe columna, pero si fila
            console.log("Caso3")

            //crear las cabeceras
            NodoColumna=this.crear_columna(x)
            //NodoFila=self.crear_fila(y)
            
            //insertamos contenido
            nuevo=this.insertar_orden_col(nuevo,NodoFila)
            nuevo=this.insertar_orden_fil(nuevo,NodoColumna)
            return
        }else if(NodoFila!=null && NodoColumna!=null){
            //Caso 4 ---  si existe fila y columna

            console.log("Caso4")
            
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
                text+= "["+aux2.x + aux2.y+"]"
                aux2=aux2.siguiente
            }
            console.log(text)
            aux=aux.abajo
        }
        return null
    }

    }

    
    


var matrizAux=new Dispersa()
matrizAux.insertarNodo(0,0,"hola")
matrizAux.insertarNodo(1,1,"hola")
matrizAux.insertarNodo(2,2,"hola")
matrizAux.insertarNodo(3,3,"hola")
matrizAux.insertarNodo(1,3,"hola")
matrizAux.insertarNodo(5,1,"hola")
matrizAux.imprimir()