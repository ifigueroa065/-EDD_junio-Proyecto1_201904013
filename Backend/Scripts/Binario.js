class NodoB{
    
    constructor(dpi,nombre_autor,correo,direccion,telefono,biografia){
        this.dpi=dpi
        this.nombre_autor=nombre_autor
        this.correo=correo
        this.direccion=direccion
        this.telefono=telefono
        this.biografia=biografia
        this.izquierdo=this.derecho=null
        
    }
    texto_graphviz(){

        //este si funcionó  :)
        if (this.izquierdo==null && this.derecho==null) {
            return this.nombre_autor
        } else {
            var texto=""
            if (this.izquierdo!=null) {
                texto+= this.nombre_autor+"->"+this.izquierdo.texto_graphviz()+"\n"
            }

            if (this.derecho!=null) {
                texto+=this.nombre_autor+"->"+this.derecho.texto_graphviz()+"\n"
            }
            return texto
        }

    }

    codigo_interno(){
        //este tambien funciona :)

        var  texto = ""

        if (this.izquierdo == null && this.derecho == null) {
            texto+="node"+(this.nombre_autor.replace(/ /g, ""))+"[label=\""+this.nombre_autor+"\"];\n"
        } else {
            texto+="node"+(this.nombre_autor.replace(/ /g, ""))+"[label=\"<C0>|"+this.nombre_autor+"|<C1>\"];\n"
        }

        if (this.izquierdo!=null) {
            texto+=this.izquierdo.codigo_interno()
            texto+="node"+(this.nombre_autor.replace(/ /g, ""))+":C0->node"+(this.izquierdo.nombre_autor.replace(/ /g, ""))+";\n"
        }

        if (this.derecho!=null) {
            texto+=this.derecho.codigo_interno()
            texto+="node"+(this.nombre_autor.replace(/ /g, ""))+":C1->node"+(this.derecho.nombre_autor.replace(/ /g, ""))+";\n"
        }
        
        return texto
    }

    
    graficar(){
        var  texto = ""
        texto+="digraph G { rankdir=TB; "
        texto+="\n"
        texto+="node [shape = record, style=filled, color=\"#819BE1\"];\n"
        texto+=this.codigo_interno()
        texto+="}\n"
        return texto
        
    }

    graficar2(){
        var  texto = ""
        texto+="digraph G { rankdir=TB ; node [shape = record, style=filled, fillcolor=seashell2];\n"
        texto+=this.texto_graphviz()
        texto+="}\n"
        return console.log(texto)
    }



}

class Arbol_Binario{
    constructor(){
        this.raiz=null
    }

    raiz(){
        return this.raiz
    }

    agregar(dpi,nombre_autor,correo,direccion,telefono,biografia){
        this.raiz=this.agregar_recursive(dpi,nombre_autor,correo,direccion,telefono,biografia,this.raiz)
    }

    agregar_recursive(dpi,nombre_autor,correo,direccion,telefono,biografia,raiz){
        //si está vacío
        if (raiz==null) {
            return  new NodoB(dpi,nombre_autor,correo,direccion,telefono,biografia)
        } else {
            //Verificar si es mayor o menor
            
            if ((nombre_autor.replace(/ /g, ""))<(raiz.nombre_autor.replace(/ /g, ""))) {
                raiz.izquierdo=this.agregar_recursive(dpi,nombre_autor,correo,direccion,telefono,biografia,raiz.izquierdo)
            } else {
                raiz.derecho=this.agregar_recursive(dpi,nombre_autor,correo,direccion,telefono,biografia,raiz.derecho)
            }
        }
        return raiz
    }

    pre_orden(){
        this.pre_order_recursivo(this.raiz)
    }
    
    pre_order_recursivo(raiz){
        //visitar raiz, izquierda y derecha
        if (raiz) {
            
            console.log("dpi:"+raiz.dpi)
            console.log("nombre_autor:"+raiz.nombre_autor)
            console.log("correo:"+raiz.correo)
            console.log("direccion:"+raiz.direccion)
            console.log("telefono:"+raiz.telefono)
            console.log("biografia:"+raiz.biografia)
            this.pre_order_recursivo(raiz.izquierdo)
            this.pre_order_recursivo(raiz.derecho)
        }
    }

    inorden(){

        this.inorden_recursivo(this.raiz)
    }

    inorden_recursivo(raiz){
        //izquierda -> raiz -> derecha
        if (raiz) {
            this.inorden_recursivo(raiz.izquierdo)
            console.log("dpi:"+raiz.dpi)
            console.log("nombre_autor:"+raiz.nombre_autor)
            console.log("correo:"+raiz.correo)
            console.log("direccion:"+raiz.direccion)
            console.log("telefono:"+raiz.telefono)
            console.log("biografia:"+raiz.biografia)
            this.inorden_recursivo(raiz.derecho)
        }
    }
    post_orden(){
        this.post_orden_recursivo(this.raiz)
    }

    post_orden_recursivo(raiz){
        //izquierdo ->derecho ->raiz
        if (raiz) {
            this.post_orden_recursivo(raiz.izquierdo)
            this.post_orden_recursivo(raiz.derecho)
            console.log("dpi:"+raiz.dpi)
            console.log("nombre_autor:"+raiz.nombre_autor)
            console.log("correo:"+raiz.correo)
            console.log("direccion:"+raiz.direccion)
            console.log("telefono:"+raiz.telefono)
            console.log("biografia:"+raiz.biografia)
        }
    }

    obtener_codigo_Graphviz(){
        return this.raiz.graficar()
    }

    segundo_graficar(){

        return this.raiz.graficar2()
    }
    
    rebuscar(value){
        if (this.raiz==null) {
            return null
          }
      
          var aux = this.raiz
          if (aux.nombre_autor === value) {
            return aux
          }
      
          while(aux) {
            // si encontramos el nodo con el valor
            // paramos de iterar.
            if (aux.nombre_autor === value) {
              break
            }
            // seguimos buscando a la derecha
            if (aux.nombre_autor < value) {
              aux = aux.derecho
            } else if (aux.nombre_autor > value) {
              // seguimos buscando a la izquierda
              aux = aux.izquierdo
            }
          }
          // retornamos el nodo encontrado.
          // si no encontramos el nodo con el valor
          // aux, toma el valor null.
          return aux
    }
    buscar(value){
        console.log("_______ RESULTADO DE BÚSQUEDA ___________")
        var x = this.rebuscar(value)
        if (x!=null) {
            console.log("dpi : "+ x.dpi)
            console.log("nombre_autor : "+ x.nombre_autor)
            console.log("correo : "+ x.correo)
            console.log("direccion : "+ x.direccion)
            console.log("telefono : "+ x.telefono)
            console.log("biografia : "+ x.biografia)    
        }else{
            console.log("VALOR NO ENCONTRADO")
        }

            
        
    }
    
    
         
}

var arbol_binario = new Arbol_Binario()

arbol_binario.agregar(3109604185386,"Snider Underwood","sniderunderwood@zytrac.com","895 Barbey Street, Dixonville, Alabama, 580","+502 (983) 563-3560","Esse irure ex tempor occaecat magna incididunt. Exercitation dolore labore dolore magna nisi ullamco nulla. Do tempor commodo et velit officia deserunt.\r\n")
arbol_binario.agregar(3109604185386,"isai figueroa","sniderunderwood@zytrac.com","895 Barbey Street, Dixonville, Alabama, 580","+502 (983) 563-3560","Esse irure ex tempor occaecat magna incididunt. Exercitation dolore labore dolore magna nisi ullamco nulla. Do tempor commodo et velit officia deserunt.\r\n")
arbol_binario.agregar(3109604185386,"yes Underwood","sniderunderwood@zytrac.com","895 Barbey Street, Dixonville, Alabama, 580","+502 (983) 563-3560","Esse irure ex tempor occaecat magna incididunt. Exercitation dolore labore dolore magna nisi ullamco nulla. Do tempor commodo et velit officia deserunt.\r\n")
arbol_binario.agregar(3109604185386,"as Underwood","sniderunderwood@zytrac.com","895 Barbey Street, Dixonville, Alabama, 580","+502 (983) 563-3560","Esse irure ex tempor occaecat magna incididunt. Exercitation dolore labore dolore magna nisi ullamco nulla. Do tempor commodo et velit officia deserunt.\r\n")
arbol_binario.agregar(3109604185386,"tl Underwood","sniderunderwood@zytrac.com","895 Barbey Street, Dixonville, Alabama, 580","+502 (983) 563-3560","Esse irure ex tempor occaecat magna incididunt. Exercitation dolore labore dolore magna nisi ullamco nulla. Do tempor commodo et velit officia deserunt.\r\n")
arbol_binario.agregar(3109604185386,"s Underwood","sniderunderwood@zytrac.com","895 Barbey Street, Dixonville, Alabama, 580","+502 (983) 563-3560","Esse irure ex tempor occaecat magna incididunt. Exercitation dolore labore dolore magna nisi ullamco nulla. Do tempor commodo et velit officia deserunt.\r\n")



//console.log("Metodo preorden:\n")
//arbol_binario.pre_orden()

//console.log("****************\nMetodo inorden:\n")
//arbol_binario.inorden()

//console.log("****************\nMetodo postorden:\n")
//arbol_binario.post_orden()


//console.log("__________________ Código de Graphviz __________________\n")

//arbol_binario.obtener_codigo_Graphviz()

//arbol_binario.buscar("PEPE")

