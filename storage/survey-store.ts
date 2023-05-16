import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SurveyStore {
  currentTask: number
  setCurrentTask: (state: number) => void
  firstTaskImages: string[]
  setFirstTaskImages: (state: string[]) => void
  firstTaskIndex: number
  setFirstTaskIndex: () => void
  firstTaskURLs: string[]
  setFirstTaskURLs: (state: string[]) => void
  thirdTaskImages: string[]
  setThirdTaskImages: (state: string[]) => void
  thirdTaskIndex: number
  setThirdTaskIndex: () => void
  level: number
  setLevel: () => void
  id: string
  setId: (state: string) => void
}

export const useSurveyStore = create(
  persist<SurveyStore>(
    (set, get) => ({
      currentTask: null,
      setCurrentTask: (currentTask: SurveyStore["currentTask"]) =>
        set({ currentTask: currentTask }),
      firstTaskImages: [],
      setFirstTaskImages: (firstTaskImages: SurveyStore["firstTaskImages"]) =>
        set({ firstTaskImages: firstTaskImages }),
      firstTaskIndex: 0,
      setFirstTaskIndex: () =>
        set({ firstTaskIndex: get().firstTaskIndex + 1 }),
      firstTaskURLs: [],
      setFirstTaskURLs: (firstTaskURLs: SurveyStore["firstTaskURLs"]) =>
        set({ firstTaskURLs: firstTaskURLs }),
      thirdTaskImages: [],
      setThirdTaskImages: (thirdTaskImages: SurveyStore["thirdTaskImages"]) =>
        set({ thirdTaskImages: thirdTaskImages }),
      thirdTaskIndex: 0,
      setThirdTaskIndex: () =>
        set({ thirdTaskIndex: get().thirdTaskIndex + 1 }),
      level: 1,
      setLevel: () => set({ level: get().level + 1 }),
      id: null,
      setId: (id: SurveyStore["id"]) => set({ id: id }),
    }),
    {
      name: "survey-storage",
    }
  )
)
