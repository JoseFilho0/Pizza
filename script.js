let modalQtd = 1;

const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);

pizzaJson.map((pizzas, index) => {
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);
    modalQtd = 1;

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = pizzas.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizzas.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizzas.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizzas.description;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let keyPizza = e.target.closest('.pizza-item').getAttribute('data-key');

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