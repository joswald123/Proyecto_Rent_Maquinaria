// Funcion para crear las filas de la tabla alimentada por la funcion machineTable 
var createRow = function(items) {
    // creamos unanueva fila en la tabla
    for(i=0;i<items.length;i++){
        
        var tRow = $("<tr>");

        var idTd = $("<td>").text(items[i].id);
        var messageTd = $("<td>").text(items[i].messagetext);
        var buttonDelete = "<button onclick='deleteMachine("+items[i].id+")'>Borrar</button>";
        
        
        

        tRow.append(idTd);
        tRow.append(messageTd);
        tRow.append(buttonDelete);
        
        $("tbody").append(tRow)

    }

    
}
// Funcion que consulta toda la info de la tabla machine SQL Cloud
var messageTable = function(){
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message";
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

messageTable()


// Funcion para guardar informacion

$('#submitButton').on('click', function(){

    var messageToAdd = {

        id:$("#id").val(),
        messagetext: $("#messagetext").val(),

    };

    let dataToSend =JSON.stringify(messageToAdd);
    
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message";
    $.ajax({
        url: queryURL,
        type: "POST",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            $("#resultado").empty();
            console.log(response)
            messageTable();
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });


});

// Funcion para editar info

$('#updateButton').on('click', function(){

    var messageToAdd = {

        id:$("#id").val(),
        messagetext: $("#messagetext").val(),

    };

    let dataToSend =JSON.stringify(messageToAdd);
    
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message";
    $.ajax({
        url: queryURL,
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            $("#resultado").empty();
            $("#messagetext").val(),
            messageTable();
            alert("Se ha actualizado");
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

});


// funcion para eliminar info
function deleteMachine(idMessage){
    
    let myData={
        id:idMessage
    };

    let dataToSend=JSON.stringify(myData);
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message";
    $.ajax({
        url: queryURL,
        type:"DELETE",
		data:dataToSend,
		contentType:"application/JSON",
		datatype:"JSON",
        success: function(response){
            $("#resultado").empty();
            console.log(response)
            messageTable();
            alert("Se Ha Eliminado");
            
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

}


