import { Box, Stack } from "@mui/material"
import { CopyID } from "../miscellaneous/CopyID"
import { Question } from "./Question"
import { ThirdTaskImages } from "./ThirdTaskImages"
import { BeigePaper } from "components/common/BeigePaper"
import { BeigeButton } from "../common/BeigeButton"
import { useSurveyStore } from "storage/survey-store"
import { useState } from "react"
import axios from "axios"
import { ThirdTaskQuestion } from "./ThirdTaskQuestion"

export function ThirdTask() {
  const [imageAnswers, setImageAnswers] = useState([])
  const [isReady, setIsReady] = useState(false)
  const {
    id,
    currentTask,
    setCurrentTask,
    firstTaskImages,
    setThirdTaskIndex,
    thirdTaskImages,
    thirdTaskIndex,
    setThirdTaskAnswers,
    thirdTaskAnswers,
  } = useSurveyStore((state) => ({
    id: state.id,
    currentTask: state.currentTask,
    setCurrentTask: state.setCurrentTask,
    firstTaskImages: state.firstTaskImages,
    thirdTaskAnswers: state.thirdTaskAnswers,
    thirdTaskImages: state.thirdTaskImages,
    thirdTaskIndex: state.thirdTaskIndex,
    setThirdTaskIndex: state.setThirdTaskIndex,
    setThirdTaskAnswers: state.setThirdTaskAnswers,
  }))

  const questions = ["Czy widziałeś już to zwierzę?"]

  const formatImages = (images, task) => {
    const imageData = images.reduce((obj, name, index) => {
      const newName = name.replace(".jpg", "").split("/")[1]
      obj[`zad${task}_zdj${index + 1}`] = newName
      return obj
    }, {})
    return imageData
  }

  const formatAnswers = (answers) => {
    const imageData = answers.reduce((obj, task, index) => {
      task.forEach((answer, answerIndex) => {
        const key = `zdj${index + 1}_odp${answerIndex + 1}`
        obj[key] = answer
      })
      return obj
    }, {})
    return imageData
  }

  const updateSheet = async () => {
    const firstTaskImageData = formatImages(firstTaskImages, 1)
    const thirdTaskImageData = formatImages(thirdTaskImages, 3)
    const thirdTaskAnswersData = formatAnswers(thirdTaskAnswers)
    const data = {
      id: id,
      ...firstTaskImageData,
      ...thirdTaskImageData,
      ...thirdTaskAnswersData,
    }
    axios.post(
      "https://script.google.com/macros/s/AKfycbzzFQSoOLTJqApJciDfIDJoHVO6Br3c9Q42hFDR7g_d1zo9DSphAyieFQXSrBW9LXrCcg/exec",
      JSON.stringify(data)
    )
  }

  const handleClick = () => {
    if (thirdTaskImages[thirdTaskIndex + 1]) {
      setThirdTaskIndex()
      setThirdTaskAnswers(imageAnswers)
    } else {
      updateSheet()
      setCurrentTask(4)
    }
  }
  const handleReady = () => {
    setIsReady(true)
  }

  return (
    <Stack width="100%" alignItems="center">
      {isReady ? (
        <Stack>
          <Stack direction="row" spacing={4}>
            <ThirdTaskImages />
            {questions.map((question, questionIndex) => (
              <Question
                question={question}
                imageAnswers={imageAnswers}
                questionIndex={questionIndex}
                setImageAnswers={setImageAnswers}
              />
            ))}
          </Stack>
          <BeigeButton onClick={() => handleClick()}>
            Następne zdjęcie
          </BeigeButton>
        </Stack>
      ) : (
        <Stack alignItems="center">
          <ThirdTaskQuestion />
          <BeigePaper width="fit-content" p="0">
            <BeigeButton onClick={() => handleReady()}>
              Rozpocznij zadanie
            </BeigeButton>
          </BeigePaper>
        </Stack>
      )}
    </Stack>
  )
}
