// Funcion para crear las filas de la tabla alimentada por la funcion machineTable 
var createRow = function(items) {
    // creamos unanueva fila en la tabla
    for(i=0;i<items.length;i++){
        
        var tRow = $("<tr>");

        var idTd = $("<td>").text(items[i].id);
        var nameTd = $("<td>").text(items[i].name);
        var brandTd = $("<td>").text(items[i].brand);
        var modelTd = $("<td>").text(items[i].model);
        var categoryIdTd = $("<td>").text(items[i].category_id);
        

        tRow.append(idTd);
        tRow.append(nameTd);
        tRow.append(brandTd);
        tRow.append(modelTd);
        tRow.append(categoryIdTd);
        
        $("tbody").append(tRow)

    }
    
}
// Funcion que consulta toda la info de la tabla machine SQL Cloud
var machineTable = function(){
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/machine/machine";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        createRow(response.items);
        console.log(response.items);
    });
};

machineTable()

