import { Stack } from "@mui/material"
import { useSurveyStore } from "storage/survey-store"
import { BeigeButton } from "../common/BeigeButton"
import { ProgressBar } from "../common/ProgressBar"

export function ImReady() {
  const { setCurrentTask, progress } = useSurveyStore((state) => ({
    setCurrentTask: state.setCurrentTask,
    progress: state.progress,
  }))

  return (
    <Stack alignItems="center" spacing={6}>
      <ProgressBar progress={progress} />
      <BeigeButton onClick={() => setCurrentTask(1)} disabled={progress < 100}>
        Jestem gotów
      </BeigeButton>
    </Stack>
  )
}
