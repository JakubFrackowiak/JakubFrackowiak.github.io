import { useSurveyStore } from "storage/survey-store"
import { BeigeButton } from "./BeigeButton"

export function ImReady() {
  const { setCurrentTask } = useSurveyStore((state) => ({
    setCurrentTask: state.setCurrentTask,
  }))

  return (
    <BeigeButton onClick={() => setCurrentTask(1)}>Jestem gotów</BeigeButton>
  )
}
