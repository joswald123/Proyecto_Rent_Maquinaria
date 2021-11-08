// URL variable constante
const queryURL = 'http://129.151.115.16:8080/api/Machine';

$(document).ready(function () {
    machineTable();
    loadCategory();
});

// Funcion para crear las filas de la tabla alimentada por la funcion machineTable 
var createRow = function(items) {
    // creamos unanueva fila en la tabla
    
    for(i=0;i<items.length;i++){
        
        var tRow = $("<tr>");

        var idTd = $("<td>").text(items[i].id);
        var nameTd = $("<td>").text(items[i].name);
        var brandTd = $("<td>").text(items[i].brand);
        var modelTd = $("<td>").text(items[i].year);
        var descriptionTd = $("<td>").text(items[i].description);
        var categoryNameTd = $("<td>").text(items[i].category["name"]);
        var buttonDelete = '<button onclick="deleteMachine('+items[i].id+')" class="btn btn-danger" >Borrar</button>';
        var buttonUpdate = '&nbsp;&nbsp;'+'<button onclick="loadDataForm(' + items[i].id + ')" class="btn btn-success" > Editar </button>';
        

        tRow.append(idTd);
        tRow.append(nameTd);
        tRow.append(brandTd);
        tRow.append(modelTd);
        tRow.append(descriptionTd);
        tRow.append(categoryNameTd);
        tRow.append(buttonDelete);
        tRow.append(buttonUpdate);
        
        $("tbody").append(tRow)

    }
    cleanInfo();
    
}

// Funcion para cargar informacion de la tabla categoria
function loadCategory() {
    $.ajax({
        url: 'http://129.151.115.16:8080/api/Category/all',
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var myItems = response;
            console.log(myItems)
            var valor = '<option selected>Select one</option>';
            for (i = 0; i < myItems.length; i++) {
                valor += '<option value="' + myItems[i].id + '">' + myItems[i].name + '</option></td>';
            }
            $('#category_id').html(valor);
        }
    });
}


// Funcion que consulta toda la info de la tabla machine SQL Cloud
var machineTable = function(){

    $.ajax({
        url: queryURL + '/all',
        method: "GET",
        datatype:"JSON",
        success:function(response){
            var items = response;
            createRow(items);
            cleanInfo()
            console.log(items);
            
        }
    });
};


// Funcion para guardar informacion

$('#submitButton').on('click', function(){

    var machineToAdd = {

        id:$("#id").val(),
        brand: $("#brand").val(),
        year: $("#year").val(),
        name: $("#name").val(),
        description: $("#description").val(),
        category: {id: $('select[id=category_id]').val()}    

    };

    let dataToSend =JSON.stringify(machineToAdd);
    
    $.ajax({
        url: queryURL + '/save',
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

function updateMachine(idMachine){

    var machineToAdd = {

        id:idMachine,
        brand: $("#brand").val(),
        year: $("#year").val(),
        name: $("#name").val(),
        description: $("#description").val(),
        category: {id: $('select[id=category_id]').val()} 

    };

    let dataToSend =JSON.stringify(machineToAdd);
    
    
    $.ajax({
        url: queryURL + '/update',
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            console.log(response);
            // $("#resultado").empty();
            // $("#id").val(),
            // $("#brand").val(),
            // $("#year").val(),
            // $("#category_id").val(),
            // $("#description").val(),
            // $("#name").val(),
            machineTable();
            alert("Se ha actualizado");
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

};


// funcion para eliminar info
function deleteMachine(idMachine){
    
    let myData={
        id:idMachine
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url: queryURL+'/'+idMachine,
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

};

//Funcion para cargar la info y editarla
function loadDataForm(idMachine) {
    $.ajax({
        url: queryURL + '/' + idMachine,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            console.log(response);
            var items = response;
            var valor = '<input type="submit" id="btnUpdate" onclick="updateMachine(' + myItem.id + ')" value="Actualizar" class="btn btn-warning" />';
            $("#id").val(items.id);
            $('#brand').val(items.brand);
            $('#year').val(items.year);
            $('#name').val(items.name);
            $('#description').val(items.description);

            $('#btnCreate').remove();
            $('#btnForm').html(valor);
            $("#id").prop('disabled', true);
        }
    });
}

// Limpiar datos del input
function cleanInfo(){
    $('#formMachine')[0].reset();
}




