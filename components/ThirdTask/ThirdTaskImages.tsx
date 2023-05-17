import { CircularProgress, Stack } from "@mui/material"
import { getDownloadURL, ref } from "firebase/storage"
import { useEffect } from "react"
import { useStorage } from "reactfire"
import { BeigePaper } from "../common/BeigePaper"
import { Img } from "react-image"
import { useSurveyStore } from "../../storage/survey-store"

export function ThirdTaskImages() {
  const { thirdTaskImages, thirdTaskIndex, thirdTaskURLs, setThirdTaskURLs } =
    useSurveyStore((state) => ({
      thirdTaskImages: state.thirdTaskImages,
      thirdTaskIndex: state.thirdTaskIndex,
      thirdTaskURLs: state.thirdTaskURLs,
      setThirdTaskURLs: state.setThirdTaskURLs,
    }))

  const storage = useStorage()

  useEffect(() => {
    const promises = thirdTaskImages.map((imageName) => {
      const imageRef = ref(storage, imageName)
      return getDownloadURL(imageRef)
    })

    Promise.all(promises).then((urls) => setThirdTaskURLs(urls))
  }, [thirdTaskImages])

  return thirdTaskURLs && thirdTaskURLs.length > 0 ? (
    <Stack>
      <BeigePaper width="fit-content" height="60vh" p="0">
        {thirdTaskURLs.map((url, index) => (
          <Img
            key={index}
            src={url}
            style={{
              height: "60vh",
              width: "100%",
              objectFit: "contain",
              borderRadius: "0.8rem",
              display: index === thirdTaskIndex ? "block" : "none",
            }}
            alt="animal image"
          />
        ))}
      </BeigePaper>
    </Stack>
  ) : (
    <CircularProgress variant="indeterminate" />
  )
}
