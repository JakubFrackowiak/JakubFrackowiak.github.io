import { Stack, Tab, Tabs, Typography } from "@mui/material"
import { FirstTabPanel } from "./FirstTabPanel"
import { SecondTabPanel } from "./SecondTabPanel"
import { ThirdTabPanel } from "./ThirdTabPanel"
import { useState } from "react"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import { collection } from "firebase/firestore"

export interface SecondTaskSettings {
  levels: number
  words: string[]
}

export function AdminPanel() {
  const [value, setValue] = useState(0)

  const firestore = useFirestore()
  const settingsRef = collection(firestore, "admin")
  const { data: settings } = useFirestoreCollectionData(settingsRef)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const secondTaskSettings = settings.find(
    (obj) => obj.NO_ID_FIELD === "SecondTask"
  )

  return (
    <Stack>
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
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      <FirstTabPanel value={value} index={0} />
      <SecondTabPanel
        value={value}
        index={1}
        secondTaskSettings={secondTaskSettings as SecondTaskSettings}
      />
      <ThirdTabPanel value={value} index={2} />
    </Stack>
  )
}
