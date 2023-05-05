import { listAll, ref } from "firebase/storage"

export const getImageNames = async (storage) => {
  const animals = []
  const categoriesRef = ref(storage, "")
  const categoriesItems = await listAll(categoriesRef)
  const categories = categoriesItems.prefixes
    .map((category) => category.name)
    .filter((category) => category !== "fillers")
  await Promise.all(
    categories.map(async (category) => {
      const categoryRef = ref(storage, category)
      const imageNameItems = await listAll(categoryRef)
      const imageNames = imageNameItems.items.map(
        (item) => category + "/" + item.name
      )
      animals.push(imageNames)
    })
  )
  const fillersRef = ref(storage, "fillers")
  const fillersItems = await listAll(fillersRef)
  const fillers = fillersItems.items.map((item) => "fillers/" + item.name)
  const animalsSliced = animals.map((animalArr) =>
    animalArr.map((image) => image.split(".")[0].slice(0, -1))
  )
  const animalsSets = animalsSliced.map((animalArr) =>
    animalArr.filter((v, i, a) => a.indexOf(v) === i)
  )
  const animalsPaired = animalsSets.map((animalArr) =>
    animalArr.map((image) => [image + "a.jpg", image + "b.jpg"])
  )

  const images = { animals: animalsPaired, fillers }
  return images
}

export const getRandomImages = async (storage) => {
  const { animals, fillers } = await getImageNames(storage)
  const firstAnimalImages = animals.map((animal) => getRandomAnimals(animal, 6))
  const firstFillerImages = getRandomFillers(fillers, 8)
  const firstNewAnimals = animals.map((animalPairs, index) =>
    animalPairs.map((animalPair) =>
      animalPair.filter((a) => !firstAnimalImages[index].includes(a))
    )
  )
  const firstNewFillers = fillers.filter(
    (filler) => !firstFillerImages.includes(filler)
  )
  const firstTaskImages = [
    ...firstAnimalImages.flat(2),
    ...firstFillerImages,
  ].sort(() => Math.random() - 0.5)
  const secondAnimalImages = firstAnimalImages.map((animalPair) =>
    animalPair.map((animal) => {
      const animalName = animal.split(".")[0]
      const lastChar = animalName.slice(-1)
      const newLastChar = lastChar === "a" ? "b.jpg" : "a.jpg"
      const newAnimalName = animalName.slice(0, -1) + newLastChar
      return newAnimalName
    })
  )
  const secondNewAnimals = firstNewAnimals.map((animalPairs, index) =>
    animalPairs
      .map((animalPair) =>
        animalPair.filter((a) => !secondAnimalImages[index].includes(a))
      )
      .filter((animalPairs) => animalPairs.length > 0)
  )
  const secondOddImages = secondNewAnimals.map((animal) =>
    getRandomAnimals(animal, 6)
  )
  const secondFillerImages = getRandomFillers(firstNewFillers, 8)
  const secondTaskImages = [
    ...secondAnimalImages.flat(2),
    ...secondOddImages.flat(2),
    ...secondFillerImages,
  ].sort(() => Math.random() - 0.5)
  return {
    firstTaskImages: firstTaskImages,
    secondTaskImages: secondTaskImages,
  }
}

const getRandomAnimals = (animalArr: string[][], count: number): string[] => {
  const shuffled = animalArr
    .map((animal) => animal[Math.floor(Math.random() * 2)])
    .sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const getRandomFillers = (fillerArr: string[], count: number): string[] => {
  const shuffled = fillerArr.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
