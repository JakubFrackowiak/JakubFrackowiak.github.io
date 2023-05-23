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
  setThirdTaskAnswers: (
    thirdTaskAnswers: string,
    imageIndex: number,
    questionIndex
  ) => void
  fillThirdTaskAnswers: (thirdTaskAnswers: string[]) => void
  level: number
  setLevel: () => void
  id: string
  setId: (id: string) => void
  progress: number
  setProgress: (progress: number) => void
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
      setThirdTaskAnswers: (thirdTaskAnswer, imageIndex, questionIndex) =>
        set({
          thirdTaskAnswers: setThirdTaskAnswers(
            thirdTaskAnswer,
            imageIndex,
            questionIndex,
            get
          ),
        }),
      fillThirdTaskAnswers: (nbQuestions) =>
        set({
          thirdTaskAnswers: fillThirdTaskAnswers(nbQuestions, get),
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

const setThirdTaskAnswers = (
  thirdTaskAnswer,
  imageIndex,
  questionIndex,
  get
) => {
  const thirdTaskAnswers = get().thirdTaskAnswers
  thirdTaskAnswers[imageIndex][questionIndex] = thirdTaskAnswer
  return thirdTaskAnswers
}

const fillThirdTaskAnswers = (nbQuestions, get) => {
  const thirdTaskAnswers = get().thirdTaskAnswers
  for (let i = 0; i < thirdTaskAnswers; i++) {
    thirdTaskAnswers[i] = new Array(nbQuestions).fill(null)
  }
  return thirdTaskAnswers
}
