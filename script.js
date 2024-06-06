function openSidebar(){
    document.querySelector("nav").style.display = "flex";
}

function closeSidebar(){
    document.querySelector("nav").style.display = "none";
}

function openCart() {
    closeSidebar();
    document.getElementById("cart").style.display = "block";
}

function closeCart() {
    document.getElementById("cart").style.display = "none";
}

class burger {
    itemId;
    imgLink;
    name;
    quantity;
    price;

    constructor(itemId) {
        this.itemId = itemId;
        
        //menu items
        switch(itemId) {
            case 1:
                this.imgLink = "Asset/img/burger1.png"
                this.name = "Lorum Ipsum 1"
                this.quantity = 0;
                this.price = 11.99;
                break;
            
            case 2:
                this.imgLink = "Asset/img/burger2.png"
                this.name = "Lorum Ipsum 2"
                this.quantity = 0;
                this.price = 12.99;
                break;

            case 3: 
                this.imgLink = "Asset/img/burger2.png"
                this.name = "Lorum Ipsum 3"
                this.quantity = 0;
                this.price = 13.99;
                break;
        }
    }
}

function addToCart(itemId) {
    let cartItem = document.querySelector('[data-item-id="'+CSS.escape(itemId)+'"]');
    if (cartItem == null) {
        let item = new burger(itemId);
        let element = document.createElement("div");
        element.setAttribute("data-item-id", itemId);
        element.innerHTML = `
            <img src="`+item.imgLink+`">
            <div class="flex-container">
                <div class="item-name">`+item.name+`</div>
                <div>× <span class="quantity">1</span></div>
                <div>$<span class="price">`+item.price+`</span></div>
            </div>
            <button class="x-button" onclick="removeFromCart(`+item.itemId+`)">✖</button>
        `;
        document.querySelector("#cart-items").appendChild(element);
    }
    else {
        let quantity = Number(cartItem.querySelector(".quantity").innerHTML)
        cartItem.querySelector(".quantity").innerHTML = quantity + 1;
    }
    checkEmptyCart();
    updatePrice();
}

function removeFromCart(itemId) {
    let cartItem = document.querySelector('[data-item-id="'+CSS.escape(itemId)+'"]');
    let quantity = Number(cartItem.querySelector(".quantity").innerHTML);
    quantity -= 1;
    if (quantity == 0){
        document.querySelector("#cart-items").removeChild(cartItem);
    }
    else{
        cartItem.querySelector(".quantity").innerHTML = quantity;
    }
    checkEmptyCart();
    updatePrice();
}

function updatePrice() {
    let subtotal = 0;
    let cartItems = document.querySelector('#cart-items').children;
    for(let child of cartItems) {
        subtotal += Number(child.querySelector(".quantity").innerHTML) * Number(child.querySelector(".price").innerHTML);
    }
    let tax = 0.1 * subtotal;
    let total = subtotal + tax;
    document.querySelector("#subtotal").innerHTML = subtotal.toFixed(2);
    document.querySelector("#tax").innerHTML = tax.toFixed(2);
    document.querySelector("#total").innerHTML = total.toFixed(2);
}

function checkEmptyCart(){
    if (document.querySelector("#cart-items").childElementCount == 0){
        document.querySelector("#empty-cart").style.display = "flex";
    }
    else{
        document.querySelector("#empty-cart").style.display = "none";
    }
}