import { Step, StepLabel, Stepper, Typography } from "@mui/material"
import { Photo, Extension, CheckBox } from "@mui/icons-material"
import BallotIcon from "@mui/icons-material/Ballot"
import { useSurveyStore } from "../storage/survey-store"
import { useEffect, useState } from "react"

export function TaskStepper() {
  const [activeStep, setActiveStep] = useState(0)
  const {
    currentTask,
    firstTaskImages,
    firstTaskIndex,
    thirdTaskIndex,
    thirdTaskImages,
    level,
  } = useSurveyStore((state) => ({
    currentTask: state.currentTask,
    firstTaskImages: state.firstTaskImages,
    firstTaskIndex: state.firstTaskIndex,
    thirdTaskIndex: state.thirdTaskIndex,
    thirdTaskImages: state.thirdTaskImages,
    level: state.level,
  }))
  const steps = ["Oglądaj zdjęcia", "Ułóż wyraz", "Opowiedz na pytania"]
  const stepperIcons = [Photo, Extension, BallotIcon]

  useEffect(() => {
    setActiveStep(currentTask - 1)
  }, [currentTask])

  const getLabel = (index) => {
    switch (index) {
      case 0:
        return (
          "Oglądaj zdjęcia " +
          (currentTask == 1
            ? firstTaskIndex + 1 + "/" + firstTaskImages.length
            : "")
        )
      case 1:
        return "Ułóż wyraz " + (currentTask == 2 ? level + "/5" : "")
      case 2:
        return (
          "Opowiedz na pytania " +
          (currentTask == 3
            ? thirdTaskIndex + 1 + "/" + thirdTaskImages.length
            : "")
        )
    }
  }

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{ width: "100%", justifySelf: "flex-start" }}
    >
      {steps.map((label, index) => {
        return (
          <Step key={label} completed>
            <StepLabel
              StepIconComponent={
                index < activeStep ? CheckBox : stepperIcons[index]
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
