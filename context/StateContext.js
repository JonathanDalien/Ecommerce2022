import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import {onAuthStateChanged, signInAnonymously} from "firebase/auth"
import {auth, db} from "../lib/firebase"
import { collection, doc, getDocs, query, setDoc, Timestamp, where, addDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { isResSent } from "next/dist/shared/lib/utils";
import toast from "react-hot-toast";

const { v4: uuidv4 } = require('uuid')

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [qty, setQty] = useState(1);
    const [user, setUser] = useState(null);
    const [anonymousUser, setAnonymousUser] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [shippingData, setShippingData] = useState(null);


    useEffect(()=>{
         onAuthStateChanged(auth, user =>{
            setUser(user)
            setPageLoading(false)
        })
    },[user])

    useEffect(()=>{
        if(user){
        const getCloudItems = async()=>{
            const oldCart = [...cartItems]
            const cartRef = collection(db, "shoppingCarts", user.uid, "CartItems");
            const cart = await getDocs(cartRef)
            const cartArray =cart.docs.map((doc)=>({...doc.data()}))
            if(cartArray.length){
                if(oldCart.length){
                    toast.error("Achtung! Warenkorb wurde aus alter Sitzung wiederhergestellt")
                }
                setCartItems([...cartArray])
            }
            if(!cartArray.length){
            setCartItems([...oldCart])
            cartItems.map((item)=>(addCartFireBase(item, item.chosenColor, item.totalPrice, item.quantity)))}
        }
        getCloudItems();
    }

    },[user])

useEffect(()=>{
    setTotalQty(cartItems.reduce((accuulator, object)=>{
        return accuulator + object.quantity;
    },0))
    let sum = 0;
    cartItems.forEach(element=>{
        sum+=element.totalPrice})
    setTotalPrice(sum)
},[cartItems])

const emptyCartFireBase = async()=>{
    const cartRef = collection(db, "shoppingCarts", user.uid, "CartItems");
    const cart = await getDocs(cartRef)
    const cartArray = cart.docs.map((doc)=>({...doc.data()}))
    cartArray.map((item)=>{
        return deleteDoc(doc(db, "shoppingCarts", user.uid, "CartItems", item._id+item.chosenColor))
    })
}

    const addCartFireBase =async(product, color, totalprice, quantity)=>{
        if(user){
        const cartRef = doc(db, "shoppingCarts", user.uid, "CartItems", product._id+color)
            await setDoc(cartRef, {
                ...product, chosenColor: color, quantity: quantity || 1, totalPrice: totalprice || product.price, uid: product._id+color
              })}
    }

    const updateCartFireBase = async(product, color)=>{
        if(user){
        const productRef = doc(db, "shoppingCarts", user.uid, "CartItems", product._id+color)

        await updateDoc(productRef, {
            quantity: increment(1),
            totalPrice: increment(product.price)
        })}
    }


const deleteItemFirebase = async(product)=>{
    if(user){
    await deleteDoc(doc(db, "shoppingCarts", user.uid, "CartItems", product._id+product.chosenColor))
}}

    const onRemove = (product)=>{
        let foundProduct = cartItems.find(item=> item.uid === product.uid)
        let newCartItems = cartItems.filter(item=>item.uid !==product.uid)
        deleteItemFirebase(product)
        setCartItems(newCartItems)
        toast.error("Produkt aus Warenkorb entfernt")

        setTotalPrice(prevPrice =>prevPrice - foundProduct.price*foundProduct.quantity)
        setTotalQty(prevqty=> prevqty-foundProduct.quantity)
    }

    const onAdd = (product, color) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id && item.chosenColor === color);
        setTotalQty((prevqty) => prevqty + 1);
        toast.success("Produkt wurde deinem Einkaufswagen hinzugefügt!")
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id && cartProduct.chosenColor === color) return {
                    ...cartProduct, quantity: cartProduct.quantity + 1, totalPrice: cartProduct.totalPrice +product.price
                }
                else {
                    return { ...cartProduct }
                }
            })
            setCartItems(updatedCartItems)
            updateCartFireBase(product, color)
        } else {
            addCartFireBase(product, color)
            setCartItems((prevItems) => {
                return [...prevItems, { ...product, quantity: 1, chosenColor: color, uid: product._id+color, totalPrice:product.price}]
            })
        }

    }

    


    return (
        <Context.Provider value={{
            showCart, cartItems, onAdd, setShowMenu, showMenu, emptyCartFireBase,setUser,setPageLoading, totalPrice,shippingData, totalQty, qty, setShowCart, setShippingData,onRemove, user, pageLoading, setTotalQty, setCartItems
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