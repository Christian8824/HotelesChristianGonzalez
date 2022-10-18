///GET, POST, PUT Y DELETE

function getRoom() {
    $.ajax({
        url: "http://132.145.223.170:8080/api/Room/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            pintarRoom(respuesta);
        }
    });
}


function postRoom() {
    if ($("#name").val().length == 0 ||
        $("#stars").val().length == 0 ||
        $("#hotel").val().length == 0 ||
        $("#description").val().length == 0) {
        alert("Todos los campos son obligatorios para crear la habitación");
    } else {
        let cajas = {
            name: $("#name").val(),
            stars: $("#stars").val(),
            hotel: $("#hotel").val(),
            description: $("#description").val(),
            category: { id: + $("#select-category").val() }
        };
        console.log(cajas);
        $.ajax({
            url: "http://132.145.223.170:8080/api/Room/save",
            type: "POST",
            datatype: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se creo correctamente la habitación");
                window.location.reload();
            }
        });
    }
}


function putRoom(idBotonActualizar) {
    if ($("#name").val().length == 0 ||
        $("#stars").val().length == 0 ||
        $("#hotel").val().length == 0 ||
        $("#description").val().length == 0) {
        alert("Todos los campos son obligatorios para actualizar la habitación");
    } else {
        let cajas = {
            id: idBotonActualizar,
            name: $("#name").val(),
            stars: $("#stars").val(),
            hotel: $("#hotel").val(),
            description: $("#description").val(),
            category: { id: + $("#select-category").val() }
        };
        console.log(cajas);
        $.ajax({
            url: "http://132.145.223.170:8080/api/Room/update",
            type: "PUT",
            datatype: "JSON",
            contentType: "application/json",
            data: JSON.stringify(cajas),
            success: function (respuesta) {
                alert("se actualizó correctamente la habitación");
                window.location.reload();
            }
        });
    }
}


function deleteRoom(idBotonBorrar) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estás seguro de borrar la Habitación?',
        text: "Esta acción no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, bórrala!',
        cancelButtonText: 'No, cancela!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            let myData = {
                id: idBotonBorrar
            };
            $.ajax({
                url: "http://132.145.223.170:8080/api/Room/" + idBotonBorrar,
                type: "DELETE",
                datatype: "JSON",
                contentType: "application/JSON",
                data: JSON.stringify(myData),
                success: function (respuesta) {
                    // alert("se borro correctamente la categoria");
                    window.location.reload();
                }
            });
            swalWithBootstrapButtons.fire(
                'Borrada!',
                'La Habitación ha sido borrada',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Tu Habitación está a salvo :)',
                'error'
            )
        }
    })
}

/////////////////////////////////////////////////
function pintarRoom(respuesta) {
    let myTable = "<table class='min-w-full'>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr class='bg-gray-100 border-b'>";
        myTable += "<td class='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>" + respuesta[i].id + "</td>";
        myTable += "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + respuesta[i].name + "</td>";
        myTable += "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + respuesta[i].stars + "</td>";
        myTable += "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + respuesta[i].hotel + "</td>";
        myTable += "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + respuesta[i].description + "</td>";
        myTable += "<td class='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>" + respuesta[i].category.name + "</td>";
        myTable += "<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'  onclick='putRoom(" + respuesta[i].id + ")'>Actualizar</button>";
        myTable += "<td> <button class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'  onclick='deleteRoom(" + respuesta[i].id + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultado1").html(myTable);
}

///////// GET CATEGORY //////////////
function getRoom_Category() {
    $.ajax({
        url: "http://132.145.223.170:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value =' +name.id + '>' + name.name + '</option>')
            })
        }
    });
}