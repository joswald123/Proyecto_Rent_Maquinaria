// URL variable constante
const queryURL = 'http://129.151.115.16:8080/api/Category';

$(document).ready(function () {
    categoryTable()
});

// Funcion para crear las filas de la tabla alimentada por la funcion CategoryTable 
var createRow = function(items) {
    // creamos unanueva fila en la tabla
    for(i=0;i<items.length;i++){
        
        var tRow = $("<tr>");

        var idTd = $("<td>").text(items[i].id);
        var nameTd = $("<td>").text(items[i].name);
        var descriptionTd = $("<td>").text(items[i].description);
        var buttonDelete = '<button onclick="deleteMachine('+items[i].id+')" class="btn btn-danger" >Borrar</button>';
        var buttonUpdate = '&nbsp;&nbsp;'+'<button onclick="loadDataForm(' + items[i].id + ')" class="btn btn-success" > Editar </button>';


        tRow.append(idTd);
        tRow.append(nameTd);
        tRow.append(descriptionTd);
        tRow.append(buttonDelete);
        tRow.append(buttonUpdate);
        
        $("tbody").append(tRow)

    }

    
}
// Funcion que consulta toda la info de la tabla machine SQL Cloud
var categoryTable = function(){
    
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

    var categoryToAdd = {

        id:$("#id_category").val(),
        name: $("#name_category").val(),
        description: $("#description_category").val(),

    };

    let dataToSend =JSON.stringify(categoryToAdd);
    
    $.ajax({
        url: queryURL + '/save',
        type: "POST",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            $("#resultado").empty();
            console.log(response)
            categoryTable();
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });


});

// Funcion para editar info

$('#updateButton').on('click', function(){

    var categoryToAdd = {

        id:$("#id_category").val(),
        name: $("#name_category").val(),

    };

    let dataToSend =JSON.stringify(categoryToAdd);
    
    $.ajax({
        url: queryURL + '/update',
        type: "PUT",
        data: dataToSend,
        contentType: 'application/json',

        success: function(response){
            $("#resultado").empty();
            $("#id_category").val(),
            $("#name_category").val(),
            categoryTable();
            alert("Se ha actualizado");
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

});


// funcion para eliminar info
function deleteCategory(idCategory){
    
    let myData={
        id:idCategory
    };

    let dataToSend=JSON.stringify(myData);

    $.ajax({
        url: queryURL+'/'+idCategory,
        type:"DELETE",
		data:dataToSend,
		contentType:"application/JSON",
		datatype:"JSON",
        success: function(response){
            $("#resultado").empty();
            console.log(response)
            categoryTable();
            alert("Se Ha Eliminado");
            
        },
        error: function(jqXHR, textStatus, errorThrown){

        }
    });

}

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
