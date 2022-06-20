class Node_Simple {
   
    constructor(isbn,nombre_autor,nombre_libro,cantidad,paginas,categoria){
        this.isbn=isbn
        this.nombre_autor=nombre_autor
        this.nombre_libro=nombre_libro
        this.cantidad=cantidad
        this.paginas=paginas
        this.categoria=categoria
        this.next = null
    }
}


class Lista_libs {
  
    constructor(){
        this.first = null
        this.last = null
        this.size = 0
    }
    
    encolar(isbn,nombre_autor,nombre_libro,cantidad,paginas,categoria){
        var newNode = new Node_Simple(isbn,nombre_autor,nombre_libro,cantidad,paginas,categoria)
        if(!this.first){
            this.first = newNode
            this.last = newNode
        } else {
            this.last.next = newNode
            this.last = newNode
        }
        return ++this.size
    }

    desencolar(){
        if(!this.first) return null

        var temp = this.first
        if(this.first === this.last) {
            this.last = null
        }
        this.first = this.first.next
        this.size--
        return temp.value
    }

    mostrar(){
        var temp = this.first
        console.log("____________ COLA DE LIBROS ______________")
        while(temp!=null){
            console.log("ISBN: " + temp.isbn)
            console.log("Nombre: " + temp.nombre_autor)
            console.log("Libro: " + temp.nombre_libro)
            console.log("Cantidad: " + temp.cantidad)
            console.log("________________________")
            temp=temp.next
        }
        console.log("Primero: "+this.first.nombre_autor)
    }
    buscar(nombre){
        var temp = this.first
        console.log("____________ COLA DE LIBROS ______________")
        while(temp!=null){
            if(nombre==temp.nombre_libro){
                return temp.cantidad
            }
            temp=temp.next
        }
        console.log("Primero: "+this.first.nombre_autor)
    }

    graficar(){
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#819BE1\", shape=box];";
        codigodot +="label=\"" + "Cola de libros " + "\";\n";
        var temporal = this.first
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" 
            +"Nombre_libro:"+ temporal.nombre_libro +"\n"
            +"isbn:"+ temporal.isbn +"\n"
            +"Páginas:"+ temporal.paginas
            + "\" ];\n"
            if(temporal.next != null){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
            }
            temporal = temporal.next
            numnodo++;            
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#lienzo_libros").graphviz()
            .width(800)
            .height(200)
            .renderDot(codigodot)
    }

    bubbleSort() {
        var t=0;
        do{
            var act = this.first;//aux esta en el primer nodo
            var sig = act.next;//esta en el siguiente nodo 
            while(act.next != null)
            {
                if(act.nombre_libro.replace(/ /g, "") > sig.nombre_libro.replace(/ /g, ""))
                {
                    //guardo valores actuales
                    var auxnombrelib =act.nombre_libro; 
                    var auxisbn= act.isbn;
                    var auxpaginas= act.paginas;
                    var auxcantidad = act.cantidad;
                    var auxautor = act.nombre_autor;
                    var auxcategoria = act.categoria;
                    
                    
                    //se hace cambio de actual==siguiente
                    act.nombre_libro= sig.nombre_libro;
                    act.isbn= sig.isbn;
                    act.paginas= sig.paginas;
                    act.cantidad = sig.cantidad;
                    act.nombre_autor = sig.nombre_autor;
                    act.categoria= sig.categoria;

                    //se hace seteo de siguiente == actual
                    sig.nombre_libro= auxnombrelib;
                    sig.isbn= auxisbn
                    act.paginas=auxpaginas;
                    sig.cantidad = auxcantidad;
                    sig.nombre_autor = auxautor;
                    sig.categoria=auxcategoria
                    
                    
                    //pasa a la siguiente comparación
                    act = act.next;
                    sig = sig.next;
                }
                else
                { 
                    //pasa a la siguiente comparación
                    act = act.next;
                    sig = sig.next;
                }
            }
            t++;
        }while(t<=this.size);
        this.mostrar()
    }

    
    paritionLast( start,  end) {
        if (start == end || start == null || end == null)
            return start;
 
        var pivot_prev = start;
        var curr = start;

        var pivot_nombre_lib =end.nombre_libro
        var pivot_cantidad = end.cantidad;
        var pivot_nombre_autor = end.nombre_autor;
        var pivot_isbn =end.isbn
        var pivot_paginas = end.paginas;
        var pivot_categoria = end.categoria;
        

        while (start != end) {
            var x1=start.nombre_libro
            var x2=pivot_nombre_lib
            if (x1.replace(/ /g, "") > x2.replace(/ /g, "")) {
                
                pivot_prev = curr;

                var aux_nombrelib = curr.nombre_libro
                var aux_cantidad = curr.cantidad;
                var aux_autor = curr.nombre_autor
                var aux_isbn=curr.isbn
                var aux_categoria= curr.categoria
                var aux_paginas = curr.paginas
                

                curr.nombre_libro=start.nombre_libro;
                curr.cantidad = start.cantidad;
                curr.nombre_autor=start.nombre_autor;
                curr.isbn=start.isbn;
                curr.paginas = start.paginas;
                curr.categoria=start.categoria;

                
                start.nombre_libro = aux_nombrelib
                start.cantidad = aux_cantidad;
                start.nombre_autor= aux_autor;
                start.isbn = aux_isbn
                start.paginas = aux_paginas;
                start.categoria= aux_categoria;
                
                curr = curr.next;
            }
            start = start.next;
        }
 
        
        var aux_nombrelib2 = curr.nombre_libro
        var aux_cantidad2 = curr.cantidad;
        var aux_autor2 = curr.nombre_autor
        var aux_isbn2 = curr.isbn;
        var aux_paginas2 = curr.paginas
        var aux_categoria2 = curr.categoria

        curr.nombre_libro=pivot_nombre_lib
        curr.cantidad = pivot_cantidad;
        curr.nombre_autor= pivot_nombre_autor;
        curr.isbn=pivot_isbn
        curr.paginas = pivot_paginas;
        curr.categoria= pivot_categoria;
        

        end.nombre_libro = aux_nombrelib2;
        end.cantidad = aux_cantidad2;
        end.nombre_autor = aux_autor2;
        end.isbn = aux_isbn2;
        end.paginas = aux_paginas2;
        end.categoria = aux_categoria2;
        
 
        
        return pivot_prev;
    }


    Quicksort( start,  end) {
        if (start == null || start == end || start == end.next)
            return;
 

        var pivot_prev = this.paritionLast(start, end);
        this.Quicksort(start, pivot_prev);
 
       
        if (pivot_prev != null && pivot_prev == start)
            this.Quicksort(pivot_prev.next, end);
 
        
        else if (pivot_prev != null && pivot_prev.next != null)
            this.Quicksort(pivot_prev.next.next, end);

        
    }
}

/** 
const quickQueue = new Lista_libs

quickQueue.encolar(1213,"naadas","piuqw",15,168,"asjfh")
quickQueue.encolar(1213,"naadas","asd",15,168,"asjfh")
quickQueue.encolar(1213,"naadas","tyu",15,168,"asjfh")
quickQueue.encolar(1213,"naadas","ea",15,168,"asjfh")
quickQueue.encolar(1213,"naadas","bt",15,168,"asjfh")
quickQueue.encolar(1213,"naadas","zkj",15,168,"asjfh")



//quickQueue.mostrar()
quickQueue.Quicksort(quickQueue.first,quickQueue.last)
quickQueue.mostrar()
//console.log("__________ BUBBLESORT _________________")
//quickQueue.bubbleSort()
//quickQueue.graficar()
**/ 
