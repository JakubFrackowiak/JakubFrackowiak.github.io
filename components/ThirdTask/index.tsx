import { Box, Stack } from "@mui/material"
import { CopyID } from "../miscellaneous/CopyID"
import { Question } from "./Question"
import { ThirdTaskImages } from "./ThirdTaskImages"
import { BeigeButton } from "../common/BeigeButton"
import { useSurveyStore } from "storage/survey-store"
import { useState } from "react"
import axios from "axios"

export function ThirdTask() {
  const [imageAnswers, setImageAnswers] = useState([])
  const {
    id,
    firstTaskImages,
    setThirdTaskIndex,
    thirdTaskImages,
    thirdTaskIndex,
    setThirdTaskAnswers,
    thirdTaskAnswers,
  } = useSurveyStore((state) => ({
    id: state.id,
    firstTaskImages: state.firstTaskImages,
    thirdTaskAnswers: state.thirdTaskAnswers,
    thirdTaskImages: state.thirdTaskImages,
    thirdTaskIndex: state.thirdTaskIndex,
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

  const formatImages = (images, task) => {
    const imageData = images.reduce((obj, name, index) => {
      const newName = name.replace(".jpg", "").split("/")[1]
      obj[`zad${task + 1}_zdj${index + 1}`] = newName
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
      ...thirdTaskAnswers,
    }
    axios.post(
      "https://script.google.com/macros/s/AKfycbzzFQSoOLTJqApJciDfIDJoHVO6Br3c9Q42hFDR7g_d1zo9DSphAyieFQXSrBW9LXrCcg/exec",
      JSON.stringify(data)
    )
  }

  const handleClick = () => {
    if (thirdTaskImages[thirdTaskIndex + 1]) {
      setThirdTaskIndex()
      setThirdTaskAnswers(imageAnswers.flat(1))
    } else {
      updateSheet()
    }
  }

  console.log(thirdTaskAnswers)
  console.log("thirdTaskIndex", thirdTaskIndex)

  return (
    <Stack width="100%" alignItems="center">
      {thirdTaskImages[thirdTaskIndex] ? (
        <Box>
          <ThirdTaskImages />
          {questions.map((question, questionIndex) => (
            <Question
              question={question}
              imageAnswers={imageAnswers}
              questionIndex={questionIndex}
              setImageAnswers={setImageAnswers}
            />
          ))}
          <Stack py="2rem">
            {thirdTaskIndex}
            <BeigeButton onClick={() => handleClick()}>
              Następne zdjęcie
            </BeigeButton>
          </Stack>
        </Box>
      ) : null}
    </Stack>
  )
}
