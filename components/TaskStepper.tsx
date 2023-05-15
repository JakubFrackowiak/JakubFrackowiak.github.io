import { Step, StepLabel, Stepper } from "@mui/material"
import { Photo, Extension, CheckBox, South } from "@mui/icons-material"
import BallotIcon from "@mui/icons-material/Ballot"
import { useState } from "react"

export function TaskStepper({
  currentTask,
  firstTaskIndex,
  level,
  imagesLength,
}) {
  const steps = ["Oglądaj zdjęcia", "Ułóż wyraz", "Opowiedz na pytania"]

  const getLabel = (index) => {
    switch (index) {
      case 0:
        return (
          "Oglądaj zdjęcia " +
          (currentTask == 0 ? firstTaskIndex + "/" + imagesLength : "")
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
        const stepProps: { completed?: boolean } = {}
        const stepperIcons = [Photo, Extension, BallotIcon]
        const currentIcon = { icon: null }
        if (index === currentTask) {
          currentIcon.icon = South
        } else if (index < currentTask) {
          currentIcon.icon = CheckBox
        } else {
          currentIcon.icon = stepperIcons[index]
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel StepIconComponent={currentIcon.icon}>
              {getLabel(index)}
            </StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}
