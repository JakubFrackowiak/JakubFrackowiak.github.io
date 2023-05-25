import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

import {
  Chip,
  Divider,
  Grid,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material"
import { SecondTaskSettings } from "./index"
import { BeigeButton } from "components/common/BeigeButton"
import { useEffect, useState } from "react"
import { useFirestore } from "reactfire"
import { doc, updateDoc } from "firebase/firestore"
import { BeigePaper } from "components/common/BeigePaper"

interface TabPanelProps {
  index: number
  value: number
  secondTaskSettings: SecondTaskSettings
}

export function SecondTabPanel({
  value,
  index,
  secondTaskSettings,
}: TabPanelProps) {
  const [levels, setLevels] = useState(0)
  const [words, setWords] = useState([])
  const [newWord, setNewWord] = useState("")
  const firestore = useFirestore()

  useEffect(() => {
    setLevels(secondTaskSettings?.levels)
  }, [secondTaskSettings])

  useEffect(() => {
    setWords(secondTaskSettings?.words)
  }, [secondTaskSettings])

  const handleSave = async () => {
    const settingsRef = doc(firestore, "admin", "SecondTask")
    await updateDoc(settingsRef, {
      levels: levels,
      words: words,
    })
  }

  const handleAddWord = () => {
    if (newWord === "" || words.includes(newWord)) {
      alert("Słowo nie może być puste ani się powtarzać")
      return
    }
    setWords((prevWords) => [...prevWords, newWord])
    setNewWord("")
  }

  const handleDeleteWord = (index) => {
    setWords((prevWords) => prevWords.filter((_, i) => i !== index))
  }

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Stack alignItems="flex-start" justifyContent="center" spacing={2}>
          <BeigePaper p="2rem" width="100%">
            <Stack
              direction="row"
              spacing={3}
              width="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography align="center">
                Zmień poziom trudności (liczba słów do odgadnięcia)
              </Typography>
              <Divider orientation="vertical" flexItem />
              <OutlinedInput
                type="number"
                value={levels}
                onChange={(e) => setLevels(e.target.value as unknown as number)}
              />
            </Stack>
          </BeigePaper>
          <BeigePaper p="2rem" width="100%">
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={3}
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography align="center">
                  Dodaj słowa do odgadnięcia (po jednym)
                </Typography>
                <Divider orientation="vertical" flexItem />
                <OutlinedInput
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="np. Krzesło, Drzewo..."
                  endAdornment={
                    <IconButton onClick={() => handleAddWord()}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  }
                />
              </Stack>
              <Divider />
              <Grid container spacing={2} justifyContent="flex-start">
                {words.map((chip, index) => (
                  <Grid item>
                    <Chip
                      key={index}
                      label={chip}
                      onDelete={() => handleDeleteWord(index)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Divider />
            </Stack>
          </BeigePaper>
          <BeigePaper>
            <Stack justifyContent="space-evenly" direction="row" spacing={2}>
              <BeigeButton width="18rem" onClick={() => handleSave()}>
                Zapisz
              </BeigeButton>
              <Divider orientation="vertical" flexItem />
              <BeigeButton width="18rem">Przywróć domyślne</BeigeButton>
            </Stack>
          </BeigePaper>
        </Stack>
      )}
    </div>
  )
}
