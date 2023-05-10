import { FirstTask } from "components/FirstTask"
import { SecondTask } from "components/SecondTask"
import { Container, Stack } from "@mui/material"
import { useState } from "react"

export default function Badanie() {
  const [currentTask, setCurrentTask] = useState(1)

  const renderTask = () => {
    switch (currentTask) {
      case 1:
        return <FirstTask setCurrentTask={setCurrentTask} />
      case 2:
        return <SecondTask setCurrentTask={setCurrentTask} />
      case 3:
        return <ThirdTask setCurrentTask={setCurrentTask} />
    }
  }

  return (
    <Container maxWidth="md">
      <Stack height="100vh" justifyContent="center" alignItems="center">
        {renderTask()}
      </Stack>
    </Container>
  )
}
