import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SurveyStore {
  reset: () => void
  currentTask: number
  setCurrentTask: (currentTask: number) => void
  firstTaskImages: string[]
  setFirstTaskImages: (firstTaskImages: string[]) => void
  firstTaskIndex: number
  setFirstTaskIndex: () => void
  firstTaskURLs: string[]
  setFirstTaskURLs: (firstTaskURLs: string[]) => void
  isFirstTaskLoaded: boolean
  setIsFirstTaskLoaded: (isFirstTaskLoaded: boolean) => void
  thirdTaskImages: string[]
  setThirdTaskImages: (thirdTaskImages: string[]) => void
  thirdTaskIndex: number
  setThirdTaskIndex: () => void
  thirdTaskURLs: string[]
  setThirdTaskURLs: (thirdTaskURLs: string[]) => void
  isThirdTaskLoaded: boolean
  setIsThirdTaskLoaded: (isThirdTaskLoaded: boolean) => void
  thirdTaskAnswers: string[]
  setThirdTaskAnswers: (indexes: number[], answer: string) => void
  level: number
  setLevel: () => void
  id: string
  setId: (id: string) => void
  progress: number
  setProgress: (progress: number) => void
}

const initialState = {
  currentTask: 3,
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
      setCurrentTask: (currentTask) => set({ currentTask: currentTask }),
      setFirstTaskImages: (firstTaskImages) =>
        set({ firstTaskImages: firstTaskImages }),
      setFirstTaskIndex: () =>
        set({ firstTaskIndex: get().firstTaskIndex + 1 }),
      setFirstTaskURLs: (firstTaskURLs) =>
        set({ firstTaskURLs: firstTaskURLs }),
      setIsFirstTaskLoaded: (isFirstTaskLoaded) =>
        set({ isFirstTaskLoaded: isFirstTaskLoaded }),
      setThirdTaskImages: (thirdTaskImages) =>
        set({ thirdTaskImages: thirdTaskImages }),
      setThirdTaskIndex: () =>
        set({ thirdTaskIndex: get().thirdTaskIndex + 1 }),
      setThirdTaskURLs: (thirdTaskURLs) =>
        set({ thirdTaskURLs: thirdTaskURLs }),
      setIsThirdTaskLoaded: (isThirdTaskLoaded) =>
        set({ isThirdTaskLoaded: isThirdTaskLoaded }),
      setThirdTaskAnswers: (indexes, answer) =>
        set({
          thirdTaskAnswers: setThirdTaskAnswers(indexes, answer, get),
        }),
      setLevel: () => set({ level: get().level + 1 }),
      setId: (id) => set({ id: id }),
      setProgress: (progress) =>
        set({
          progress: get().progress >= 100 ? 100 : get().progress + progress,
        }),
    }),
    {
      name: "survey-storage",
    }
  )
)

function setThirdTaskAnswers(indexes, answer, get) {
  const thirdTaskAnswers = get().thirdTaskAnswers
  let nestedArray = thirdTaskAnswers
  for (let i = 0; i < indexes.length - 1; i++) {
    const index = indexes[i]
    if (nestedArray[index] === undefined) {
      nestedArray[index] = []
    }
    nestedArray = nestedArray[index]
  }
  const lastCoordinate = indexes[indexes.length - 1]
  nestedArray[lastCoordinate] = answer
  return thirdTaskAnswers
}
