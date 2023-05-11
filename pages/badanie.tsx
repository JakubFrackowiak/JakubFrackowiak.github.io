import { FirstTask } from "components/FirstTask"
import { SecondTask } from "components/SecondTask"
import { Container, Stack, Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react"

export default function Badanie() {
  const [currentTask, setCurrentTask] = useState(0)
  const steps = ["Zadanie 1", "Zadanie 2", "Zadanie 3"]

  const renderTask = () => {
    switch (currentTask) {
      case 0:
        return <FirstTask setCurrentTask={setCurrentTask} />
      case 1:
        return <SecondTask setCurrentTask={setCurrentTask} />
      case 2:
        return <ThirdTask setCurrentTask={setCurrentTask} />
    }
  }

  return (
    <Container maxWidth="md">
      <Stack height="100vh" justifyContent="center" alignItems="center">
        <Stepper activeStep={currentTask}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {}
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {renderTask()}
      </Stack>
    </Container>
  )
}
