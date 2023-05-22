import { Snackbar, Alert, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useSurveyStore } from "../../storage/survey-store"
import { Slot } from "./Slot"
import { BeigePaper } from "components/common/BeigePaper"

export const SecondTask = () => {
  const [word, setWord] = useState("")
  const [letters, setLetters] = useState([])
  const [droppedLetters, setDroppedLetters] = useState([])
  const [toastOpen, setToastOpen] = useState(false)
  const [isSolved, setIsSolved] = useState(false)
  const { setCurrentTask, level, setLevel } = useSurveyStore((state) => ({
    setCurrentTask: state.setCurrentTask,
    level: state.level,
    setLevel: state.setLevel,
  }))

  const words = ["krowa"]

  const pickAndScrambleWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    const randomWord = words[randomIndex]
    const scrambled = randomWord.split("").sort(() => Math.random() - 0.5)
    if (scrambled.join("") === randomWord) {
      pickAndScrambleWord()
      return
    }
    setWord(randomWord.toUpperCase())
    setLetters(() =>
      scrambled.map((letter, index) => ({
        letter: letter.toUpperCase(),
        index,
      }))
    )
    setDroppedLetters(() => Array(scrambled.length).fill(null))
  }

  useEffect(() => {
    pickAndScrambleWord()
  }, [level])

  useEffect(() => {
    const droppedWord = droppedLetters.map((l) => l?.letter).join("")
    if (droppedWord === word && droppedWord !== "" && word !== "") {
      setIsSolved(true)
    }
  }, [droppedLetters])

  useEffect(() => {
    if (isSolved) {
      setToastOpen(true)
      const timeout = setTimeout(() => {
        if (level >= 5) {
          setCurrentTask(3)
          return
        }
        setIsSolved(false)
        setLevel()
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [isSolved])

  const handleSlotClick = (index) => {
    if (!droppedLetters[index]) return
    setDroppedLetters((prev) => {
      const newState = [...prev]
      const removedLetter = newState[index]
      newState[index] = null
      setLetters((prev) => {
        const newState = [...prev]
        newState[removedLetter.index] = removedLetter
        return newState
      })
      return newState
    })
  }

  const handleLetterClick = (index) => {
    if (!letters[index]) return
    const emptySlotIndex = droppedLetters.indexOf(null)
    if (emptySlotIndex === -1) return
    setDroppedLetters((prev) => {
      const newState = [...prev]
      newState[emptySlotIndex] = letters[index]
      return newState
    })
    setLetters((prev) => {
      const newState = [...prev]
      newState[index] = null
      return newState
    })
  }

  return (
    <Stack alignItems="center" width="100%" pt="5vh">
      <Stack spacing={10} alignItems="center" width="100%">
        <Stack my="3vh">
          <BeigePaper>
            <Typography variant="h5" noWrap>
              Ułóż słowo ze wszystkich liter przedstawionych poniżej.
            </Typography>
          </BeigePaper>
        </Stack>
        <Stack
          spacing={2}
          alignItems="center"
          width="100%"
          sx={{ userSelect: "none" }}
        >
          <Stack direction="row" width="100%" spacing={1}>
            {droppedLetters.map((letter, index) => (
              <Slot letter={letter} index={index} onClick={handleSlotClick} />
            ))}
          </Stack>
          <Stack direction="row" width="100%" spacing={1}>
            {letters.map((letter, index) => (
              <Slot letter={letter} index={index} onClick={handleLetterClick} />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        autoHideDuration={2000}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Brawo!
        </Alert>
      </Snackbar>
    </Stack>
  )
}