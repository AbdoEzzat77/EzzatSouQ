import axios from "axios";
import { createContext, useState } from "react";
import { useEffect } from "react";
export const cartContext = createContext();

export default function CartContextProvider(props) {
    let headers = {
        token: localStorage.getItem('userToken')
    }
    const [cartId, setCartId] = useState(null);
    async function getCart() {
        let { data } = await getLoggedUserCart();
        setCartId(data?.data._id);
    }
    useEffect(() => {
        getCart();
    },[])

    function addToCart(x) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: x },
            { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }

    function onlinePayment(cartId, values, url) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress: values
            },
            { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }

    function removeCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }

    function updateCartItem(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count: count },
            { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }
    function deleteAllCartItems() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,
            { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }

    return <cartContext.Provider value={{ cartId , addToCart, getLoggedUserCart, removeCartItem, updateCartItem, deleteAllCartItems, onlinePayment }}>
        {props.children}
    </cartContext.Provider>
}