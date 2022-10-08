import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeToCart(state, action) {
            const itemId = action.payload;
            state.quantity -= 1;
            state.products = state.products.filter((x) => {
                return x._id !== itemId;
            });
            return state;

        },
        clearCart(state) {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    },
});

export const { addProduct, removeToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;