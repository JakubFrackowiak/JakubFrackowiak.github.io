import { FirstTask } from "components/FirstTask"
import { SecondTask } from "components/SecondTask"
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
  const [currentTask, setCurrentTask] = useState(0)
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

  const updateSheet = () => {
    const imageData1 = firstTaskImages.reduce((obj, name, index) => {
      const newName = name.replace(".jpg", "").split("/")[1]
      obj[`zad1_zdj${index + 1}`] = newName
      return obj
    }, {})
    const imageData2 = secondTaskImages.reduce((obj, name, index) => {
      const newName = name.replace(".jpg", "").split("/")[1]
      obj[`zad2_zdj${index + 1}`] = newName
      return obj
    }, {})
    const data = {
      id: id,
      ...imageData1,
      ...imageData2,
    }
    axios
      .post(
        "https://sheet.best/api/sheets/5f6112d2-8995-4f53-881d-e0b592c4be97",
        data
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
        <Button onClick={() => updateSheet()}>update cell</Button>
      </Stack>
    </Container>
  )
}
