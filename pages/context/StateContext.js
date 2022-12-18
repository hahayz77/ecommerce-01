import React, { createContext, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';  

const Context = createContext();

export const StateContext = ( { children } ) => {
		const [showCart, setShowCart] = useState(false);
		const [cartItems, setCartItems] = useState([]);
		const [totalPrice, setTotalPrice] = useState(0);
		const [totalQuantities, setTotalQuantities] = useState(0);
		const [qty, setQty] = useState(1);

		// Main Cart LOGIC ####################################################################
		const onAdd = (product, quantity) => {
			const checkProductInCart = cartItems.find((item) => item._id === product._id); 		// Input Item
			const otherProductsInCart = cartItems.find((item) => item._id !== product._id); 	//Other Items


			if(checkProductInCart !== undefined && otherProductsInCart === undefined){      	// CASE 1 - Just the Input Item in the cart
				cartItems[0].qty = cartItems[0].qty + quantity;
				setCartItems(cartItems);
				
			}
			else if(checkProductInCart !== undefined && otherProductsInCart !== undefined){  	// CASE 2 - Input item and other items in cart
				const arrayOfOtherProducts = cartItems.filter((item) => item._id !== product._id);
				checkProductInCart.qty = checkProductInCart.qty + quantity;
				setCartItems([...arrayOfOtherProducts, checkProductInCart]);

			}
			else{                                                                             // CASE 3 - Input Item is'n in the Cart
				product.qty = quantity;
				setCartItems([...cartItems, product]);

			}
			setTotalQuantities(()=>totalQuantities+quantity);
			setTotalPrice(() => totalPrice + product.price * quantity);
			toast.success(`${qty}un ${product.name} was added in cart.`);
			setQty(1);
		}

		// Inside Cart Component LOGIC ####################################################################

		const itemInCart = (product, method) => {
			const arrayOfOtherProducts = cartItems.filter((item) => item._id !== product._id);
			const index = cartItems.findIndex((e)=> e._id === product._id);

			if(method === 'dec'){
				console.log("Decress");
				if(product.qty >1){
					setTotalQuantities(() => totalQuantities - 1);
					setTotalPrice(() => totalPrice - product.price);
					cartItems[index].qty -= 1; 
					console.log(cartItems);
					toast.error(`One ${product.name} Removed! `);

				}else{
					setTotalQuantities(() => totalQuantities - product.qty);
					setTotalPrice(() => totalPrice - product.price * product.qty);
					setCartItems(arrayOfOtherProducts);
					toast.error(`All ${product.name} Removed! `);

				}
			}
			else if(method === 'inc'){ 																							// IMPLEMENTAR LIMITE DE PRODUTOS
				setTotalQuantities(() => totalQuantities + 1);
				setTotalPrice(() => totalPrice + product.price);
				cartItems[index].qty += 1;
				setCartItems(cartItems);
				toast.success(`1un of ${product.name} added in Cart! `);

			}
			else if(method === 'rem'){
				setTotalQuantities(() => totalQuantities - product.qty);
				setTotalPrice(() => totalPrice - product.price * product.qty);
				setCartItems(arrayOfOtherProducts);
				toast.error(`All ${product.name} Removed!`);


			}

		}

		// Add Buttons On Page LOGIC ####################################################################

		const incQty = () => {
				setQty((prevQty) => prevQty + 1);
			}
		
			const decQty = () => {
				setQty((prevQty) => {
					if(prevQty - 1 < 1) return 1;
				 
					return prevQty - 1;
				});
			}

		return(
				<Context.Provider value={{
						showCart,
						setShowCart,
						cartItems,
						totalPrice,
						totalQuantities,
						qty,
						incQty,
						decQty,
						onAdd,
						itemInCart
				}}>
				{children}
				</Context.Provider>
		)
}

export const useStateContext = () => useContext(Context);