import { useContext, createContext, useState } from "react";
import React from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQty, setTotalQty] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (product, color) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id && item.chosenColor === color);
        if (checkProductInCart) {
            setTotalPrice((prevprice) => prevprice + product.price)
            setTotalQty((prevqty) => prevqty + 1)

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id && cartProduct.chosenColor === color) return {
                    ...cartProduct, quantity: cartProduct.quantity + 1
                }
                else {
                    return { ...cartProduct }
                }
            })
            setCartItems(updatedCartItems)
        } else {
            setTotalQty(prev => prev + 1)
            setCartItems((prevItems) => {
                return [...prevItems, { ...product, quantity: 1, chosenColor: color }]

            })
        }
    }

    return (
        <Context.Provider value={{
            showCart, cartItems, onAdd, totalPrice, totalQty, qty, setShowCart
        }}>
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context)