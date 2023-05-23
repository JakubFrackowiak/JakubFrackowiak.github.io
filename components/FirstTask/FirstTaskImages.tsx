"use client"
import { Box, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { BeigePaper } from "../common/BeigePaper"
import { useSurveyStore } from "storage/survey-store"
import Image from "next/image"
import { ProgressBar } from "../common/ProgressBar"
import { Img } from "react-image"
import { grey } from "@mui/material/colors"

export function FirstTaskImages() {
  const {
    setCurrentTask,
    firstTaskIndex,
    setFirstTaskIndex,
    firstTaskURLs,
    thirdTaskURLs,
    progress,
    setProgress,
  } = useSurveyStore((state) => ({
    setCurrentTask: state.setCurrentTask,
    firstTaskIndex: state.firstTaskIndex,
    setFirstTaskIndex: state.setFirstTaskIndex,
    firstTaskURLs: state.firstTaskURLs,
    thirdTaskURLs: state.thirdTaskURLs,
    progress: state.progress,
    setProgress: state.setProgress,
  }))

  useEffect(() => {
    if (firstTaskURLs[firstTaskIndex] && progress >= 100) {
      const interval = setInterval(() => {
        setFirstTaskIndex()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [firstTaskIndex])

  useEffect(() => {
    if (firstTaskIndex === firstTaskURLs.length - 1 && progress >= 100) {
      setCurrentTask(2)
    }
  }, [firstTaskIndex])

  const handleImageLoad = () => {
    setProgress((1 / (firstTaskURLs.length + thirdTaskURLs.length)) * 100)
    console.log("task 1: ", progress)
  }

  return (
    <Stack>
      {firstTaskURLs.map((url, index) => (
        <Box
          sx={{
            display: index === firstTaskIndex ? "block" : "none",
          }}
          height="30rem"
          width="30rem"
        >
          <BeigePaper>
            <Image
              key={index}
              src={url}
              layout="fill"
              objectFit="contain"
              style={{
                borderRadius: "0.5rem",
                transform: "scale(0.9)",
              }}
              priority
              onLoad={() => handleImageLoad()}
              alt="animal image"
            />
          </BeigePaper>
        </Box>
      ))}
    </Stack>
  )
}
