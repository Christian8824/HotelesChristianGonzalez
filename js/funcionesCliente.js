///GET, POST, PUT Y DELETE
function getCliente(){
    $.ajax({
        url:"http://132.145.223.170:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCliente(respuesta);
        }
    });
}


function postCliente(){
    let cajas = {
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };
    $.ajax({
        url:"http://132.145.223.170:8080/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el Cliente");
            window.location.reload();
        }
    });
}


function putCliente(){

}


function deleteCliente(){

}

/////////////////////////////////////////////////
function pintarCliente(respuesta){
    let myTable="<table class='min-w-full'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr class='bg-gray-100 border-b'>";
        myTable+="<td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>"+respuesta[i].email+"</td>";
        myTable+="<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>"+respuesta[i].password+"</td>";
        myTable+="<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>"+respuesta[i].name+"</td>";
        myTable+="<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>"+respuesta[i].age+"</td>";
        myTable+="</tr>";        
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}