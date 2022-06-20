class Node_TOP {
    constructor(nombre,cantidad, next, prev) {
        this.nombre = nombre;
        this.cantidad=cantidad
        this.next = next;
        this.prev = prev;
    };
};

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };

    addToHead(nombre,cantidad) {
        const newNode = new Node_TOP(nombre,cantidad, this.head, null);

        if (this.head) {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        } else {
            this.head = newNode;
            this.tail = newNode;
        };
        this.size++;
    };

    addToTail(nombre,cantidad) {
        const newNode = new Node_TOP(nombre,cantidad, null, this.tail);

        if (this.tail) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            this.tail = newNode;
            this.head = newNode;
        };
        this.size++;
    };

    insertAt(nombre,cantidad, index) {
        if (index < 0 || index > this.size) {
            return null
        };

        const newNode = new Node_TOP(nombre,cantidad, null, null);
        let current = this.head;
        let previous;

        if (index === 0) {
            newNode.next = current;
            current.prev = newNode;
            this.head = newNode;
        } else {
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            };

            newNode.next =current;
            newNode.prev = previous;
            current.prev = newNode;
            previous.next = newNode;
        };
        this.size++;
    };

    removeFromHead() {
        if (!this.head) {
            return null
        };

        const valueToReturn = this.head.nombre;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        };
        this.size--;
        return valueToReturn;
    }

    removeFromTail() {
        if (!this.tail) {
            return null
        };

        const valueToReturn = this.tail.nombre;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        };
        this.size--;
        return valueToReturn;
    };

    removeData(data) {
        let current = this.head;
        let previous = null;

        while(current !== null) {
            if (current.data === data) {
                if (!previous) {
                    this.removeFromHead();
                } else if (!current.next) {
                    this.removeFromTail();
                } else {
                    previous.next = current.next;
                    current.next.prev = previous;
                };
                this.size--;
                return current.data;
            };
            previous = current;
            current = current.next;
        };
        return null;
    }

    print() {
        let current = this.head;
        let result = '';
        while(current) {
            result += current.data + ' <-> ';
            current = current.next;
        };

        return result += ' X ';
    };

    reversePrint() {
        let current = this.tail;
        let result = '';
        while(current) {
            result += current.data + ' <-> ';
            current = current.next;
        };

        return result += ' X ';
    };

    getSize() {
        return this.size;
    };

    isEmpty() {
        return this.size === 0;
    };

    mostrar(){
        var temp = this.head

        while(temp!=null){
            console.log(temp.nombre)
            temp=temp.next
        }
        
    }

    mostrar_solo3(){
        var a = document.getElementById("usuarios_top")
        var cont=1;
        a.innerHTML=``
        

        var temp = this.head

        while(temp!=null){
            if (cont<=3) {
                a.innerHTML+=`<div class="col-sm-6 col-lg-4 all pizza">
                <div class="box">
                  <div>
                    <div class="img-box">
                      <img src="images/user.png" alt="">
                    </div>
                    <div class="detail-box">
                      <h5>
                        ${temp.nombre}
                      </h5>
                      <p>
                       Cantidad :${temp.cantidad}
                      </p>
                    </div>
                  </div>
                </div>
              </div>`
              cont++;
              temp=temp.next
            }else{
                break
            }
            
            
        }
        
    }

    graficar(){
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "DOBLE ENLAZADA" + "\";\n";
        var temporal = this.head
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        var conttops=1;
        
        while (temporal != null) {
            
            if(conttops<=3){
                nodos+=  "N" + numnodo + "[label=\"" +
                "Cliente :"+ temporal.nombre +"\n"+" Cantidad: "+temporal.cantidad
                + "\" ];\n"
                if(temporal.next != null && conttops!=3){
                    var auxnum = numnodo+1
                    conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                    conexiones += "N" + auxnum + " -> N" + numnodo + ";\n"
                }
                
            }else{
                break;
            }
            temporal = temporal.next
                numnodo++;     
                conttops++;
                   
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#lienzo_tops").graphviz()
            .width(1200)
            .height(500)
            .renderDot(codigodot)
    }

    bubbleSort() {
        var t=0;
        do{
            var act = this.head;//aux esta en el primer nodo
            var sig = act.next;//esta en el siguiente nodo 
            while(act.next != null)
            {
                if(act.cantidad < sig.cantidad)
                {
                    //guardo valores actuales    
                    var auxcantidad = act.cantidad;
                    var auxnombre = act.nombre_usuario;
                    
                    
                    //se hace cambio de actual==siguiente
                    act.cantidad = sig.cantidad;
                    act.nombre_usuario = sig.nombre_usuario;
                   

                    //se hace seteo de siguiente == actual
                    sig.cantidad = auxcantidad;
                    sig.nombre_usuario = auxnombre;
                    
                    
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
}

/** 
const doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.addToTail(3);
doubleLinkedList.addToTail(2);
doubleLinkedList.addToTail(7);
doubleLinkedList.addToTail(8);


console.log(doubleLinkedList.getSize());

console.log(doubleLinkedList.print())

doubleLinkedList.mostrar()
doubleLinkedList.graficar()

*/