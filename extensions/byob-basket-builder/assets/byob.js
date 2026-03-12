let step = 1;

const baskets = [
  {id:1,name:"Small Basket",price:10},
  {id:2,name:"Large Basket",price:20},
  {id:3,name:"Extra Large Basket",price:30},
];

const products = [
  {id:101,name:"Apple",price:5},
  {id:102,name:"Orange",price:4},
  {id:103,name:"Banana",price:3},
];

let selectedBasket = null;
let selectedProducts = [];

function renderStep(){

  const container = document.getElementById("byob-content");

  if(step === 1){

    container.innerHTML = baskets.map(b=>`

      <div class="basket-card">
        <h3>${b.name}</h3>
        <button onclick="selectBasket(${b.id})">Select</button>
      </div>

    `).join("");

  }


  if(step === 2){

    container.innerHTML = products.map(p=>`

      <div class="product-card">
        <h3>${p.name}</h3>
        <button onclick="addProduct(${p.id})">Add</button>
      </div>

    `).join("");

  }


  if(step === 3){

    container.innerHTML = selectedProducts.map(p=>`

      <div>${p.name}</div>

    `).join("") + `
      <textarea id="basket-note" placeholder="Add note"></textarea>
    `;

  }

}


function selectBasket(id){
  selectedBasket = baskets.find(b=>b.id===id);
  step = 2;
  renderStep();
}


function addProduct(id){

  const product = products.find(p=>p.id===id);

  selectedProducts.push(product);

  updateTotal();

}


function updateTotal(){

  let total = selectedBasket.price;

  selectedProducts.forEach(p=>{
    total += p.price;
  });

  document.getElementById("basket-total").innerText = "$"+total;

}


renderStep();


// async function loadBaskets(){

// const query = `
// {
//   metaobjects(type: "basket", first: 10) {
//     edges {
//       node {
//         id
//         fields {
//           key
//           value
//         }
//       }
//     }
//   }
// }
// `;

// const response = await fetch('/apps/2024-01/graphql.json', {
//   method:'POST',
//   headers:{
//     'Content-Type':'application/json'
//   },
//   body: JSON.stringify({query})
// });

// const data = await response.json();

// console.log(data);

// }
// loadBaskets();

async function loadBaskets(){

const res = await fetch("/apps/byob/baskets");

const data = await res.json();

console.log(data);

}

loadBaskets();
