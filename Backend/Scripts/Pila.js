class Node_Pila {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Stack {
    
    constructor(){
        this.first = null
        this.last = null
        this.size = 0
    }
    
    push(val){
        var newNode = new Node_Pila(val)
        if(!this.first){
            this.first = newNode
            this.last = newNode
        } else {
            var temp = this.first
            this.first = newNode
            this.first.next = temp
        }
        return ++this.size
    }
    pop(){
        if(!this.first) return null
        var temp = this.first
        if(this.first === this.last){
            this.last = null
        }
        this.first = this.first.next
        this.size--
        return temp.value
    }

    mostrar(){
        var temp = this.first

        while(temp!=null){
            console.log(temp.value)
            temp=temp.next
        }
        console.log("Primero: "+this.first.value)
    }

    graficar(){
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "PILA" + "\";\n";
        var temporal = this.first
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" + temporal.value + "\" ];\n"
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
        codigodot += "{rankdir=\"TB\";\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#lienzo_ejemplar").graphviz()
            .width(800)
            .height(600)
            .renderDot(codigodot)
    }

    
}

/** 
const stck = new Stack

stck.push("value1")
stck.push("value2")
stck.push("value3")
stck.push("value4")

stck.mostrar()
stck.graficar()*/
