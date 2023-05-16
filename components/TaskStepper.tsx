import { Step, StepLabel, Stepper, Typography } from "@mui/material"
import { Photo, Extension, CheckBox } from "@mui/icons-material"
import BallotIcon from "@mui/icons-material/Ballot"
import { useSurveyStore } from "../surveyStore"

export function TaskStepper() {
  const { currentTask, firstTaskImages, firstTaskIndex, level } =
    useSurveyStore((state) => ({
      currentTask: state.currentTask,
      firstTaskImages: state.firstTaskImages,
      firstTaskIndex: state.firstTaskIndex,
      level: state.level,
    }))
  const steps = ["Oglądaj zdjęcia", "Ułóż wyraz", "Opowiedz na pytania"]
  const stepperIcons = [Photo, Extension, BallotIcon]

  const getLabel = (index) => {
    switch (index) {
      case 0:
        return (
          "Oglądaj zdjęcia " +
          (currentTask == 0
            ? firstTaskIndex + "/" + firstTaskImages.length
            : "")
        )
      case 1:
        return "Ułóż wyraz " + (currentTask == 1 ? level + "/5" : "")
      case 2:
        return "Opowiedz na pytania"
    }
  }

  return (
    <Stepper
      activeStep={currentTask}
      alternativeLabel
      sx={{ width: "100%", justifySelf: "flex-start" }}
    >
      {steps.map((label, index) => {
        return (
          <Step key={label} completed>
            <StepLabel
              StepIconComponent={
                index < currentTask ? CheckBox : stepperIcons[index]
              }
            >
              <Typography>{getLabel(index)}</Typography>
            </StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}
