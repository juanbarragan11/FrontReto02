function iniciarSesion() {
    if ($("#emailuser").val()==="admin@admin.com" && $("#passworduser").val()=== "admin") {
        window.location.assign("dashboardAdmin.html");
    }
    if ($("#emailuser").val().length == 0 ||$("#passworduser").val().length == 0) {
        alert("Todos los campos son obligatorios");
    }else{
        validarEmail();
        $.ajax({
            url:
            "http://129.151.112.156:8081/api/user/" +$("#emailuser").val() +"/" +$("#passworduser").val(),
            type: "GET",
            dataType: "json",
            success: function (respuesta) {
                console.log(respuesta);
                relocate(respuesta)
            },
            error: function (xhr, status) {
                alert("Ha sucedido un problema");
            },
        });
    }
}

function relocate(respuesta){
    if (respuesta.id != null && respuesta.email =="admin@admin.com" && respuesta.password=="admin"){
        alert("Bienvenido Administrador");
    }
    if (respuesta.id != null){
        window.location = "dashboardUser.html";
    }else{
        alert("credenciales incorrectas");
    }
}

function validarEmail(){
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test($("#emailuser").val())){  
        return true;
    }else{
        alert("El formato de Email no es valido")
        return false;
    }
}
