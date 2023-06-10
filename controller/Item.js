$('#exampleInputId1,#exampleInputName1,#exampleInputPrice,#exampleInputQuantity').on('keyup', function () {
    check1Validity1();
});


// item regex
const itmCodeRegEx = /^(I00-)[0-9]{3}$/;
const itmNameRegEx = /^[A-z ]{3,20}$/;
const itmPriceRegEx = /^[0-9]{1,}[.]?[0-9]{2}$/;
const itmQtyOnHandRegEx = /^[0-9]{1,}$/;

let itemValidations = [];
let c1 = {
    reg: itmCodeRegEx,
    field: $('#exampleInputId1'),
    error: 'ItemCode pattern is wrong! ex: I00-001'
}
itemValidations.push(c1);
itemValidations.push({
    reg: itmNameRegEx,
    field: $('#exampleInputName1'),
    error: 'ItemName pattern is wrong! ex: A-z (3-20)'
});
itemValidations.push({
    reg: itmPriceRegEx,
    field: $('#exampleInputPrice'),
    error: 'ItemPrice pattern is wrong! ex: (100 or 100.00)'
});
itemValidations.push({
    reg: itmQtyOnHandRegEx,
    field: $('#txtQtyOnHand'),
    error: 'QtyOnHand pattern is wrong! ex: (0-9)'
});

function check1Validity1() {
    for (let validation of itemValidations) {
        if (check1(validation.reg, validation.field)) {
            testSuccess1(validation.field, "");
        } else {
            setError1(validation.field, validation.error);
        }
    }
}

function testSuccess1(textField, msg) {
    if (textField.val().length <= 0) {
        textField.css('border', '1px solid #CED4DA');
        textField.parent().children('span').text("");
    } else {
        textField.css('border', '3px solid lightgreen');
        textField.parent().children('span').text(msg);
    }
}


function setError1(textField, msg) {
    console.log(textField.val().length)
    if (textField.val().length <= 0) {
        textField.css('border', '1px solid #CED4DA');
        textField.parent().children('span').text("");
    } else {
        textField.css('border', '3px solid red');
        textField.parent().children('span').text(msg);
    }
}


// item array
var itmArray = [];
$('#SaveBtnItem').on('click', function () {
    console.log('Clicked');

    let textOfButton1 = $('#SaveBtnItem').text();
    console.log("text : ",textOfButton1)
    if (textOfButton1 === 'Save') {
        let itemCode = $('#exampleInputId1').val();
        let itemName = $('#exampleInputName1').val();
        let itemPrice = $('#exampleInputPrice').val();
        let qtyOnHand = $('#exampleInputQuantity').val();

        var item = {
            code: itemCode,
            name: itemName,
            price: itemPrice,
            qtyOnHand: qtyOnHand
        }

        swal({
            title: "Are you sure?",
            text: "Do you really want to add this item!",
            icon: "warning",
            buttons: true,
            // dangerMode: true,
        })
            .then((willDelete) => {

                if (willDelete) {
                    itmArray.push(item);
                    loadAllItems();

                    swal("Poof! Your imaginary item has been added!", {
                        icon: "success",
                    });
                }
            });

    } else {

        // update item
        itmArray[indexNo1].code = $('#exampleInputId1').val();
        itmArray[indexNo1].name = $('#exampleInputName1').val();
        itmArray[indexNo1].price = $('#exampleInputPrice').val();
        itmArray[indexNo1].qtyOnHand = $('#exampleInputQuantity').val();
        $('#SaveBtnItem').text('Save');
        loadAllItems();

        swal({
            title: "Updated!",
            icon: "success",
            button: "OK",
        });
    }

    clearTextFields1();

});

// loadAllItems
function loadAllItems() {
    $('#SaveBtnItem').empty();

    for (var i of itmArray) {
        var row = "<tr><td>" + i.code + "</td><td>" + i.name + "</td><td>" + i.price + "</td><td>" + i.qtyOnHand + "</td><td class='operate'>\n" +
            "                        <div class=\"d-flex justify-content-center\" style=\"padding: 0; margin: 0;\">\n" +
            "                            <div aria-label=\"Basic mixed styles example\" class=\"btn-group btn-group-sm\" role=\"group\"\n" +
            "                                 style=\"padding: 0\">\n" +
            "                                <button class=\"btn btn-warning\" type=\"button\" id='btn_Edit'>Edit</button>\n" +
            "                                <button class=\"btn btn-danger\" type=\"button\" id='btn_Delete'>Delete</button>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </td></tr>"
        $('#itemTable').append(row);
    }
    loadAllItemCodes();

}

// press tab key
$('#exampleInputId1,#exampleInputName1,#exampleInputPrice,#exampleInputQuantity').on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});


$('#exampleInputId1').keydown(function (event) {
    if (event.key == 'Enter' && check1(itmCodeRegEx, $('#exampleInputId1'))) {
        var option = searchItem($('#exampleInputId1').val());
        if (option == null) {
            $('#exampleInputName1').focus();
        }
    } else {
        $('#exampleInputId1').focus();
    }
});

$('#exampleInputName1').keydown(function (event) {
    if (event.key == 'Enter' && check1(itmNameRegEx, $('#exampleInputName1'))) {
        $('#exampleInputPrice').focus();
    }
});

$('#exampleInputPrice').keydown(function (event) {
    if (event.key == 'Enter' && check1(itmPriceRegEx, $('#exampleInputPrice'))) {
        $('#exampleInputQuantity').focus();
    }
});


function check1(regex, textField) {
    let inputValue = textField.val();
    return regex.test(inputValue);
}


// clear button
$('#btnClearItem').click(function () {
    clearTextFields1();
    $('#SaveBtnItem').text('Save');
});

// click edit button
$('#itemTable').on('click', '#btn_Edit', function () {
    var itmCode = searchItem($(this).parents('tr').children(':first-child').text());
    $('#SaveBtnItem').text('Update');
    findIndexNumber1(itmCode);
    getDefault1();
});

let indexNo1 = "";

function findIndexNumber1(itmID) {
    // console.log(itmArray.indexOf(itmID));
    indexNo1 = itmArray.indexOf(itmID);
    return indexNo1;
}

// search item
function searchItem(itmCode) {
    for (var i of itmArray) {
        if (i.code == itmCode) {
            setTextFieldValues1(i.code, i.name, i.price, i.qtyOnHand);
            return i;
        }
    }
    return null;
}

// set values
function setTextFieldValues1(code, name, price, qtyOnHand) {
    $('#exampleInputId1').val(code);
    $('#exampleInputName1').val(name);
    $('#exampleInputPrice').val(price);
    $('#exampleInputQuantity').val(qtyOnHand);
}


// delete item using delete button
$('#itemTable').on('click', '#btn_Delete', function () {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                let itmID = searchItem($(this).parents('tr').children(':first-child').text());
                let indexNumber = findIndexNumber1(itmID);
                itmArray.splice(indexNumber, 1);
                loadAllItems();

                clearTextFields1();
                $('#SaveBtnItem').text('Save');

                swal("Poof! Your imaginary item has been deleted!", {
                    icon: "success",
                });
            }
        });
});

function clearTextFields1() {
    $('#exampleInputId1,#exampleInputName1,#exampleInputPrice,#exampleInputQuantity').val("");
    getDefault1();
}

// hide span text and get default border color
function getDefault1() {
    $('#exampleInputId1,#exampleInputName1,#exampleInputPrice,#exampleInputQuantity').parent().children('span').text("");
    $('#exampleInputId1,#exampleInputName1,#exampleInputPrice,#exampleInputQuantity').css('border', '1px solid #CED4DA');
}



