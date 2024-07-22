import create from 'zustand';
import {  persist } from 'zustand/middleware';

// Define the store
const useUserStore = create(persist((set) => ({
  user: null, // Initial state for user data
  setUser: (user) => set({ user }), // Action to set user data
  logout: () => set({ user: null }), // Action to clear user data (logout)
}),
{
	name: 'user-store',
}
));

export default useUserStore;
