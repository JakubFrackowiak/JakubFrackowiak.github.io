import { FirstTask } from "components/FirstTask"
import { SecondTask } from "components/SecondTask"
import { ThirdTask } from "components/ThirdTask"
import { Container, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { getRandomImages } from "storage/images"
import { useStorage } from "reactfire"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { TaskStepper } from "components/TaskStepper"
import { BeigeButton } from "components/BeigeButton"
import { useSurveyStore } from "../storage/survey-store"

export default function Badanie() {
  const {
    currentTask,
    setCurrentTask,
    firstTaskImages,
    setFirstTaskImages,
    thirdTaskImages,
    setThirdTaskImages,
    id,
    setId,
  } = useSurveyStore((state) => ({
    currentTask: state.currentTask,
    setCurrentTask: state.setCurrentTask,
    firstTaskImages: state.firstTaskImages,
    setFirstTaskImages: state.setFirstTaskImages,
    thirdTaskImages: state.thirdTaskImages,
    setThirdTaskImages: state.setThirdTaskImages,
    id: state.id,
    setId: state.setId,
  }))

  const storage = useStorage()

  const getImages = async () => {
    const { firstTaskImages: firstImages, secondTaskImages: secondImages } =
      await getRandomImages(storage)
    setFirstTaskImages(firstImages)
    setThirdTaskImages(secondImages)
  }

  useEffect(() => {
    if (firstTaskImages.length == 0 && thirdTaskImages.length == 0) {
      getImages()
    }
  }, [])

  useEffect(() => {
    const surveyID = uuidv4()
    if (id == null) {
      setId(surveyID)
    }
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
    const firstTaskImageData = formatImages(firstTaskImages, 1)
    const thirdTaskImageData = formatImages(thirdTaskImages, 2)
    const data = {
      id: id,
      ...firstTaskImageData,
      ...thirdTaskImageData,
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
        return <FirstTask />
      case 1:
        return <SecondTask />
      case 2:
        return <ThirdTask />
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
    </Container>
  )
}
