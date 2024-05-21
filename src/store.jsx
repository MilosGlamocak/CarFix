/*import {create} from 'zustand'

export const useAuth = create((set) => ({
    sessionId: null,
    username: null,
    setSessionId: (id) => set((state) => ({sessionId: id})),
    setUsername: (username) => set((state) => ({username: username})),
}))*/

import {create} from 'zustand';

export const useAuth = create((set) => ({
    sessionId: null,
    username: null,
    avatar: null,
    email: null,
    label: null,
    userId: null,
    clearAuthData: () => set({ sessionId: null, username: null, avatar: null, email: null, label: null, userId }),
}));


export const useItems = create((set) => ({
    items: [],
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    addCartItem: (item) => {
        set((state) => {
            const updatedCartItems = [...state.cartItems, item];
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return { cartItems: updatedCartItems };
        });
    },
    clearCartItems: () => {
        set(() => {
            localStorage.setItem('cartItems', JSON.stringify([]));
            return { cartItems: [] };
        });
    },
    deleteCartItem: (itemId) => {
        set((state) => {
            const updatedCartItems = state.cartItems.filter((item) => item.itemId !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            return { cartItems: updatedCartItems };
        })
    },
}));


