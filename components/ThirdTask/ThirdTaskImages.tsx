import Image from "next/image"
import { Box, Stack } from "@mui/material"
import { BeigePaper } from "../common/BeigePaper"
import { useSurveyStore } from "../../storage/survey-store"

export function ThirdTaskImages() {
  const { firstTaskURLs, thirdTaskIndex, thirdTaskURLs, setProgress } =
    useSurveyStore((state) => ({
      firstTaskURLs: state.firstTaskURLs,
      thirdTaskIndex: state.thirdTaskIndex,
      thirdTaskURLs: state.thirdTaskURLs,
      setProgress: state.setProgress,
    }))

  const handleImageLoad = () => {
    setProgress((1 / (firstTaskURLs.length + thirdTaskURLs.length)) * 100)
  }

  return (
    <Stack>
      {thirdTaskURLs.map((url, index) => (
        <Box
          sx={{
            display: index === thirdTaskIndex ? "inline-flex" : "none",
          }}
          key={index}
        >
          <BeigePaper width="30rem" height="40rem" p="0">
            <Image
              key={index}
              src={url}
              layout="fill"
              objectFit="contain"
              style={{
                borderRadius: "0.5rem",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transform: "scale(0.9)",
              }}
              onLoad={() => handleImageLoad()}
              alt="animal image"
              priority
            />
          </BeigePaper>
        </Box>
      ))}
    </Stack>
  )
}
