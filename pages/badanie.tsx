import { FirstTask } from "components/FirstTask"
import { SecondTask } from "components/SecondTask"
import { ThirdTask } from "components/ThirdTask"
import {
  Box,
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
import { v4 as uuidv4 } from "uuid"
import { TaskStepper } from "components/TaskStepper"
import { BeigeButton } from "components/BeigeButton"

export default function Badanie() {
  const [currentTask, setCurrentTask] = useState(null)
  const [firstTaskImages, setFirstTaskImages] = useState([])
  const [firstTaskIndex, setFirstTaskIndex] = useState(0)
  const [secondTaskImages, setSecondTaskImages] = useState([])
  const [level, setLevel] = useState(1)
  const [id, setId] = useState()

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

  useEffect(() => {
    const surveyID = uuidv4()
    setId(surveyID)
  }, [])

  const formatImages = (images, task) => {
    const imageData = images.reduce((obj, name, index) => {
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
            firstTaskIndex={firstTaskIndex}
            setFirstTaskIndex={setFirstTaskIndex}
          />
        )
      case 1:
        return (
          <SecondTask
            setCurrentTask={setCurrentTask}
            level={level}
            setLevel={setLevel}
          />
        )
      case 2:
        return <ThirdTask id={id} />
      default:
        return (
          <BeigeButton onClick={() => setCurrentTask(0)}>
            Jestem gotów
          </BeigeButton>
        )
    }
  }

  return (
    <Container maxWidth="md">
      <Stack height="100vh" alignItems="center" spacing={6} py="15vh">
        <TaskStepper
          currentTask={currentTask}
          firstTaskIndex={firstTaskIndex}
          level={level}
          imagesLength={firstTaskImages.length}
        />
        <Stack
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          {renderTask()}
        </Stack>
      </Stack>
    </Container>
  )
}
