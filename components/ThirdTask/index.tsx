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
    fillThirdTaskAnswers,
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
    fillThirdTaskAnswers: state.fillThirdTaskAnswers,
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
    fillThirdTaskAnswers(1)
  }
  const handleReady = () => {
    setIsReady(true)
  }
  console.log("thirdTaskAnswers: ", thirdTaskAnswers)

  return (
    <Stack width="100%">
      <Stack display={isReady ? "inline-flex" : "none"} width="100%">
        <Stack direction="row" spacing={4}>
          <ThirdTaskImages />
          {questions.map((question, questionIndex) => (
            <Question question={question} questionIndex={questionIndex} />
          ))}
        </Stack>
        <BeigeButton onClick={() => handleClick()}>
          Następne zdjęcie
        </BeigeButton>
      </Stack>
      <Stack
        alignItems="center"
        spacing={4}
        display={isReady ? "none" : "inline-flex"}
        width="100%"
      >
        <ThirdTaskQuestion />
        <BeigeButton onClick={() => handleReady()}>
          Rozpocznij zadanie
        </BeigeButton>
      </Stack>
    </Stack>
  )
}
