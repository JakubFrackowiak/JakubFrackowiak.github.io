import { Box, Button, Card, styled, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { BeigeButton } from "./BeigeButton"

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
  const [showWord, setShowWord] = useState(false)

  const words = ["butelka"]

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
  }, [])

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

  const isSolved = () => {
    const currentWord = droppedLetters.map((letter) => letter?.letter).join("")
    return currentWord === word
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
      <Stack>
        {isSolved() ? (
          <Stack alignItems="center">
            <Box>Brawo!</Box>
            <Button onClick={() => pickAndScrambleWord()} variant="contained">
              Następne słowo
            </Button>
          </Stack>
        ) : (
          <BeigeButton onClick={() => setShowWord(!showWord)}>
            {showWord ? "Ukryj słowo" : "Odkryj słowo"}
          </BeigeButton>
        )}
        {showWord && !isSolved() ? (
          <Stack justifyContent="center" alignItems="center" height="100%">
            {word.toUpperCase()}
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  )
}
