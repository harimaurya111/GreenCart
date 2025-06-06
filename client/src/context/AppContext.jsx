import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isseller, setIsseller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})



    // Fetch All products

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list")
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    //Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth")
            if (data.success) {
                setIsseller(true)
            } else {
                setIsseller(false)
            }
        } catch (error) {
            setIsseller(false)
        }
    }


    //Fetch user auth Status , User data and Cart Items

    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth")
            if (data.success) {
                setUser(data.user)
                setCartItems({ ...data.user.cartItems });
            }
        } catch (error) {
            setUser(null)
        }
    }


    // Add Product to cart
    const addToCart = (itemId) => {
        if (!user) {
            return toast.error("Please login")
        }
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        toast.success("Added to cart")
    }

    //Update Cart Items Quantity

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //Remove from the card

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
            toast.success("Remove from Cart")
            setCartItems(cartData)
        }
    }


    //Get Cart Item Count

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            totalCount += cartItems[items]
        }
        return totalCount;
    }


    //Get Cart total Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[itemId];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };


    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts()
    }, [])

    // update database cart items 

    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post("/api/cart/update", { userId: user._id, cartItems });
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        if (user) {
            updateCart();
        }
    }, [cartItems]);

    const value = { navigate, user, setUser, isseller, setIsseller, showUserLogin, setShowUserLogin, products, cartItems, currency, addToCart, updateCartItem, removeFromCart, searchQuery, setSearchQuery, getCartCount, getCartAmount, axios, fetchProducts, toast, setCartItems };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
};


export const useAppContext = () => {
    return useContext(AppContext)
}  