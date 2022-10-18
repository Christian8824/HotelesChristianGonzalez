////GET, POST, PUT Y DELETE

function getReservaciones(){
    $.ajax({
        url:"http://132.145.223.170:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarReservaciones(respuesta);
        }
    });
}


function postReservaciones(){
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status: $("#status").val(),
            room:{id:+$("#select-room").val()},
            client:{idClient:+$("#select-client").val()}
        };
        $.ajax({
            url:"http://132.145.223.170:8080/api/Reservation/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("Se creo correctamente la Reserva");
                window.location.reload();
            }
        });
    }
}


function putReservaciones(){
    console.log(idBotonActualizar);

    if ($("#startDate").val().length == 0 ||
        $("#devolutionDate").val().length == 0 ||
        $("#status").val().length == 0 ||
        $("#select-room").val().length == 0 ||
        $("#select-client").val().length == 0) {
        alert("Todos los campos son obligatorios para actualizar la habitación");
    }else{
    let cajas = {
        id:idBotonActualizar,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status: $("#status").val(),
        room:{id:+$("#select-room").val()},
        client:{idClient:+$("#select-client").val()}
    };
    $.ajax({
        url:"http://132.145.223.170:8080/api/Reservation/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se actualizó correctamente la categoria");
            window.location.reload();
        }
        });
    }   
}


function deleteReservaciones(){
   
}


function getCliente_Reservaciones(){
    $.ajax({
        url:"http://132.145.223.170:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           console.log(respuesta);
            let $select = $("#select-client");
           $.each(respuesta, function(id, name){
            $select.append('<option value='+name.idClient+'>'+name.name+'</option>')
           })
        }
    });
}


function getRoom_Reservaciones(){
    $.ajax({
        url:"http://132.145.223.170:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           console.log(respuesta);
            let $select = $("#select-room");
           $.each(respuesta, function(id, name){
            $select.append('<option value='+name.id+'>'+name.name+'</option>')
           })
        }
    });
}


/////////////////////////////////////////////////
function pintarReservaciones(respuesta){
    let myTable="<table class='min-w-full'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr class='bg-gray-100 border-b'>";
        myTable+="<tr>"+respuesta[i].startDate+"</td>";
        myTable+="<tr>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].room.name+"</td>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='putCategoria("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' onclick='deleteCategoria("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}