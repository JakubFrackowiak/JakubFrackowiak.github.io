import { CircularProgress, Stack } from "@mui/material"
import { getDownloadURL, ref } from "firebase/storage"
import { useEffect, useState } from "react"
import { useStorage } from "reactfire"
import { BeigePaper } from "./BeigePaper"
import { Img } from "react-image"

export function ThirdTaskImages({ thirdTaskImages, thirdTaskIndex }) {
  const [thirdTaskURLs, setThirdTaskURLs] = useState([])

  const storage = useStorage()

  useEffect(() => {
    const promises = thirdTaskImages.map((imageName) => {
      const imageRef = ref(storage, imageName)
      return getDownloadURL(imageRef)
    })

    Promise.all(promises).then((urls) => setThirdTaskURLs(urls))
    thirdTaskURLs.map((url) => console.log(url))
  }, [thirdTaskImages])

  console.log(thirdTaskURLs)

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
