import { Stack, Tab, Tabs } from "@mui/material"
import { FirstTabPanel } from "./FirstTabPanel"
import { SecondTabPanel } from "./SecondTabPanel"
import { ThirdTabPanel } from "./ThirdTabPanel"
import { useEffect, useState } from "react"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection } from "firebase/firestore"

export interface SecondTaskSettings {
  levels: number
  words: string[]
}
export interface ThirdTaskSettings {
  questions: string[]
}

export function AdminPanel() {
  const [value, setValue] = useState(0)
  const [secondTaskSettings, setSecondTaskSettings] = useState(null)
  const [thirdTaskSettings, setThirdTaskSettings] = useState(null)

  const firestore = useFirestore()
  const settingsRef = collection(firestore, "admin")
  const { data: settings } = useFirestoreCollectionData(settingsRef)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (settings) {
      setSecondTaskSettings(settings[0])
    }
  }, [settings])

  useEffect(() => {
    if (settings) {
      setThirdTaskSettings(settings[1])
    }
  }, [settings])

  return (
    <Stack height="100%" pt="5rem" spacing={4}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#c4a484",
          },
          "& .MuiTab-root": {
            color: "grey.800",
          },
        }}
      >
        <Tab label="Zdjęcia" />
        <Tab label="Słowa" />
        <Tab label="Pytania" />
      </Tabs>
      <FirstTabPanel value={value} index={0} />
      <SecondTabPanel
        value={value}
        index={1}
        secondTaskSettings={secondTaskSettings as SecondTaskSettings}
      />
      <ThirdTabPanel
        value={value}
        index={2}
        thirdTaskSettings={thirdTaskSettings as ThirdTaskSettings}
      />
    </Stack>
  )
}
