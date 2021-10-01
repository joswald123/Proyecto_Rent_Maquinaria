/* esta funcion llama la funcion pintar respuesta que tiene la tabla para mostrar y llama los datos de la tabla cuando damoos click boton consultar */

function traerInformacion(){
    $.ajax({
        url:"https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/machine/machine",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta.items);
    
        }
    
    });

}

/*muestras los datos en la tabla*/

function pintarRespuesta(items){
    let myTable="<table>"
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"<td>";
        myTable+="<td>"+items[i].name+"<td>";
        myTable+="<td>"+items[i].brand+"<td>";
        myTable+="<td>"+items[i].model+"<td>";
        myTable+="<td>"+items[i].category_id+"<td>";
        myTable+="<td> <button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
    }		

    myTable+="</table>" 
    $("#resultado").append(myTable);

}

