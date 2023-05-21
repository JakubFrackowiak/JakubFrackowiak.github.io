import { FirstTask } from "components/FirstTask"
import { SecondTask } from "components/SecondTask"
import { ThirdTask } from "components/ThirdTask"
import { Container, Stack } from "@mui/material"
import { TaskStepper } from "components/TaskStepper"
import { useSurveyStore } from "../storage/survey-store"
import { HydrationProvider, Client } from "react-hydration-provider"
import { CopyID } from "components/miscellaneous/CopyID"
import { ImReady } from "components/miscellaneous/ImReady"

export default function Badanie() {
  const { currentTask } = useSurveyStore((state) => ({
    currentTask: state.currentTask,
  }))

  const renderTask = () => {
    switch (currentTask) {
      case 0:
        return <ImReady />
      case 1:
        return <FirstTask />
      case 2:
        return <SecondTask />
      case 3:
        return <ThirdTask />
      case 4:
        return <CopyID />
    }
  }

  return (
    <Container maxWidth="md">
      <HydrationProvider>
        <Client>
          <Stack alignItems="center" spacing={6} py="10vh">
            <TaskStepper />
            <Stack
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              {renderTask()}
            </Stack>
          </Stack>
        </Client>
      </HydrationProvider>
    </Container>
  )
}
