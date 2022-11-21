import { useEffect, useLayoutEffect, useState } from "react";
import { BehaviorSubject, map, Subject } from "rxjs";

export interface IProduct {
  id: number;
  quantity: number;
  price: number;
  name: string;
}

export interface ICart {
  items: IProduct[];
}

const emptyCart: ICart = {
  items: [],
};

const cartSubject = new BehaviorSubject<ICart | null>(null);

export const useCart = () => {
  const [cart, setCart] = useState<ICart>(emptyCart);

  useEffect(() => {
    const subcription = cartSubject
      .pipe(
        map((x) => {
          if (x !== null) return x;

          return getCart();
        })
      )
      .subscribe((x) => setCart(x));

    return () => subcription.unsubscribe();
  }, []);

  return { cart };
};

const saveCart = (cart: ICart) =>
  sessionStorage.setItem("cart", JSON.stringify(cart));

const getCart = (): ICart => {
  const data = sessionStorage.getItem("cart");

  if (data === null) {
    saveCart(emptyCart);
    return emptyCart;
  }

  return JSON.parse(data) as ICart;
};

export const updateCart = (newCart: ICart | ((prev: ICart) => ICart)) => {
  const newCartCalculated = (() => {
    if (typeof newCart === "function") {
      const prevCartSubj = cartSubject.getValue();

      const prevCart = prevCartSubj === null ? getCart() : prevCartSubj;
      return newCart(prevCart);
    } else {
      return newCart;
    }
  })();

  cartSubject.next(newCartCalculated);
  saveCart(newCartCalculated);
};
