import { FirstTask } from "components/FirstTask"
import { SecondTask } from "components/SecondTask"
import { ThirdTask } from "components/ThirdTask"
import {
  Button,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material"
import { useEffect, useState } from "react"
import { getRandomImages } from "images"
import { useStorage } from "reactfire"
import axios from "axios"
import uniqid from "uniqid"

export default function Badanie() {
  const [currentTask, setCurrentTask] = useState(1)
  const [firstTaskImages, setFirstTaskImages] = useState([])
  const [secondTaskImages, setSecondTaskImages] = useState([])
  const [id, setId] = useState(uniqid())
  const steps = ["Zadanie 1", "Zadanie 2", "Zadanie 3"]

  const storage = useStorage()

  const getImages = async () => {
    const { firstTaskImages: firstImages, secondTaskImages: secondImages } =
      await getRandomImages(storage)
    setFirstTaskImages(firstImages)
    setSecondTaskImages(secondImages)
  }

  useEffect(() => {
    getImages()
  }, [])

  const formatImages = (images, task) => {
    const imageData = firstTaskImages.reduce((obj, name, index) => {
      const newName = name.replace(".jpg", "").split("/")[1]
      obj[`zad${task}_zdj${index + 1}`] = newName
      return obj
    }, {})
    return imageData
  }

  const updateSheet = async () => {
    const imageData1 = formatImages(firstTaskImages, 1)
    const imageData2 = formatImages(secondTaskImages, 2)
    const data = {
      id: id,
      ...imageData1,
      ...imageData2,
    }
    axios
      .post(
        "https://script.google.com/macros/s/AKfycbzzFQSoOLTJqApJciDfIDJoHVO6Br3c9Q42hFDR7g_d1zo9DSphAyieFQXSrBW9LXrCcg/exec",
        JSON.stringify(data)
      )
      .then((response) => {
        console.log(response)
      })
  }

  const renderTask = () => {
    switch (currentTask) {
      case 0:
        return (
          <FirstTask
            setCurrentTask={setCurrentTask}
            firstTaskImages={firstTaskImages}
          />
        )
      case 1:
        return <SecondTask setCurrentTask={setCurrentTask} />
      case 2:
        return <ThirdTask setCurrentTask={setCurrentTask} />
    }
  }

  return (
    <Container maxWidth="md">
      <Stack
        height="100vh"
        justifyContent="center"
        alignItems="center"
        spacing={6}
      >
        <Stepper
          activeStep={currentTask}
          alternativeLabel
          sx={{ width: "100%" }}
        >
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
      <Button onClick={() => updateSheet()}>add</Button>
    </Container>
  )
}
