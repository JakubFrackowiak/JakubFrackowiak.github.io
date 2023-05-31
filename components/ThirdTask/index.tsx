import axios from "axios"
import { Stack } from "@mui/material"
import { Question } from "./Question"
import { ThirdTaskImages } from "./ThirdTaskImages"
import { BeigePaper } from "components/common/BeigePaper"
import { BeigeButton } from "../common/BeigeButton"
import { useSurveyStore } from "storage/survey-store"
import { useState } from "react"
import { ThirdTaskQuestion } from "./ThirdTaskQuestion"

export function ThirdTask() {
  const [isReady, setIsReady] = useState(false)
  const {
    id,
    setCurrentTask,
    firstTaskImages,
    setThirdTaskIndex,
    thirdTaskImages,
    thirdTaskIndex,
    thirdTaskAnswers,
    thirdTaskAnswerTimes,
    questions,
  } = useSurveyStore((state) => ({
    id: state.id,
    setCurrentTask: state.setCurrentTask,
    firstTaskImages: state.firstTaskImages,
    thirdTaskAnswers: state.thirdTaskAnswers,
    thirdTaskImages: state.thirdTaskImages,
    thirdTaskIndex: state.thirdTaskIndex,
    setThirdTaskIndex: state.setThirdTaskIndex,
    thirdTaskAnswerTimes: state.thirdTaskAnswerTimes,
    questions: state.questions,
  }))

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
    const data = {
      id: id,
      ...firstTaskImages,
      ...thirdTaskImages,
      ...thirdTaskAnswers,
      ...thirdTaskAnswerTimes,
    }
    axios.post(
      "https://script.google.com/macros/s/AKfycbzzFQSoOLTJqApJciDfIDJoHVO6Br3c9Q42hFDR7g_d1zo9DSphAyieFQXSrBW9LXrCcg/exec",
      JSON.stringify(data)
    )
  }

  const handleClick = () => {
    if (thirdTaskIndex < Object.values(thirdTaskImages).length - 1) {
      setThirdTaskIndex()
    } else {
      updateSheet()
      setCurrentTask(4)
    }
  }

  const handleReady = () => {
    setIsReady(true)
  }

  return (
    <Stack width="100%" height="100%" justifyContent="space-between">
      <Stack
        display={isReady ? "inline-flex" : "none"}
        width="100%"
        spacing={4}
        alignItems="center"
      >
        <ThirdTaskImages />
        <Stack
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
          pb="1rem"
        >
          <BeigePaper height="fit-content">
            {questions.map((question, questionIndex) => (
              <Question question={question} questionIndex={questionIndex} />
            ))}
          </BeigePaper>
          <BeigeButton
            onClick={() => handleClick()}
            disabled={questions
              .map((question, questionIndex) => {
                return (
                  thirdTaskAnswers[
                    `zad3_zdj${thirdTaskIndex + 1}_odp${questionIndex + 1}`
                  ] === undefined
                )
              })
              .some((answer) => answer === true)}
          >
            Następne zdjęcie
          </BeigeButton>
        </Stack>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="space-evenly"
        display={isReady ? "none" : "inline-flex"}
        height="100%"
      >
        <ThirdTaskQuestion />
        <BeigeButton onClick={() => handleReady()}>
          Rozpocznij zadanie
        </BeigeButton>
      </Stack>
    </Stack>
  )
}
