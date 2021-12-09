
function saveUser(){
    console.log("Ejecutando funcion para guardar");
    
    let userAd = {
        id: $("#idUser").val(),
        identification: $("#idIdentification").val(),
        name: $("#idUserName").val(),
        address: $("#idAddress").val(),
        cellPhone: $("#idNumber").val(),
        email: $("#idEmail").val(),
        password: $("#idPassword").val(),
        zone: $("#idZone").val(),
        type: $("#idType").val()
    };
    
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    console.log(userAd);
    if (validateUser(userAd)){
        if (emailRegex.test($("#idEmail").val())){   
        $.ajax({
            url: "http://localhost:8081/api/user/new",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(userAd),
            statusCode:{
                201:function(){
                    alert('Cuenta (Creada/Actualizada) de forma correcta');
                    allUsers();
                    }
                },
            });}else{
                alert("Email Invalido");
            }  
    }else{
        alert("Error, no fue posible registrar al usuario verifique los campos digitados");
    }
}

function allUsers(){
    $.ajax({
        url: "http://localhost:8081/api/user/all",
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            console.log(respuesta)
            listAllUsers(respuesta);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}


function listAllUsers(response){
    let myTable="<table table-bordered>";
    myTable= "<thead thead-dark>";
    myTable+="<tr>";
        myTable+="<th col>ID</th>";
        myTable+="<th col>Identificacion</th>";
        myTable+="<th col>Nombre</th>";
        myTable+="<th col>Direccion</th>";
        myTable+="<th col>Celular</th>";
        myTable+="<th col>Email</th>";
        myTable+="<th col>Contraseña</th>";
        myTable+="<th col>Zona</th>";
        myTable+="<th col>Tipo</th>";
        myTable+="<th col>Actualizar</th>";
        myTable+="<th col>Borrar</th>";
        "</thead>"
     "</tr>";
      
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+response[i].id+"</td>";
        myTable+="<td>"+response[i].identification+"</td>";
        myTable+="<td>"+response[i].name+"</td>";
        myTable+="<td>"+response[i].address+"</td>"
        myTable+="<td>"+response[i].cellPhone+"</td>";
        myTable+="<td>"+response[i].email+"</td>";
        myTable+="<td>"+response[i].password+"</td>"
        myTable+="<td>"+response[i].zone+"</td>";
        myTable+="<td>"+response[i].type+"</td>";
       ;
       myTable+='<td><button class="btn btn-danger" onclick="updateUser2(' + response[i].id + ')">Editar User</button></td>';
       myTable+='<td><button class="btn btn-success" onclick="removeUser(' + response[i].id + ')">Borrar User</button></td>';
       myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listUsersAll").html(myTable);
}


function updateUser2() {
    alert("Digite el id y los campos a editar y seleccione el boton verde para efectuar los cambios");
}

function removeUser(id){
    $.ajax({
        url: "http://localhost:8081/api/user/"+id,
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json",
        statusCode:{
            204:function(){
                alert("Dato eliminado");
                allUsers();
            }
            },
        });
}

function validateUser(user){
    if (user.identification==="" || user.name==="" || user.email==="" || user.password===""  || user.cellphone==="" || user.zone==="" || user.type==="" || user.adress===""){
        alert("Procure no dejar campos vacíos")
        return false;
    }
    return true;
}