// Funcion para crear las filas de la tabla alimentada por la funcion CategoryTable 
var createRow = function(items) {
    // creamos unanueva fila en la tabla
    for(i=0;i<items.length;i++){
        
        var tRow = $("<tr>");

        var idTd = $("<td>").text(items[i].id);
        var nameTd = $("<td>").text(items[i].name);
        var buttonDelete = "<button onclick='deleteCategory("+items[i].id+")'>Borrar</button>";
        
        
        

        tRow.append(idTd);
        tRow.append(nameTd);
        tRow.append(buttonDelete);
        
        $("tbody").append(tRow)

    }

    
}
// Funcion que consulta toda la info de la tabla machine SQL Cloud
var categoryTable = function(){
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/category/category";
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

categoryTable()


// Funcion para guardar informacion

$('#submitButton').on('click', function(){

    var categoryToAdd = {

        id:$("#id_category").val(),
        name: $("#name_category").val(),

    };

    let dataToSend =JSON.stringify(categoryToAdd);
    
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/category/category";
    $.ajax({
        url: queryURL,
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
    
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/category/category";
    $.ajax({
        url: queryURL,
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
    var queryURL = "https://g9004d44ee12137-db202109240616.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/category/category";
    $.ajax({
        url: queryURL,
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
