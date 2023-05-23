import { Stack, Tab, Tabs, Typography } from "@mui/material"
import { FirstTabPanel } from "./FirstTabPanel"
import { SecondTabPanel } from "./SecondTabPanel"
import { ThirdTabPanel } from "./ThirdTabPanel"
import { useState } from "react"

export function AdminPanel() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

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
      <SecondTabPanel value={value} index={1} />
      <ThirdTabPanel value={value} index={2} />
    </Stack>
  )
}
