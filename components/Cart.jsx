import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client';

const Cart = () => {
    const {totalPrice, totalQty, cartItems, setShowCart} = useStateContext();

  return (
    <div className="cart-wrapper">
        <div className='cart-container'>
        {cartItems.length < 1 && 
        <div className=' cursor-pointer text-xl flex items-center gap-3' onClick={()=>setShowCart(false)}>
        <AiOutlineLeft/> Dein Einkaufwagen ist leer
    </div>}
    {cartItems.length>0 && (<>
    
            <div className=' cursor-pointer text-xl pb-10 flex items-center gap-3' onClick={()=>setShowCart(false)}>
                <AiOutlineLeft/> Dein Einkaufwagen <span className='text-red-500'>({totalQty} Produkte)</span>
            </div>
            <div className='bg-slate-200 p-4 rounded-lg overflow-auto max-h-[70vh]'>
            {cartItems.map((item, index)=>{
                return (   <div key={index} className='cartProduct flex pb-4 flex-col'>
                <h1 className='text-xl'>{item.name}</h1>
                <div className='h-1 border-b-2 py-1 border-black'></div>
                <div className=' py-3 px-4 cartProductDetails flex items-center'>
                    <div className=' mix-blend-multiply flex-[2]'>
                        <img className='h-[100px] w-[100px] object-contain' src={urlFor(item.colorImages.filter((colorItem)=>colorItem.color === item.chosenColor)[0].allImage[0])} alt="" />
                    </div>
                    <div className='flex flex-col gap-2 items-start flex-[1]'>
                        <div className='text-lg flex justify-between w-[100%]'>
                            <p>Preis :</p> 
                            <p>{item.price}</p>
                        </div>
                        <div className='text-lg flex justify-between w-[100%]'>
                            <p>Farbe :</p> 
                            <p>{item.chosenColor}</p>
                        </div>
                        <div className='text-lg flex justify-between w-[100%]'>
                            <p>Anzahl :</p> 
                            <p>{item.quantity}</p>
                        </div>
                        <button className='underline text-lg text-red-500'>Löschen</button>
                    </div>
                </div>
            </div>              )
            })}
               
            </div>
            </>)}
        </div>
    </div>
  )
}

export default Cart

// <img src={urlFor(`${item.colorImages.filter((coloredItems)=>coloredItems.color === item.chosenColor)}`)} alt="" />