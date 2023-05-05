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
