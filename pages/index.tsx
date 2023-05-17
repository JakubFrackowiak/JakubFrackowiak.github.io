import {
  Container,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material"
import { BeigeButton } from "components/BeigeButton"
import { BeigePaper } from "components/BeigePaper"
import Link from "next/link"
import { useEffect } from "react"
import { getRandomImages } from "storage/images"
import { useStorage } from "reactfire"
import { v4 as uuidv4 } from "uuid"
import { useSurveyStore } from "storage/survey-store"
import { getDownloadURL, ref } from "firebase/storage"

export default function index() {
  const {
    firstTaskImages,
    setFirstTaskImages,
    setFirstTaskURLs,
    thirdTaskImages,
    setThirdTaskImages,
    setThirdTaskURLs,
    setId,
  } = useSurveyStore((state) => ({
    firstTaskImages: state.firstTaskImages,
    setFirstTaskURLs: state.setFirstTaskURLs,
    setFirstTaskImages: state.setFirstTaskImages,
    thirdTaskImages: state.thirdTaskImages,
    setThirdTaskURLs: state.setThirdTaskURLs,
    setThirdTaskImages: state.setThirdTaskImages,
    id: state.id,
    setId: state.setId,
  }))

  const storage = useStorage()

  const setImages = async () => {
    const { firstTaskImages: firstImages, thirdTaskImages: thirdImages } =
      await getRandomImages(storage)
    setFirstTaskImages(firstImages)
    setThirdTaskImages(thirdImages)
  }

  const setSurveyId = () => {
    const surveyId = uuidv4()
    setId(surveyId)
  }

  const setImageURLs = async (images, task) => {
    try {
      if (images.length > 0) {
        const promises = images.map(async (imageName) => {
          const imageRef = ref(storage, imageName)
          return getDownloadURL(imageRef)
        })
        const urls = await Promise.all(promises)
        if (task === 0) {
          setFirstTaskURLs(urls)
        } else {
          setThirdTaskURLs(urls)
        }
      }
    } catch (error) {
      console.error("Error fetching image URLs:", error)
    }
  }

  useEffect(() => {
    setImages()
    setSurveyId()
  }, [])

  useEffect(() => {
    setImageURLs(firstTaskImages, 0)
    setImageURLs(thirdTaskImages, 2)
  }, [firstTaskImages, thirdTaskImages])

  return (
    <Container
      maxWidth="md"
      sx={{
        my: "10rem",
      }}
    >
      <Stack alignItems="center" spacing={10}>
        <BeigePaper height="20rem">
          <Stack height="100%" justifyContent="space-around">
            <Divider orientation="horizontal" />
            <Typography variant="h6" textAlign="justify" color="grey.800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              sed, dolorem doloribus consequuntur libero nemo nam expedita
              impedit obcaecati eos perspiciatis doloremque magni iure
              reiciendis laudantium ipsum quae, voluptate distinctio!
            </Typography>
            <Divider orientation="horizontal" />
          </Stack>
        </BeigePaper>
        <BeigePaper width="fit-content" p="0">
          <Link href="/badanie">
            <BeigeButton>Rozpocznij badanie</BeigeButton>
          </Link>
        </BeigePaper>
      </Stack>
    </Container>
  )
}
