$('#exampleInputCash, #exampleInputDiscount, #exampleInputBalance').on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();
    }
});

function loadAllCustomerIds() {
    $('#inputCustomer').empty();
    $('#inputCustomer').append(`<option>select</option>`);

    for (let cus of cusArray) {
        $('#inputCustomer').append(`<option>${cus.id}</option>`);
    }
}

function loadAllItemCodes() {
    $('#inputItem').empty();
    $('#inputItem').append(`<option>select</option>`);

    for (let itm of itmArray) {
        $('#inputItem').append(`<option>${itm.code}</option>`);
    }
}


$('#inputCustomer').change(function () {
    let selectedVal = $(this).val();
    for (let cus of cusArray) {
        if (cus.id == selectedVal) {
            setCustomerDetails(cus);
        } else if ('select' == selectedVal) {
            $('#exampleInputCustomerId, #exampleInputName2, #exampleInputSalary2, #exampleInputAddress2').val("");
        }
    }

});

function setCustomerDetails(cusObj) {
    $('#exampleInputCustomerId').val(cusObj.id);
    $('#exampleInputName2').val(cusObj.name);
    $('#exampleInputSalary2').val(cusObj.salary);
    $('#exampleInputAddress2').val(cusObj.address);
}

$('#inputItem').change(function () {
    let selectedVal1 = $(this).val();
    for (let itm of itmArray) {
        if (itm.code == selectedVal1) {
            setItemDetails(itm);
        } else if ('select' == selectedVal1) {
            $('#exampleInputItemCode, #exampleInputName3, #exampleInputSalary3, #exampleInputQtyOnHand').val("");
        }
    }

});

function setItemDetails(itmObj) {
    $('#exampleInputItemCode').val(itmObj.code);
    $('#exampleInputName3').val(itmObj.name);
    $('#exampleInputSalary3').val(itmObj.price);
    $('#exampleInputQtyOnHand').val(itmObj.qtyOnHand);
}

var purchaseItemsArray = [];
$('#btnAddItem').on('click', function () {

    let validate1 = $('#exampleInputQtyOrder').val() != 0;

    if (validate1) {
        let iCode = $('#exampleInputItemCode').val();
        let iName = $('#exampleInputName3').val();
        let iPrice = $('#exampleInputSalary3').val();
        let iQty = $('#exampleInputQtyOrder').val();
        let iTotal = (iPrice * iQty);
        var purchaseItem = {
            iCode: iCode,
            iName: iName,
            iPrice: iPrice,
            iQty: iQty,
            iTotal: iTotal
        }
        purchaseItemsArray.push(purchaseItem);
        loadAllPurchaseItems();
        totalValue();
        clearItemDetailsTextFields();
    } else {
        alert('Something went wrong...!!!');
        console.log('QtyOnHand', $('#exampleInputQtyOnHand').val());
        console.log('OrderQty', $('#exampleInputQtyOrder').val());
        console.log('result', $('#exampleInputQtyOnHand').val() >= $('#exampleInputQtyOrder').val());
        clearItemDetailsTextFields();
    }
});

function loadAllPurchaseItems() {
    $('#tblPurchaseItem').empty();

    for (let i of purchaseItemsArray) {
        var purchaseRow = "<tr><td>" + i.iCode + "</td><td>" + i.iName + "</td><td>" + i.iPrice + "</td><td>" + i.iQty + "</td><td>" + i.iTotal + "</td><td>\n" +
            "                        <div class=\"d-flex justify-content-center\" style=\"padding: 0; margin: 0;\">\n" +
            "                            <div aria-label=\"Basic mixed styles example\" class=\"btn-group btn-group-sm\" role=\"group\"\n" +
            "                                 style=\"padding: 0\">\n" +
            "                                <button class=\"btn btn-danger\" type=\"button\" id=\"btnRemove\">Remove</button>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </td></tr>"
        $('#tblPurchaseItem').append(purchaseRow);
    }

}

function totalValue() {
    let tot = 0;
    for (let i of purchaseItemsArray) {
        tot += i.iTotal;
    }
    $('#total-val').text(tot);
}

function clearItemDetailsTextFields() {
    $('#inputItem').val('select');
    $('#exampleInputItemCode').val("");
    $('#exampleInputName3').val("");
    $('#exampleInputSalary3').val(0);
    $('#exampleInputQtyOnHand').val(0);
    $('#exampleInputQtyOrder').val(0);
}


$('#tblPurchaseItem').on('click', '#btnRemove', function () {

    let p = searchPurchase($(this).parents('tr').children(':first-child').text());
    console.log(p);
    let indexNum = purchaseItemsArray.indexOf(p);
    purchaseItemsArray.splice(indexNum, 1);
    loadAllPurchaseItems();
    totalValue();

});

function searchPurchase(itemCode) {
    for (var i of purchaseItemsArray) {
        if (i.iCode == itemCode) {
            return i;
        }
    }
    return null;
}


function inputDiscount(discount) {
    console.log(discount.value);
    let sub = $('#total-val').text() - discount.value;
    $('#subtotal-val').text(sub);
    let balance = $('#exampleInputCash').val() - $('#subtotal-val').text();
    $('#exampleInputBalance').val(balance);
}

$('#btnPurchase').on('click', function () {
    generateOrderId();
    swal({
        title: "Successfully",
        icon: "success",
        button: "OK",
    });
    $("#inputCustomer").val("select").change();
    clearItemDetailsTextFields();
    $("#exampleInputCash").val("");
    $("#exampleInputDiscount").val("");
    $("#exampleInputBalance").val("");
});

function generateOrderId() {
    let ordId = $('#exampleInputId2').val();
    let type = ordId.split('-')[1];
    let orNo = +type + 1;
    $('#exampleInputId2').val('ORD-' + orNo);
}


