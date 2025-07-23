import { create } from "zustand";

type Store = {
    count: number;
    inc: () => void;
    allRemove: () => void;
};

const useRegularStore = create<Store>()((set) => ({
    count: 1,
    inc: () => set((state: any) => ({ count: state.count + 1 })),
    allRemove: () => set({ count: 0 }),
}));

export default useRegularStore;
