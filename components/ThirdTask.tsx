import { Stack } from "@mui/material"
import { CopyID } from "./CopyID"
import { Question } from "./Question"
import { ThirdTaskImages } from "./ThirdTaskImages"
import { BeigeButton } from "./BeigeButton"
import { useSurveyStore } from "storage/survey-store"
import { useState } from "react"

export function ThirdTask() {
  const [imageAnswers, setImageAnswers] = useState([])
  const { setThirdTaskIndex, setThirdTaskAnswers, thirdTaskAnswers } =
    useSurveyStore((state) => ({
      thirdTaskAnswers: state.thirdTaskAnswers,
      setThirdTaskIndex: state.setThirdTaskIndex,
      setThirdTaskAnswers: state.setThirdTaskAnswers,
    }))

  const questions = [
    "Czy waliles koniucha do nagich zdiec swojej matki?",
    "Czy waliles koniucha do nagich zdiec swojej matki?",
    "Czy waliles koniucha do nagich zdiec swojej matki?",
    "Czy waliles koniucha do nagich zdiec swojej matki?",
    "Czy waliles koniucha do nagich zdiec swojej matki?",
  ]

  const handleClick = () => {
    setThirdTaskIndex()
    setThirdTaskAnswers(imageAnswers.flat(1))
  }
  console.log("stringi wiktorii hofmokl", thirdTaskAnswers)

  return (
    <Stack width="100%">
      <ThirdTaskImages />
      {questions.map((question, questionIndex) => (
        <Question
          question={question}
          imageAnswers={imageAnswers}
          questionIndex={questionIndex}
          setImageAnswers={setImageAnswers}
        />
      ))}
      <CopyID />
      <Stack py="2rem">
        <BeigeButton onClick={() => handleClick()}>
          Następne zdjęcie
        </BeigeButton>
      </Stack>
    </Stack>
  )
}
