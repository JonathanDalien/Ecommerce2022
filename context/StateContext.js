import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import {onAuthStateChanged} from "firebase/auth"
import {auth, db} from "../lib/firebase"
import { collection, doc, getDocs, query, setDoc, Timestamp, where, addDoc } from "firebase/firestore";
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
    const [pageLoading, setPageLoading] = useState(true);
    const [shippingData, setShippingData] = useState(null);
    let test=[]
    useEffect(()=>{
       
        onAuthStateChanged(auth, user =>{
                setUser(user)
                setPageLoading(false)
        })
    },[])

    useEffect(()=>{
        console.log(user)
        const getCloudItems = async()=>{
            if(user){
                console.log(user.uid)
            const cartRef = collection(db, "shoppingCarts", user.uid, "CartItems");
            test = await getDocs(cartRef);
        }
        console.log(test)
    }
    },[user])


    const addCartFireBase =async(product)=>{
        const cartRef = collection(db, "shoppingCarts", user.uid, "CartItems")
       
            await addDoc(cartRef, {
                ...product,
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
            addCartFireBase(product)
            setCartItems((prevItems) => {
                return [...prevItems, { ...product, quantity: 1, chosenColor: color, uid: uuidv4()}]
            })
        }

    }

    


    return (
        <Context.Provider value={{
            showCart, cartItems, onAdd, setUser,setPageLoading, totalPrice,shippingData, totalQty, qty, setShowCart, setShippingData,onRemove, user, pageLoading, setTotalQty, setCartItems
        }}>
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context)



export const getServerSideProps = async (context) => {
    const { params, res, req } = context;
    const { productId } = params;
    const productQuery = `*[_type=="product" && productId.current == '${productId}'][0]`;
    const product = await client.fetch(productQuery);
    if (!product) {
      return {
        notFound: true,
      };
    }
    return {
      props: { product },
    };
  };