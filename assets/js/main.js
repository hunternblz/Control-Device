function submit() {
    var ipAddress = $('#ipAddress').val();
    var option = $('#option').val();
    if (!ipAddress) {
        Swal.fire('Failed', 'IP Address Required', 'error');
        return false;
    } else if (!option) {
        Swal.fire('Failed', 'Option Required', 'error');
        return false;
    } else {
        $('#submit').addClass('btn btn-warning d-block w-100').html('Please Wait...').attr('disabled', 'disabled');
        $.ajax({
            url: 'api.php',
            type: 'POST',
            dataType: 'json',
            data: {
                ipAddress: ipAddress,
                option: option
            },
            success: function (response) {
                if (response.success == true) {
                    Swal.fire("Success", response.message + " : " + ipAddress, "success");
                } else {
                    Swal.fire("Failed", response.message + " : " + ipAddress, "error");
                }
                $('#submit').removeClass('btn btn-warning d-block w-100').addClass('btn btn-primary d-block w-100').html('Submit').removeAttr('disabled', 'disabled');
            },
            error: function (xhr, textStatus, thrownError) {
                exitError(xhr.status);
            }
        });
    }
}

function exitError(code) {
	if (code == 404) {
		Swal.fire("Failed", "API Error", "error");
	} else if (code == 503) {
		Swal.fire("Failed", "Server Overloaded", "error");
	} else {
		Swal.fire("Failed", "Server Error", "error");
	}
    $('#submit').removeClass('btn btn-warning d-block w-100').addClass('btn btn-primary d-block w-100').html('Submit').removeAttr('disabled', 'disabled');
	return;
}