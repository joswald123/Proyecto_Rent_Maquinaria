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
        var buttonDelete = "<button onclick='deleteMachine("+items[i].id+")'>Borrar</button>";
        
        
        

        tRow.append(idTd);
        tRow.append(nameTd);
        tRow.append(brandTd);
        tRow.append(modelTd);
        tRow.append(categoryIdTd);
        tRow.append(buttonDelete);
        
        $("tbody").append(tRow)

    }
    cleanInfo();
    
}
// Funcion que consulta toda la info de la tabla machine SQL Cloud
var machineTable = function(){
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/machine/machine";
    $.ajax({
        url: queryURL,
        method: "GET",
        datatype:"JSON",
        success:function(response){
            createRow(response.items);
            console.log(response.items);
            
        }
    });
};

machineTable()


// Funcion para guardar informacion

$('#submitButton').on('click', function(){

    var machineToAdd = {

        id:$("#id").val(),
        brand: $("#brand").val(),
        model: $("#model").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val(),

    };

    let dataToSend =JSON.stringify(machineToAdd);
    
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/machine/machine";
    $.ajax({
        url: queryURL,
        type: "POST",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            $("#resultado").empty();
            console.log(response)
            machineTable();
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });


});

// Funcion para editar info

$('#updateButton').on('click', function(){

    var machineToAdd = {

        id:$("#id").val(),
        brand: $("#brand").val(),
        model: $("#model").val(),
        category_id: $("#category_id").val(),
        name: $("#name").val(),

    };

    let dataToSend =JSON.stringify(machineToAdd);
    
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/machine/machine";
    $.ajax({
        url: queryURL,
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            $("#resultado").empty();
            $("#id").val(),
            $("#brand").val(),
            $("#model").val(),
            $("#category_id").val(),
            $("#name").val(),
            machineTable();
            alert("Se ha actualizado");
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

});


// funcion para eliminar info
function deleteMachine(idMachine){
    
    let myData={
        id:idMachine
    };

    let dataToSend=JSON.stringify(myData);
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/machine/machine";
    $.ajax({
        url: queryURL,
        type:"DELETE",
		data:dataToSend,
		contentType:"application/JSON",
		datatype:"JSON",
        success: function(response){
            $("#resultado").empty();
            console.log(response)
            machineTable();
            alert("Se Ha Eliminado");
            
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

}

function cleanInfo(){
    var activo = document.activeElement.id;
    activo.innerHTML = "";
}




