import { Container, Divider, Stack, Typography } from "@mui/material"
import { BeigeButton } from "components/common/BeigeButton"
import { BeigePaper } from "components/common/BeigePaper"
import Link from "next/link"
import { useEffect } from "react"
import { getRandomImages } from "storage/images"
import { useFirestore, useFirestoreDocData, useStorage } from "reactfire"
import { v4 as uuidv4 } from "uuid"
import { useSurveyStore } from "storage/survey-store"
import { getDownloadURL, ref } from "firebase/storage"
import { doc } from "firebase/firestore"

export default function index() {
  const {
    reset: resetStore,
    firstTaskImages,
    setFirstTaskImages,
    setFirstTaskURLs,
    thirdTaskImages,
    setThirdTaskImages,
    setThirdTaskURLs,
    setId,
    setWords,
    setQuestions,
  } = useSurveyStore((state) => ({
    reset: state.reset,
    firstTaskImages: state.firstTaskImages,
    setFirstTaskURLs: state.setFirstTaskURLs,
    setFirstTaskImages: state.setFirstTaskImages,
    thirdTaskImages: state.thirdTaskImages,
    setThirdTaskURLs: state.setThirdTaskURLs,
    setThirdTaskImages: state.setThirdTaskImages,
    id: state.id,
    setId: state.setId,
    setWords: state.setWords,
    setQuestions: state.setQuestions,
  }))
  const storage = useStorage()
  const firestore = useFirestore()
  const settingsRef = doc(firestore, "admin/Settings")
  const { data: settings, status: settingsStatus } =
    useFirestoreDocData(settingsRef)

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
        if (task === 1) {
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
    resetStore()
    setImages()
    setSurveyId()
  }, [])

  useEffect(() => {
    setImageURLs(firstTaskImages, 1)
    setImageURLs(thirdTaskImages, 3)
  }, [firstTaskImages, thirdTaskImages])

  useEffect(() => {
    const selectedWords = []
    while (selectedWords.length < settings?.levels) {
      const randomIndex = Math.floor(Math.random() * settings?.words.length)
      const randomWord = settings?.words[randomIndex]
      if (!selectedWords.includes(randomWord)) {
        selectedWords.push(randomWord)
      }
    }
    setWords(selectedWords)
    setQuestions(settings?.questions)
  }, [settingsStatus])

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
      }}
    >
      <Stack
        alignItems="center"
        spacing={10}
        height="100%"
        justifyContent="center"
      >
        <BeigePaper height="20rem">
          <Divider orientation="horizontal" />
          <Stack height="100%" justifyContent="space-around">
            <Typography variant="h6" textAlign="justify" color="grey.800">
              To zadanie dotyczy procesów poznawczych zaangażowanych w
              postrzeganie obiektów. Za chwilę zobaczysz 32 fotografie
              przedstawiające różne zwierzęta. Fotografie będą zmieniały się
              same w równym tempie. Przyglądaj się prezentowanym zwierzętom
              najlepiej jak potrafisz, ponieważ po prezentacji nastąpią zadania
              sprawdzające Twoją spostrzegawczość.
            </Typography>
            <Divider orientation="horizontal" />
            <Typography
              variant="h6"
              textAlign="justify"
              color="grey.800"
              alignSelf="center"
            >
              Jeśli jesteś gotowy/a, aby obejrzeć zdjęcia kliknij „Dalej”.
            </Typography>
            <Divider orientation="horizontal" />
          </Stack>
        </BeigePaper>
        <Link href="/badanie">
          <BeigeButton>Dalej</BeigeButton>
        </Link>
      </Stack>
    </Container>
  )
}
