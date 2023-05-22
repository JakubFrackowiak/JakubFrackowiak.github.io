import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SurveyStore {
  reset: () => void
  currentTask: number
  setCurrentTask: (state: number) => void
  firstTaskImages: string[]
  setFirstTaskImages: (state: string[]) => void
  firstTaskIndex: number
  setFirstTaskIndex: () => void
  firstTaskURLs: string[]
  setFirstTaskURLs: (state: string[]) => void
  isFirstTaskLoaded: boolean
  setIsFirstTaskLoaded: (state: boolean) => void
  thirdTaskImages: string[]
  setThirdTaskImages: (state: string[]) => void
  thirdTaskIndex: number
  setThirdTaskIndex: () => void
  thirdTaskURLs: string[]
  setThirdTaskURLs: (state: string[]) => void
  isThirdTaskLoaded: boolean
  setIsThirdTaskLoaded: (state: boolean) => void
  thirdTaskAnswers: string[]
  setThirdTaskAnswers: (state: string[]) => void
  level: number
  setLevel: () => void
  id: string
  setId: (state: string) => void
  progress: number
  setProgress: (state: number) => void
}

const initialState = {
  currentTask: 0,
  firstTaskImages: [],
  firstTaskIndex: 0,
  firstTaskURLs: [],
  isFirstTaskLoaded: false,
  thirdTaskImages: [],
  thirdTaskIndex: 0,
  thirdTaskURLs: [],
  isThirdTaskLoaded: false,
  thirdTaskAnswers: [],
  level: 1,
  id: null,
  progress: 0,
}

export const useSurveyStore = create(
  persist<SurveyStore>(
    (set, get) => ({
      ...initialState,
      reset: () => set(initialState),
      setCurrentTask: (currentTask: SurveyStore["currentTask"]) =>
        set({ currentTask: currentTask }),
      setFirstTaskImages: (firstTaskImages: SurveyStore["firstTaskImages"]) =>
        set({ firstTaskImages: firstTaskImages }),
      setFirstTaskIndex: () =>
        set({ firstTaskIndex: get().firstTaskIndex + 1 }),
      setFirstTaskURLs: (firstTaskURLs: SurveyStore["firstTaskURLs"]) =>
        set({ firstTaskURLs: firstTaskURLs }),
      setIsFirstTaskLoaded: (
        isFirstTaskLoaded: SurveyStore["isFirstTaskLoaded"]
      ) => set({ isFirstTaskLoaded: isFirstTaskLoaded }),
      setThirdTaskImages: (thirdTaskImages: SurveyStore["thirdTaskImages"]) =>
        set({ thirdTaskImages: thirdTaskImages }),
      setThirdTaskIndex: () =>
        set({ thirdTaskIndex: get().thirdTaskIndex + 1 }),
      setThirdTaskURLs: (thirdTaskURLs: SurveyStore["thirdTaskURLs"]) =>
        set({ thirdTaskURLs: thirdTaskURLs }),
      setIsThirdTaskLoaded: (
        isThirdTaskLoaded: SurveyStore["isThirdTaskLoaded"]
      ) => set({ isThirdTaskLoaded: isThirdTaskLoaded }),
      setThirdTaskAnswers: (
        thirdTaskAnswers: SurveyStore["thirdTaskAnswers"]
      ) => set({ thirdTaskAnswers: thirdTaskAnswers }),
      setLevel: () => set({ level: get().level + 1 }),
      setId: (id: SurveyStore["id"]) => set({ id: id }),
      setProgress: (progress: SurveyStore["progress"]) =>
        set({
          progress: get().progress >= 100 ? 100 : get().progress + progress,
        }),
    }),
    {
      name: "survey-storage",
    }
  )
)
