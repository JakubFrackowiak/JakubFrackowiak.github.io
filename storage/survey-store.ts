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
  thirdTaskImages: string[]
  setThirdTaskImages: (thirdTaskImages: string[]) => void
  thirdTaskIndex: number
  setThirdTaskIndex: () => void
  thirdTaskURLs: string[]
  setThirdTaskURLs: (thirdTaskURLs: string[]) => void
  thirdTaskAnswers: string[]
  setThirdTaskAnswers: (indexes: number[], answer: string) => void
  currentLevel: number
  setCurrentLevel: () => void
  id: string
  setId: (id: string) => void
  progress: number
  setProgress: (progress: number) => void
  words: string[]
  setWords: (words: string[]) => void
  questions: string[]
  setQuestions: (questions: string[]) => void
}

const initialState = {
  currentTask: 0,
  firstTaskImages: [],
  firstTaskIndex: 0,
  firstTaskURLs: [],
  thirdTaskImages: [],
  thirdTaskIndex: 0,
  thirdTaskURLs: [],
  thirdTaskAnswers: [],
  currentLevel: 1,
  id: null,
  progress: 0,
  words: [],
  questions: [],
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
      setThirdTaskImages: (thirdTaskImages) =>
        set({ thirdTaskImages: thirdTaskImages }),
      setThirdTaskIndex: () =>
        set({ thirdTaskIndex: get().thirdTaskIndex + 1 }),
      setThirdTaskURLs: (thirdTaskURLs) =>
        set({ thirdTaskURLs: thirdTaskURLs }),
      setThirdTaskAnswers: (indexes, answer) =>
        set({
          thirdTaskAnswers: setThirdTaskAnswers(indexes, answer, get),
        }),
      setCurrentLevel: () => set({ currentLevel: get().currentLevel + 1 }),
      setId: (id) => set({ id: id }),
      setProgress: (progress) =>
        set({
          progress: get().progress + progress,
        }),
      setWords: (words) => set({ words: words }),
      setQuestions: (questions) => set({ questions: questions }),
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
