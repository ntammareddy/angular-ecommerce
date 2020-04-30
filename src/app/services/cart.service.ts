import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>(); //Subject will send event(publish) to all the subscribers
  totalQuantity: Subject<number> = new Subject<number>();
  //The above are global vars. If one component adds new cartItem to list then other components can access it.
  //New Component will be created everytime Url matches but service is created only once during launch.

  constructor() { }

  addToCart(newCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      //find the item in the cart based on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == newCartItem.id);

      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      //increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // add the new item to array
      this.cartItems.push(newCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCartItem of this.cartItems) {
      totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
      totalQuantityValue += tempCartItem.quantity;
    }

    //'next' will publish the new values..all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the cart:');
    for (let tempCartItem of this.cartItems) {
      const subtotalPrice = tempCartItem.quantity + tempCartItem.unitPrice
      console.log('name:' + tempCartItem.name + ',  Quantity:' + tempCartItem.quantity + ',  unitPrice:' + tempCartItem.unitPrice);
    }
    console.log('totalPrice:' + totalPriceValue.toFixed(2) + ",  totalQuantity:" + totalQuantityValue.toFixed(2));
  }
}

//////    About Subject:
//subject is a subclass of Obervable.
//We can use Subject to publish events in our code
//The event will be sent to all the subscribers
