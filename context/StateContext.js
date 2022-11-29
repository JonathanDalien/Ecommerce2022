import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import {onAuthStateChanged} from "firebase/auth"
import {auth, db} from "../lib/firebase"
import { collection, doc, getDoc, query, setDoc, Timestamp, where } from "firebase/firestore";
import { async } from "@firebase/util";

const { v4: uuidv4 } = require('uuid')

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [qty, setQty] = useState(1);
    const [user, setUser] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const [shippingData, setShippingData] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth, user =>{
                setUser(user)
                setPageLoading(false)
        })
    },[])

    const addCartFireBase =async(product)=>{
       
            await setDoc(doc(db, "shoppingCarts", user.uid), {
                uid: user.uid,
                createdAt: Timestamp.fromDate(new Date()),
                cart: "",
                totalQty,
              })  
    }

    const onRemove = (product)=>{
        let foundProduct = cartItems.find(item=> item.uid === product.uid)
        let newCartItems = cartItems.filter(item=>item.uid !==product.uid)

        setCartItems(newCartItems)

        setTotalPrice(prevPrice =>prevPrice - foundProduct.price*foundProduct.quantity)
        setTotalQty(prevqty=> prevqty-foundProduct.quantity)
    }

    const onAdd = (product, color) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id && item.chosenColor === color);
        setTotalPrice((prevprice) => prevprice + product.price)
        setTotalQty((prevqty) => prevqty + 1)
        if (checkProductInCart) {
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
            setCartItems((prevItems) => {
                return [...prevItems, { ...product, quantity: 1, chosenColor: color, uid: uuidv4()}]
            })
        }

    }

    


    return (
        <Context.Provider value={{
            showCart, cartItems, onAdd, setUser, totalPrice,shippingData, totalQty, qty, setShowCart, setShippingData,onRemove, user, pageLoading, setTotalQty, setCartItems
        }}>
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context)