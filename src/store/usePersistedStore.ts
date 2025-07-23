import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

export const usePersistedStore = create(
    devtools(
        persist(
            set => ({
                bears: 0,
                isAuth: false,
                isSidebarExpand: false,
                increase: () => set((state: any) => ({ bears: state.bears + 1 })),
                removeAll: () => set({ bears: 0 }),
                setAuth: (isAuth: boolean) => set({ isAuth }),
                resetAuth: () => set({ isAuth: false }),
                setSidebarExpand: (is: boolean) => set({ isSidebarExpand: is }),
            }),
            {
                name: 'app-persisted-storage', // name of the item in the storage (must be unique)
                skipHydration: true,
                storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
            }
        ),
        { name: 'usePersistedStore' }
    )
);
export default usePersistedStore;
