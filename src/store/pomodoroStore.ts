import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PomodoroState {
  isPinned: boolean;
  position: { x: number; y: number };
  selectedDuration: number;
  setIsPinned: (isPinned: boolean) => void;
  setPosition: (position: { x: number; y: number }) => void;
  setSelectedDuration: (duration: number) => void;
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set) => ({
      isPinned: false,
      position: { x: 0, y: 0 },
      selectedDuration: 1500, // 25 minutes in seconds
      setIsPinned: (isPinned) => set({ isPinned }),
      setPosition: (position) => set({ position }),
      setSelectedDuration: (selectedDuration) => set({ selectedDuration }),
    }),
    {
      name: 'pomodoro-storage',
      partialize: (state) => ({ 
        isPinned: state.isPinned,
        position: state.position,
        selectedDuration: state.selectedDuration
      }),
    }
  )
);