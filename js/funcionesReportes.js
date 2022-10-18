function getStatus(){
    $.ajax({
        url:"http://132.145.223.170:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarStatus(respuesta);
        }
    });
}


function getFechas(){
    
}


function getClientes(){
    
}


/////////////////////////////////////////////////////////
function pintarStatus(respuesta){
    let myTable="<table>";
        myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    
    myTable+="</table>";
    $("#resultado1").html(myTable);
}