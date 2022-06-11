const jsonData= require('./TEST/libros.json'); 
console.log("__________ EL CONTENIDO DEL JSON ES __________")
console.log(jsonData);

console.log("__________ DATOS DEL PRIMER LIBRO __________")
console.log(jsonData[0].isbm);
console.log(jsonData[0].nombre_autor);
console.log(jsonData[0].nombre_libro);
console.log(jsonData[0].cantidad);
console.log(jsonData[0].fila);
console.log(jsonData[0].columna);
console.log(jsonData[0].paginas);
console.log(jsonData[0].categoria);

