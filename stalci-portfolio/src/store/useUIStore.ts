import { create } from "zustand";
import { CaseStudyItem, ProjectCategory } from "@/types/project";

interface UIState {
  // Projects Showcase State
  selectedProjectCategory: ProjectCategory;
  activeCaseStudy: CaseStudyItem | null;
  
  // Modal & Drawer Toggles
  isContactModalOpen: boolean;
  isMobileNavOpen: boolean;

  // Actions
  setSelectedProjectCategory: (category: ProjectCategory) => void;
  setActiveCaseStudy: (caseStudy: CaseStudyItem | null) => void;
  setContactModalOpen: (isOpen: boolean) => void;
  setMobileNavOpen: (isOpen: boolean) => void;
  toggleMobileNav: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedProjectCategory: "All",
  activeCaseStudy: null,
  isContactModalOpen: false,
  isMobileNavOpen: false,

  setSelectedProjectCategory: (category) => set({ selectedProjectCategory: category }),
  setActiveCaseStudy: (caseStudy) => set({ activeCaseStudy: caseStudy }),
  setContactModalOpen: (isOpen) => set({ isContactModalOpen: isOpen }),
  setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
}));
