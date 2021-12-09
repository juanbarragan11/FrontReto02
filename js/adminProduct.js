function saveProduct(){
    console.log("Ejecutando funcion para guardar");
    
    let product1 = {
        reference: $("#idReference").val(),
        category: $("#idCategory").val(),
        description: $("#idDescription").val(),
        availability: $("#idAvailability").val(),
        price: $("#idPrice").val(),
        quantity: $("#idQuantity").val(),
        photography: $("#idUrl").val()
    };
    

    console.log(product1);
    if (validateProduct(product1)){  
        $.ajax({
            url: "http://localhost:8081/api/chocolate/new",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(product1),
            statusCode:{
                201:function(){
                    alert('Producto (Creado/Actualizado) de forma correcta');
                    allProducts();
                    }
                },
            });

    }else{
        alert("Error, no fue posible registrar el producto, verifique los campos digitados");
    }
}


function allProducts(){
    $.ajax({
        url: "http://localhost:8081/api/chocolate/all",
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            console.log(respuesta)
            listAllProducts(respuesta);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}


function listAllProducts(response){
    let myTable="<table table-bordered>";
    myTable= "<thead thead-dark>";
    myTable+="<tr>";
        myTable+="<th col>Referencia</th>";
        myTable+="<th col>Categoria</th>";
        myTable+="<th col>Descripcion</th>";
        myTable+="<th col>Disponibilidad</th>";
        myTable+="<th col>Precio</th>";
        myTable+="<th col>Cantidad</th>";
        myTable+="<th col>URL</th>";
        myTable+="<th col>Actualizar</th>";
        myTable+="<th col>Borrar</th>";
        "</thead>"
     "</tr>";
      
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+response[i].reference+"</td>";
        myTable+="<td>"+response[i].category+"</td>";
        myTable+="<td>"+response[i].description+"</td>";
        myTable+="<td>"+response[i].availability+"</td>"
        myTable+="<td>"+response[i].price+"</td>";
        myTable+="<td>"+response[i].quantity+"</td>";
        myTable+="<td>"+response[i].photography+"</td>"
       ;
       myTable+='<td><button class="btn btn-danger" onclick="updateProduct(' + response[i].reference + ')">Editar User</button></td>';
       myTable+='<td><button class="btn btn-success" onclick="removeUser(' + response[i].reference + ')">Borrar User</button></td>';
       myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listProductsAll").html(myTable);
}


function updateProduct() {
    alert("Digite la referencia y los campos a editar y seleccione el boton verde para efectuar los cambios");
}

function removeUser(reference){
    $.ajax({
        url: "http://localhost:8081/api/chocolate/"+reference,
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json",
        statusCode:{
            204:function(){
                alert("Dato eliminado");
                allProducts();
            }
            },
        });
}

function validateProduct(product){
    if (product.reference==="" || product.category==="" || product.description==="" || product.price===""  || product.availability==="" || product.quantity==="" || product.photography===""){
        alert("Procure no dejar campos vacíos")
        return false;
    }
    return true;
}