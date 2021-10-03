// Funcion para crear las filas de la tabla alimentada por la funcion machineTable 
var createRow = function(items) {
    // creamos unanueva fila en la tabla
    for(i=0;i<items.length;i++){
        
        var tRow = $("<tr>");

        var idTd = $("<td>").text(items[i].id);
        var nameTd = $("<td>").text(items[i].name);
        var emailTd = $("<td>").text(items[i].email);
        var ageTd = $("<td>").text(items[i].age);
        var buttonDelete = "<button onclick='deleteMachine("+items[i].id+")'>Borrar</button>";
        
        
        

        tRow.append(idTd);
        tRow.append(nameTd);
        tRow.append(emailTd);
        tRow.append(ageTd);
        tRow.append(buttonDelete);
        
        $("tbody").append(tRow)

    }

    
}
// Funcion que consulta toda la info de la tabla machine SQL Cloud
var clientTable = function(){
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client";
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

clientTable()


// Funcion para guardar informacion

$('#submitButton').on('click', function(){

    var clientToAdd = {

        id:$("#id").val(),
        email: $("#email").val(),
        age: $("#age").val(),
        name: $("#name").val(),

    };

    let dataToSend =JSON.stringify(clientToAdd);
    
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client";
    $.ajax({
        url: queryURL,
        type: "POST",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            $("#resultado").empty();
            console.log(response)
            clientTable();
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });


});

// Funcion para editar info

$('#updateButton').on('click', function(){

    var machineToAdd = {

        id:$("#id").val(),
        email: $("#email").val(),
        age: $("#age").val(),
        name: $("#name").val(),

    };

    let dataToSend =JSON.stringify(machineToAdd);
    
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client";
    $.ajax({
        url: queryURL,
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            $("#resultado").empty();
            $("#id").val(),
            $("#email").val(),
            $("#age").val(),
            $("#name").val(),
            clientTable();
            alert("Se ha actualizado");
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

});


// funcion para eliminar info
function deleteMachine(idClient){
    
    let myData={
        id:idClient
    };

    let dataToSend=JSON.stringify(myData);
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client";
    $.ajax({
        url: queryURL,
        type:"DELETE",
		data:dataToSend,
		contentType:"application/JSON",
		datatype:"JSON",
        success: function(response){
            $("#resultado").empty();
            console.log(response)
            clientTable();
            alert("Se Ha Eliminado");
            
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

}



