import { create } from "zustand";

export const useScratchpadJournal = create((set) => ({
  scratchpads: [], // Change products to scratchpads to match its usage below
  setScratchpads: (scratchpads) => set({ scratchpads }), // Correct naming
  createScratchpad: async (newScratchpad) => {
    if (!newScratchpad.name || !newScratchpad.detail || !newScratchpad.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/scratchpads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newScratchpad),
    });
    const data = await res.json();
    set((state) => ({ scratchpads: [...state.scratchpads, data.data] }));
    return { success: true, message: "Scratchpad created successfully" };
  },
  fetchScratchpads: async () => {
    const res = await fetch("/api/scratchpads");
    const data = await res.json();
    set({ scratchpads: data.data });
  },
  deleteScratchpad: async (pid) => {
    const res = await fetch(`/api/scratchpads/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      scratchpads: state.scratchpads.filter(
        (scratchpad) => scratchpad._id !== pid
      ),
    }));
    return { success: true, message: data.message };
  },
  updateScratchpad: async (pid, updatedScratchpad) => {
    const res = await fetch(`/api/scratchpads/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedScratchpad),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      scratchpads: state.scratchpads.map((scratchpad) =>
        scratchpad._id === pid ? data.data : scratchpad
      ),
    }));

    return { success: true, message: data.message };
  },
}));

// Export as default if this file is expected to provide a default export
