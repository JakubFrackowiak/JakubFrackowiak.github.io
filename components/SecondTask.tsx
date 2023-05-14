import { Card, styled, Typography, Snackbar, Alert } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"

const LetterText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  userSelect: "none",
  fontSize: "4rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "4rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.5rem",
  },
}))

export const SecondTask = ({ setCurrentTask }) => {
  const [word, setWord] = useState("")
  const [letters, setLetters] = useState([])
  const [droppedLetters, setDroppedLetters] = useState([])
  const [level, setLevel] = useState(0)
  const [toastOpen, setToastOpen] = useState(false)
  const [isSolved, setIsSolved] = useState(false)

  const words = ["butelk"]

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
          setCurrentTask(2)
          return
        }
        setIsSolved(false)
        setLevel((prev) => prev + 1)
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

  const renderSlots = () => {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        spacing={1}
      >
        {letters.map((_, index) => (
          <Card
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              cursor: droppedLetters[index] ? "pointer" : "default",
            }}
            key={index}
            onClick={() => handleSlotClick(index)}
          >
            <Stack justifyContent="center" alignItems="center" height="100%">
              <LetterText textAlign="center" sx={{ userSelect: "none" }}>
                {droppedLetters[index] ? droppedLetters[index].letter : null}
              </LetterText>
            </Stack>
          </Card>
        ))}
      </Stack>
    )
  }

  const renderLetters = () => {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        spacing={1}
      >
        {letters.map((letter, index) => (
          <Card
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              cursor: letters[index] ? "pointer" : "default",
            }}
            key={index}
            onClick={() => handleLetterClick(index)}
          >
            <Stack justifyContent="center" alignItems="center" height="100%">
              <LetterText
                textAlign="center"
                variant="h3"
                sx={{ userSelect: "none" }}
              >
                {letter?.letter ? letter.letter : null}
              </LetterText>
            </Stack>
          </Card>
        ))}
      </Stack>
    )
  }

  return (
    <Stack spacing={4} alignItems="center" width="100%">
      <Stack
        spacing={2}
        alignItems="center"
        width="100%"
        sx={{ userSelect: "none" }}
      >
        {renderSlots()}
        {renderLetters()}
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
