// URL variable constante
const queryURL = 'http://129.151.115.16:8080/api/Message';

$(document).ready(function () {
    messageTable();
    loadMachine();
});

// Funcion para crear las filas de la tabla alimentada por la funcion machineTable 

var createRow = function(items) {
    // creamos unanueva fila en la tabla
    for(i=0;i<items.length;i++){
        
        var tRow = $("<tr>");

        var idTd = $("<td>").text(items[i].id);
        var messageTd = $("<td>").text(items[i].messagetext);
        var clientNameTd = $("<td>").text(items[i].client["name"]);
        var machineNameTd = $("<td>").text(items[i].machine["name"]);
        var buttonDelete = "<button onclick='deleteMessage("+items[i].id+")'>Borrar</button>";
        

        tRow.append(idTd);
        tRow.append(messageTd);
        tRow.append(clientNameTd);
        tRow.append(machineNameTd);
        tRow.append(buttonDelete);
        
        $("tbody").append(tRow)

    }

    
}

// Funcion para cargar informacion de la tabla Maquina
function loadMachine() {
    $.ajax({
        url: 'http://129.151.115.16:8080/api/Machine/all',
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var myItems = response;
            console.log(myItems)
            var valor = '<option selected>Select one</option>';
            for (i = 0; i < myItems.length; i++) {
                valor += '<option value="' + myItems[i].id + '">' + myItems[i].name + '</option></td>';
            }
            $('#machine_id').html(valor);
        }
    });
}

// Funcion que consulta toda la info de la tabla machine SQL Cloud
var messageTable = function(){

    $.ajax({
        url: queryURL + '/all',
        method: "GET",
        datatype:"JSON",
        success:function(response){
            var items = response;
            createRow(items);
            console.log(items);
            
        }
    });
};




// Funcion para guardar informacion

$('#submitButton').on('click', function(){

    var messageToAdd = {

        id:$("#id").val(),
        messagetext: $("#messagetext").val(),
        client: {idClient: $('#client_id').val()},  
        machine: {id: $('select[id=machine_id]').val()}    

    };

    let dataToSend =JSON.stringify(messageToAdd);
    
    $.ajax({
        url: queryURL + '/save',
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
    
    $.ajax({
        url: queryURL + '/update',
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            $("#resultado").empty();
            $("#id").val(),
            $("#messagetext").val(),
            messageTable();
            alert("Se ha actualizado");
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

});


// funcion para eliminar info
function deleteMessage(idMessage){
    
    let myData={
        id:idMessage
    };

    let dataToSend=JSON.stringify(myData);
    
    $.ajax({
        url: queryURL +'/'+idMessage,
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


