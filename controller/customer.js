
$('#exampleInputId, #exampleInputName, #exampleInputAddress, #exampleInputAddress').on('keyup', function () {
    checkValidity();
});


// customer regex
const cusIDRegEx = /^(C00-)[0-9]{3}$/;
const cusNameRegEx = /^[A-z ]{3,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{2}$/;

let customerValidations = [];
let c = {
    reg: cusIDRegEx,
    field: $('#exampleInputId'),
    error: 'CustomerId pattern is wrong! ex: C00-001'
}
customerValidations.push(c);
customerValidations.push({
    reg: cusNameRegEx,
    field: $('#exampleInputName'),
    error: 'CustomerName pattern is wrong! ex: A-z (3-20)'
});
customerValidations.push({
    reg: cusAddressRegEx,
    field: $('#exampleInputAddress'),
    error: 'CustomerAddress pattern is wrong! ex: A-z (0-9., /)'
});
customerValidations.push({
    reg: cusSalaryRegEx,
    field: $('#exampleInputSalary'),
    error: 'CustomerSalary pattern is wrong! ex: 100 or 100.00'
});


function checkValidity() {
    for (let validation of customerValidations) {
        if (check(validation.reg, validation.field)) {
            testSuccess(validation.field, "");
        } else {
            setError(validation.field, validation.error);
        }
    }
}

function check(regex, textField) {
    let inputValue = textField.val();
    // console.log(regex.test(inputValue));
    return regex.test(inputValue);
}

function testSuccess(textField, msg) {
    if (textField.val().length <= 0) {
        textField.css('border', '1px solid #ced4da');
        textField.parent().children('span').text("");
    } else {
        textField.css('border', '3px solid lightgreen');
        textField.parent().children('span').text(msg);
    }
}

function setError(textField, msg) {
    if (textField.val().length <= 0) {
        textField.css('border', '1px solid #ced4da');
        textField.parent().children('span').text("");
    } else {
        textField.css('border', '3px solid red');
        textField.parent().children('span').text(msg);
    }
}


// customer array
var cusArray = [];
$('#SaveBtnCustomer').on('click', function () {

    let textOfButton = $('#SaveBtnCustomer').text();
    // save customer
    if (textOfButton == 'Save') {
        let customerId = $('#exampleInputId').val();
        let customerName = $('#exampleInputName').val();
        let customerAddress = $('#exampleInputAddress').val();
        let customerSalary = $('#exampleInputSalary').val();

        var customer = {
            id: customerId,
            name: customerName,
            address: customerAddress,
            salary: customerSalary
        }

        swal({
            title: "Are you sure?",
            text: "Do you really want to add this customer!",
            icon: "warning",
            buttons: true,
            // dangerMode: true,
        })
            .then((willDelete) => {

                if (willDelete) {
                    cusArray.push(customer);
                    loadAllCustomers();
                    swal("Poof! Your imaginary customer has been added!", {
                        icon: "success",
                    });
                }
            });

    } else {

        // update customer
        cusArray[indexNo].id = $('#exampleInputId').val();
        cusArray[indexNo].name = $('#exampleInputName').val();
        cusArray[indexNo].address = $('#exampleInputAddress').val();
        cusArray[indexNo].salary = $('#exampleInputSalary').val();
        $('#SaveBtnCustomer').text('Save');
        loadAllCustomers();

        swal({
            title: "Updated!",
            // text: "You clicked the button!",
            icon: "success",
            button: "OK",
        });
    }

    clearTextFields();

});

function loadAllCustomers() {
    $('#customerTable').empty();

    for (var i of cusArray) {
        var row = "<tr><td>" + i.id + "</td><td>" + i.name + "</td><td>" + i.address + "</td><td>" + i.salary + "</td><td class='operate'>\n" +
            "                        <div class=\"d-flex justify-content-center\" style=\"padding: 0; margin: 0;\">\n" +
            "                            <div aria-label=\"Basic mixed styles example\" class=\"btn-group btn-group-sm\" role=\"group\"\n" +
            "                                 style=\"padding: 0\">\n" +
            "                                <button class=\"btn btn-warning btnEdit\" type=\"button\" id='btnEdit'>Edit</button>\n" +
            "                                <button class=\"btn btn-danger\" type=\"button\" id='btnDelete'>Delete</button>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </td></tr>"
        $('#customerTable').append(row);
    }
    loadAllCustomerIds();


}

// press tab key
$('#exampleInputId, #exampleInputName, #exampleInputAddress, #exampleInputSalary').on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});

$('#exampleInputId').keydown(function (event) {
    if (event.key == 'Enter' && check(cusIDRegEx, $('#exampleInputId'))) {
        var option = searchCustomer($('#exampleInputId').val());
        if (option == null) {
            $('#exampleInputName').focus();
        }
    } else {
        $('#exampleInputId').focus();
    }
});

$('#exampleInputName').keydown(function (event) {
    if (event.key == 'Enter' && check(cusNameRegEx, $('#exampleInputName'))) {
        $('#exampleInputAddress').focus();
    }
});

$('#exampleInputAddress').keydown(function (event) {
    if (event.key == 'Enter' && check(cusAddressRegEx, $('#exampleInputAddress'))) {
        $('#exampleInputSalary').focus();
    }
});

// clear button
$('#btnClearCustomer').click(function () {
    clearTextFields();
    $('#SaveBtnCustomer').text('Save');
});

function clearTextFields() {
    $('#exampleInputId, #exampleInputName, #exampleInputAddress, #exampleInputSalary').val("");
    getDefault();
}

// edit button
$('#customerTable').on('click', '#btnEdit', function () {
    var cusID = searchCustomer($(this).parents('tr').children(':first-child').text());
    $('#SaveBtnCustomer').text('Update');
    findIndexNumber(cusID);
    getDefault();

});

// hide span text and get default border color
function getDefault() {
    $('#exampleInputId, #exampleInputName, #exampleInputAddress, #exampleInputSalary').parent().children('span').text("");
    $('#exampleInputId, #exampleInputName, #exampleInputAddress, #exampleInputSalary').css('border', '1px solid #CED4DA');
}


let indexNo = "";

function findIndexNumber(cusID) {
    // console.log(cusArray.indexOf(cusID));
    indexNo = cusArray.indexOf(cusID);
    return indexNo;
}

// delete customer using delete button
$('#tblCustomer').on('click', '#btnDelete', function () {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                let cusID = searchCustomer($(this).parents('tr').children(':first-child').text());
                let indexNumber = findIndexNumber(cusID);
                cusArray.splice(indexNumber, 1);
                loadAllCustomers();

                clearTextFields();
                $('#SaveBtnCustomer').text('Save');

                swal("Poof! Your imaginary customer has been deleted!", {
                    icon: "success",
                });
            }
        });


});

// search customer
function searchCustomer(cusId) {
    for (var i of cusArray) {
        if (i.id == cusId) {
            setTextFieldValues(i.id, i.name, i.address, i.salary);
            return i;
        }
    }
    return null;
}

function setTextFieldValues(id, name, address, salary) {
    $('#exampleInputId').val(id);
    $('#exampleInputName').val(name);
    $('#exampleInputAddress').val(address);
    $('#exampleInputSalary').val(salary);
}

