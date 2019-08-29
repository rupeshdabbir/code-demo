import * as json from './transactions.json';

const {list} = json;
console.log(list)

{/* <tr>
<th scope="row">1</th>
<td>Mark</td>name
<td>Otto</td>amount
<td>@mdo</td>status
<td>$10</td>
</tr> */}

const transactionsBody = document.getElementsByClassName('list-body');
const invoiceBody = document.getElementsByClassName('invoice-list-body');
const showInvoice = $('#newInvoice');
const showInvoiceModal = $('#newInvoiceModal');
const form = $('#newInvoiceData');
let store = {};


showInvoice.click(function() {
    showInvoiceModal.show();
})

$('.btn-close').click(function() {
    showInvoiceModal.toggle();
})


$('.btn-save').click(function(e) {
        var elements = document.getElementById("newInvoiceData").elements;
        var obj ={};
        for(var i = 0 ; i < elements.length ; i++){
            var item = elements.item(i);
            obj[item.name] = item.value;
        }
    
        console.log("Form", obj); // {name: "Rupesh", amount: "10", radio: "on"}
        storeDataAndRender(obj);
});

function storeDataAndRender(obj) {
    if(!store['invoices']) {
        store['invoices'] = [];
    }
    store['invoices'].push(obj);
    renderInvoices();
}

function renderInvoices() {
    $('.invoice-list-body').empty();
    const list = store['invoices'];
    list.forEach((each, i) => {
        let id = i+1;
        const { name, radio, amount } = each;

        const tr = document.createElement('tr');
        const th = document.createElement('th');

        const nameNode = document.createElement('td');
        nameNode.innerText = name;

        const amountNode = document.createElement('td');
        amountNode.innerText = amount;

        const statusNode = document.createElement('td');
        const status = radio === 'on' ? 'Paid':'unpaid';
        statusNode.innerText = status;

        th.scope = 'row';
        th.innerText = id;
        tr.appendChild(th);
        tr.appendChild(nameNode);
        // tr.appendChild(descNode);
        // tr.appendChild(dateNode);
        tr.appendChild(amountNode);
        tr.appendChild(statusNode);

        // debugger;
        invoiceBody[0].appendChild(tr);
    });
    showInvoiceModal.toggle();
}

function buildList() {
    list.forEach(each => {
        const {id, name, description, date, amount } = each;

        const tr = document.createElement('tr');
        const th = document.createElement('th');

        const nameNode = document.createElement('td');
        nameNode.innerText = name;

        const descNode = document.createElement('td');
        descNode.innerText = description;

        const dateNode = document.createElement('td');
        dateNode.innerText = date;

        const amountNode = document.createElement('td');
        amountNode.innerText = amount;

        th.scope = 'row';
        th.innerText = id;
        tr.appendChild(th);
        tr.appendChild(nameNode);
        tr.appendChild(descNode);
        tr.appendChild(dateNode);
        tr.appendChild(amountNode);

        // debugger;
        transactionsBody[0].appendChild(tr);
    });

}

buildList();

const returnList = () => {
    fetch('https://api.jikan.moe/v3/anime/1')
    .then(res => res.json())
    .then(val => console.log(val));
}

export default returnList;