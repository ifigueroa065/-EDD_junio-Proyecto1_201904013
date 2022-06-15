class Node {
    constructor(data, next, prev) {
        this.data = data;
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

    addToHead(data) {
        const newNode = new Node(data, this.head, null);

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

    addToTail(data) {
        const newNode = new Node(data, null, this.tail);

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

    insertAt(data, index) {
        if (index < 0 || index > this.size) {
            return null
        };

        const newNode = new Node(data, null, null);
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

        const valueToReturn = this.head.data;

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

        const valueToReturn = this.tail.data;

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
            console.log(temp.data)
            temp=temp.next
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
        
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" + temporal.data + "\" ];\n"
            if(temporal.next != null){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
                conexiones += "N" + auxnum + " -> N" + numnodo + ";\n"
            }
            temporal = temporal.next
            numnodo++;            
        }
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

const doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.addToTail(3);
doubleLinkedList.addToTail(2);
doubleLinkedList.addToTail(7);
doubleLinkedList.addToTail(8);


console.log(doubleLinkedList.getSize());

console.log(doubleLinkedList.print())

doubleLinkedList.mostrar()
doubleLinkedList.graficar()