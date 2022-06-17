public void Graficar(String DotName){
        StringBuilder g = new StringBuilder();
        g.append("digraph G{\n");
        g.append("node[shape = box fillcolor = lightsalmon style = filled]\n");
        g.append("subgraph cluster_m{\n");
        g.append("bgcolor = \"#FFFFFF\"\n");
        g.append("Nodo").append(raiz.hashCode()).append("[label = \"Raiz\", group = 1];\n");
        g.append("edge[dir=\"both\"]");
        Pixel fila = raiz.abajo;
        String nombres = ""; 
        String uniones = "";
        String conexiones = "";
         String rank2 = "";
        while(fila != null){
            
            nombres += "Nodo" + fila.hashCode() + "[label = \"Fila " + fila.j + "\", group = 1];\n";
            rank2 += "{rank=same;Nodo" + fila.hashCode();

            /*if (fila.arriba != null) {
                uniones += String.format("Nodo%d -> Nodo%d", fila.hashCode(), fila.arriba.hashCode()) + ";\n";
            }*/
            if (fila.abajo != null) {
                uniones += String.format("Nodo%d -> Nodo%d", fila.hashCode(), fila.abajo.hashCode()) + ";\n";
            }
            if (fila.siguiente != null) {
                conexiones += String.format("Nodo%d -> Nodo%d", fila.hashCode(), fila.siguiente.hashCode()) + ";\n";
                Pixel nodo = fila.siguiente;
                while (nodo != null) {
                    rank2 += ";Nodo" + nodo.hashCode();
                    if (nodo.siguiente != null) {
                        conexiones += String.format("Nodo%d -> Nodo%d", nodo.hashCode(), nodo.siguiente.hashCode()) + ";\n";
                    }
                    nodo = nodo.siguiente;
                }
            }
            rank2 += "}\n";
            fila = fila.abajo;
        }
        g.append(nombres);
        g.append(uniones);
        
        Pixel columna = raiz.siguiente;
        int contador = 2;
        nombres = "";
        uniones = "";
        String nodos = "";
        String conexiones2 = "";
        String rank = "{rank=same;Nodo" + raiz.hashCode();
        while(columna != null){
            rank += ";Nodo" + columna.hashCode();
            nombres += "Nodo" + columna.hashCode() + "[label = \"Columna " + columna.i + "\", group = " + contador + "];\n";
            
            if (columna.siguiente != null) {
                uniones += String.format("Nodo%d -> Nodo%d", columna.hashCode(), columna.siguiente.hashCode()) + ";\n";
            }/*
            if (columna.anterior != null) {
                uniones += String.format("Nodo%d -> Nodo%d", columna.hashCode(), columna.anterior.hashCode()) + ";\n";
            }*/
            
            if (columna.abajo != null) {
                conexiones2 += String.format("Nodo%d -> Nodo%d", columna.hashCode(), columna.abajo.hashCode()) + ";\n";
                Pixel nodo = columna.abajo;
                while(nodo != null){
                    nodos += "Nodo" + nodo.hashCode() + "[label = \"         \", group = " + contador + ", fillcolor = \"" + nodo.color + "\"];\n";
                    if (nodo.abajo != null) {
                        conexiones2 += String.format("Nodo%d -> Nodo%d", nodo.hashCode(), nodo.abajo.hashCode()) + ";\n";
                    }
                    nodo = nodo.abajo;
                }
            }
            contador ++;
            columna = columna.siguiente;
        }
        rank += "}\n";
        g.append(nombres);
        g.append(uniones);
        fila = raiz.abajo;
        columna = raiz.siguiente;
        if (fila != null) {
            g.append("Nodo").append(raiz.hashCode()).append(" -> Nodo").append(fila.hashCode()).append(";\n");
        }
        if (columna != null) {
            g.append("Nodo").append(raiz.hashCode()).append(" -> Nodo").append(columna.hashCode()).append(";\n");
            
        }
        g.append(rank);
        g.append(nodos);
        g.append(conexiones);
        g.append(rank2);
        g.append(conexiones2);
        g.append("\n}");
        g.append("\n}");
        
        //CREACIÓN DEL .DOT Y DEL PNG DE GRAPHVIZ
        String Name = DotName;
        String PictureName = DotName + ".png";
        DotName += ".dot";

        try {
            File archivo = new File(DotName);
            FileWriter w = new FileWriter(archivo);
            BufferedWriter buffer = new BufferedWriter(w);
            buffer.write(g.toString());
            buffer.close();

            ProcessBuilder builder = new ProcessBuilder("dot", "-Tpng", "-o", PictureName, DotName);
            builder.redirectErrorStream(true);
            builder.start();
            System.out.println("Se generó: " + Name);
        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }
    }