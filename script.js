let cart = [];
let modalQtd = 1;
let modalKey = 0;

const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);


//Eventos de caracterização das pizzas
pizzaJson.map((pizzas, index) => {
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);
    

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = pizzas.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizzas.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizzas.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizzas.description;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let keyPizza = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQtd = 1;
        modalKey = keyPizza;

        qs('.pizzaBig img').src = pizzaJson[keyPizza].img;
        qs('.pizzaInfo h1').innerHTML = pizzaJson[keyPizza].name;
        qs('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[keyPizza].description;
        qs('.pizzaInfo--actualPrice').innerHTML = pizzaJson[keyPizza].price.toFixed(2);

        qs('.pizzaInfo--size.selected').classList.remove('selected');

        qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected')
            }

            size.querySelector('span').innerHTML = pizzaJson[keyPizza].sizes[sizeIndex];
        });

        qs('.pizzaInfo--qtd').innerHTML = modalQtd;

        qs('.pizzaWindowArea').style.opacity = 0;
        qs('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qs('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    })

    qs('.pizza-area').append(pizzaItem);
});

//Eventos do MODAL 

function closeModal() {
    qs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        qs('.pizzaWindowArea').style.display = 'none';
    }, 500);
} 
qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
});

qs('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++;
    qs('.pizzaInfo--qtd').innerHTML = modalQtd;
});
qs('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQtd > 1) {
        modalQtd--;
        qs('.pizzaInfo--qtd').innerHTML = modalQtd;
    }
});
qsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        qs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected')
    })
});
qs('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id+'&'+size;

    let key = cart.findIndex((item) => item.identifier == identifier);

    if(key > -1) {
        cart[key].qtd += modalQtd;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qtd: modalQtd
        });
    }
    updateCart();
    closeModal();
});

qs('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        qs('aside').style.left = '0';
    }
});
qs('.menu-closer').addEventListener('click', () => {
    qs('aside').style.left = '100vw';
});

function updateCart() {
    qs('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0) {
        qs('aside').classList.add('show');
        qs('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaIndividual = pizzaJson.find((item) => item.id == cart[i].id);

            subtotal += pizzaIndividual.price * cart[i].qtd;
            qs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;

            let cartItem = qs('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = 'P'
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;
            }
            let pizzaName = `${pizzaIndividual.name} (${pizzaSizeName})`;

            cartItem.querySelector('.cart--item img').src = pizzaIndividual.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd;

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qtd++;
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qtd > 1) {
                    cart[i].qtd--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });

            qs('.cart').append(cartItem);
            
            desconto = subtotal * 0.1;
            total = subtotal - desconto;

            qs('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
            qs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
        }

    } else {
        qs('aside').classList.remove('show');
        qs('aside').style.left = '100vw'
    }
}