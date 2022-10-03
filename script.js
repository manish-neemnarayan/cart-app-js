const data = [
    {
        id: 1,
        price: 3500,
        color: "Black",
        size: 8,
        src: "./src/img-1.jpg"
    },
    {
        id: 2,
        price: 1200,
        color: "Blue",
        size: 8,
        src: "./src/img-2.jpg"
    },
    {
        id: 3,
        price: 1900,
        color: "Black",
        size: 11,
        src: "./src/img-4.jpg"
    },
    {
        id: 4,
        price: 2100,
        color: "Blue",
        size: 6,
        src: "./src/img-3.jpg"
    },
    {
        id: 5,
        price: 3000,
        color: "White",
        size: 8,
        src: "./src/img-7.jpg"
    },
    {
        id: 6,
        price: 2600,
        color: "White",
        size: 11,
        src: "./src/img-5.jpg"
    },
    {
        id: 7,
        price: 2550,
        color: "Blue",
        size: 10,
        src: "./src/img-2.jpg"
    },
    {
        id: 8,
        price: 2100,
        color: "Black",
        size: 6,
        src: "./src/img-1.jpg"
    },
    {
        id: 9,
        price: 2100,
        color: "White",
        size: 9,
        src: "./src/img-5.jpg"
    },
    {
        id: 10,
        price: 4100,
        color: "White",
        size: 9,
        src: "./src/img-6.jpg"
    },
    {
        id: 11,
        price: 3150,
        color: "Black",
        size: 7,
        src: "./src/img-1.jpg"
    },
    {
        id: 12,
        price: 2300,
        color: "Blue",
        size: 8,
        src: "./src/img-7.jpg"
    },
    {
        id: 13,
        price: 2100,
        color: "Black",
        size: 8,
        src: "./src/img-4.jpg"
    },
    {
        id: 14,
        price: 2150,
        color: "white",
        size: 7,
        src: "./src/img-3.jpg"
    },
]

// fucntion showing products item
function show(dataarr) {
    dataarr.forEach(item => {
        itemsContainer.innerHTML += `<div id="${item.id}" class="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a class="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="${item.src}">
        </a>
        <div class="mt-4">
          <div class="flex justify-between items-center">
          <h2 class="text-gray-900 title-font tracking-widest text-base font-medium">Size: ${item.size}</h2>
          <h2 class="text-gray-900 title-font text-base font-medium">Color: ${item.color}</h2>
          </div>
          <p class="mt-1">₹${item.price}</p>
          <button class="flex  text-white bg-indigo-500 border-0 my-2 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
        </div>
        </div> `;
    })
}

const sizeContainer = document.querySelector("#size-container");
const sizeRange = document.querySelector("#size-range");
const itemsContainer = document.querySelector("#item-container");
const applyBtn = document.querySelector("#apply-btn");

const colors = document.querySelectorAll("input[type=checkbox]");
const price = document.querySelectorAll("input[type=radio]");
const size = document.querySelector("#size-range");

let showColorsArr = []; //having color filters elements
let sizeNum = 8; //having size number
let priceVal = "";

show(data); // showing each & every item on first load

// showing the values of size range
sizeRange.addEventListener('change', function() {
    sizeContainer.textContent = sizeRange.value;
})

// price value like lth(low to high) or htl(high to low);
price.forEach(item => {
    item.addEventListener("change", function() {
    priceVal = this.value;
    })
})

// filter the items based on colors
colors.forEach(item => {
    item.addEventListener("change", () => {
        let arrInn = [];
        colors.forEach(itemInner => {
            if(itemInner.checked) arrInn.push(itemInner.getAttribute("data-color"));
        })

        let showColors = arrInn.map(check => {
            return data.filter(color => color.color === check);
        })

        showColorsArr = [];
        showColors.forEach(showColorsItem => {
            showColorsItem.forEach(i => showColorsArr.push(i));
        })
        
    })
    
});

// size range
size.addEventListener("change", () => {
    sizeNum = Number(size.value);
})

// click event on apply button to apply filters
applyBtn.addEventListener('click', () => {
    itemsContainer.innerHTML = "";
    let arrToFilter = showColorsArr.length === 0 ? data : showColorsArr;
    let arrItems = arrToFilter.filter(item => item.size == sizeNum);
    console.log(showColorsArr)
    
    if(priceVal === "lth") {
        arrItems.sort((a, b) => a.price - b.price);
    } else if(priceVal === "htl") {
        arrItems.sort((a, b) => b.price - a.price);
    }

    show(arrItems);
})


// cart app-----------------------------------------------------------------------------------------------------

const btns = itemsContainer.querySelectorAll("button");
const cartContainer = document.querySelector("#cart-container");
const cross = document.querySelector("#cross");
const cart = document.querySelector("#cart");
const showCart = document.querySelector("#show-cart");

const subtotal = document.querySelector("#subtotal");
// const plus = document.querySelector("#plus");
// const minus = document.querySelector("#minus");
// const qty = document.querySelector("#qty");

cross.addEventListener("click", () => {
    cart.style.display = "none";
})

showCart.addEventListener("click", () => {
    cart.style.display = "flex";
})

let ele = [];
let subtotalCart = []; //for containing the total price

btns.forEach(btn => {

    btn.addEventListener('click', function(e) {
        ele.push(...data.filter(item => String(item.id) === e.target.parentNode.parentNode.id));
        let showCartItems = [];
        let arrId = ele.map(item => item.id)
        arrId.forEach(( _ , index) => {
            showCartItems = data.filter((item,  _ ) => item.id === arrId[index])
        })

         showCartItems.forEach((item) => {
            subtotalCart.push({             // this line of code is useful later for calculating the total
                id : item.id,
                changePrice : item.price,
                itemPrice : item.price
            })
            
            cartContainer.innerHTML += `<section class="p-2 flex bg-blue-200 w-full mt-4  rounded">
        <a class="block relative h-32 rounded overflow-hidden">
            <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="${item.src}">
        </a>
        <div id="${item.id}" data-select="price-modify" class="w-4/6 rounded flex flex-col items-center justify-between">
            <p class="flex justify-center items-center gap-8">
                <span>Size: ${item.size}</span>
                <span>Color: ${item.color}</span>
            </p>
            <p class="text-xl font-bold">Price: ${item.price}</p>
            <div class="flex justify-center gap-8 items-center w-32 md:w-2/3 bg-green-200">
                <button id="plus">+</button>
                <span>QTY: <span id="qty">1</span></span>
                <button id="minus">−</button>
            </div>
        </div>
    </section>`;
        })

        // starts changing quantity of items
        let qty = document.querySelectorAll("#qty");
        let total = 0;
        let cartAll = document.querySelectorAll("[data-select='price-modify']");
        let change = [];

        // plus button
        document.querySelectorAll("#plus").forEach(item => {
            item.addEventListener("click", (e) => {
                let arr = Array.from(cartAll).filter(item => item.id === e.target.parentNode.parentNode.id)
                arr.forEach(item => {
                    console.clear()
                    item.querySelector("#qty").textContent = Number(item.querySelector("#qty").textContent) + 1; 
                })

                // subtotal cart
                total = 0;
                subtotalCart.forEach(item => {
                    change = item.changePrice;
                })

                subtotalCart.forEach((item) => {
                    console.log(e.target.parentNode.querySelector("#qty"));
                    if( item.id == e.target.parentNode.parentNode.id){
                        change = item.changePrice * Number(e.target.parentNode.querySelector("#qty").textContent) ;
                        console.log(change)
                        item.itemPrice = change;
                        
                        }
                });
                subtotalCart.forEach(item => {
                    total += item.itemPrice;
                })
                subtotal.textContent = total;
        })
        })

        // minus button
        document.querySelectorAll("#minus").forEach(item => {
            item.addEventListener("click", (e) => {
                let arr = Array.from(cartAll).filter(item => item.id === e.target.parentNode.parentNode.id)
                arr.forEach(item => {
                    if(item.querySelector("#qty").textContent >= 2) {
                        item.querySelector("#qty").textContent = Number(item.querySelector("#qty").textContent) - 1; 
                    }
                })
                // subtotal cart
                total = 0;
                subtotalCart.forEach(item => {
                    change = item.changePrice;
                })

                subtotalCart.forEach((item) => {
                    if( item.id == e.target.parentNode.parentNode.id){
                        change = item.changePrice * Number(e.target.parentNode.querySelector("#qty").textContent) ;
                        item.itemPrice = change;
                        
                        }
                });
                subtotalCart.forEach(item => {
                    total += item.itemPrice;
                })
                subtotal.textContent = total;
            })
        })
        

        subtotalCart.forEach(item => {
            total += item.itemPrice;
        })
        
        subtotal.textContent = total;

    })
    
})

