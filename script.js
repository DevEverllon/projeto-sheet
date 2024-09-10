const inputName = document.querySelector('#nameClient');
const inputValor = document.querySelector('#purchaseValue');
const btnPay = document.querySelector('.btn-pay');
const btnDebt = document.querySelector('.btn-debt');
const btnAdd = document.querySelector('.btn-submit');
const listComplet = document.querySelector('.list-sheet');
const priceElement = document.querySelector('.pay');
const btnCheck = document.querySelector('.check');

let listItems = [];
let status = undefined;


// PPEGAR OS VALORES E ENVIAR PARA A ARREY
function addToList(status) {
    if (inputName.value === '') {
        mansage('Digite o nome do cliente', '#dc2626');
        return;
    }

    if (isNaN(inputValor.value) || inputValor.value === '') {
        mansage('Digite o valor da compra', '#dc2626');
        return;
    }

    listItems.push({
        name: inputName.value,
        price: parseFloat(inputValor.value).toFixed(2),
        status: status
    });


    inputName.value = '';
    inputValor.value = '';

    viewList();
}

btnPay.addEventListener('click', () => addToList('Pago'));
btnDebt.addEventListener('click', () => addToList('Debito'));


function viewList() {
    let newLi = '';

    listItems.forEach((item, index) => {
        const statusClass = item.status === 'Pago' ? 'pay' : 'debt';
        newLi = newLi + `
        <li>
            <div class="nameStatus">
                <p>${item.name}</p>

                <span class="${statusClass}">${item.status}</span>
            </div>

            <p class="price">$ ${item.price}</p>

            <button class="check" onclick="checked(${index})">
                <i class="bi bi-check"></i>
            </button>
        </li>
        `
    })
    listComplet.innerHTML = newLi;

    localStorage.setItem('list', JSON.stringify(listItems));
}

function uppList() {
    const listLocalStorage = localStorage.getItem('list');

    if (listLocalStorage) {
        listItems = JSON.parse(listLocalStorage);

        viewList();
    }
}
uppList();

function checked(index) {
    setTimeout(function () {
        listItems.splice(index, 1);

        viewList();
    }, 1000);
}

function mansage(text, background) {
    Toastify({
        text: text,
        duration: 3000,
        style: {
            background: background,
            boxShadow: 'none'
        }
    }).showToast();
}

/*
document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.querySelector('#filterInput');
    
    filterInput.addEventListener('keyup', function() {
        const filterValue = filterInput.value.toLowerCase();

        listItems.forEach(function(item, index) {
            const itemText = item.status.toLowerCase();

            // Seleciona o item da lista correspondente ao índice atual
            const listItemElement = listComplet.querySelectorAll('li')[index];

            if (itemText.includes(filterValue)) {
                listItemElement.classList.remove('hidden');
            } 
            else {
                listItemElement.classList.add('hidden');
            }
        });
    });
});
*/

document.addEventListener('DOMContentLoaded', function () {
    const filterInput = document.querySelector('#filterInput');

    filterInput.addEventListener('keyup', function () {
        const filterValue = filterInput.value.toLowerCase();
        let total = 0;

        listItems.forEach(function (item, index) {
            const itemText = item.status.toLowerCase();
            const itemText2 = item.name.toLowerCase();

            // Seleciona o item da lista correspondente ao índice atual
            const listItemElement = listComplet.querySelectorAll('li')[index];

            // FILTRANDO POR STATUS (PAGO || DEBITO)
            if (itemText.includes(filterValue)) {
                listItemElement.classList.remove('hidden');
                // Soma o valor do item ao total se corresponder ao filtro
                total += parseFloat(item.price);
            }
            // FILTRANDO POR NOME DO CLIENTE
            else if (itemText2.includes(filterValue)) {
                listItemElement.classList.remove('hidden');
                // Soma o valor do item ao total se corresponder ao filtro
                total += parseFloat(item.price);
            }
            else {
                listItemElement.classList.add('hidden');
            }
        });

        // Exibe o total no console
        const ExibTot = document.querySelector('#valorTotal');

        ExibTot.innerHTML = `$ ${total.toFixed(2)}`
        return;
    });
});


