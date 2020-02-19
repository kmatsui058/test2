import axios from 'axios'
import Swiper, { SwiperOptions } from 'swiper';
import '../scss/index.scss'
interface FavItem {
  element: HTMLLIElement
  user: {
    name: string,
    id: string
  }
  artwork: {
    name: string,
    id: string,
    tags: string[],
    original: string,
  }
}
const favAreaElement = document.getElementsByClassName('display_editable_works')[0]
const previewArea = document.createElement('div')
previewArea.style.position = 'fixed'
previewArea.style.top = '0'
previewArea.style.bottom = '0'
previewArea.style.left = '0'
previewArea.style.right = '0'
previewArea.style.backgroundColor = 'black'
previewArea.style.zIndex = '9999'
previewArea.classList.add('swiper-container')
const swiperWrapper = document.createElement('div')
swiperWrapper.classList.add('swiper-wrapper')
previewArea.appendChild(swiperWrapper)
document.body.appendChild(previewArea)
if (!favAreaElement) throw new Error('favAreaElement not found')
console.log(favAreaElement)
const favItems: FavItem[] = []
if (!favAreaElement.firstElementChild) throw new Error('favAreaElementChild not found')
console.log(favAreaElement.firstElementChild.children)
const target = favAreaElement.firstElementChild.children
const promiseArray: Promise<void>[] = []
for (const index in target) {
  const childElement = target[index]
  if (!(childElement instanceof HTMLLIElement)) break;
  console.log(childElement)
  const workElement = childElement.querySelector('.work')
  const userElement = childElement.querySelector('.user')
  const titleElement = childElement.getElementsByTagName('h1')[0]
  const thumbElement = childElement.getElementsByClassName('ui-scroll-view')[0]
  console.log(thumbElement);
  if (!(workElement instanceof HTMLAnchorElement) || !(userElement instanceof HTMLAnchorElement) || !titleElement || !(thumbElement instanceof HTMLImageElement)) break;
  const userId = userElement.dataset.user_id;
  const userName = userElement.dataset.user_name;
  const workId = workElement.href.split('/')[4]
  const workTitle = titleElement.title
  const tags = thumbElement.dataset.tags?.split(' ')

  const promise = axios.get(`/artworks/${workId}`, { responseType: 'document' }).then(res => {
    console.log(res)
    const document: Document = res.data
    const metaPreloadData = document.getElementById('meta-preload-data')
    if (!(metaPreloadData instanceof HTMLMetaElement)) return
    const content = JSON.parse(metaPreloadData.content)
    console.log(content)
    const imagePath = content.illust[workId].urls.original
    console.log(imagePath)
    const favItem: FavItem = {
      element: childElement,
      user: {
        id: userId || '',
        name: userName || ''
      },
      artwork: {
        id: workId || '',
        name: workTitle || '',
        tags: tags || [],
        original: imagePath
      }
    }
    favItems.push(favItem)
    const imageElement = document.createElement('img')
    imageElement.src = imagePath
    const divElement = document.createElement('div')
    divElement.style.height = '100vh'
    divElement.style.textAlign = 'center'
    divElement.classList.add('swiper-slide')
    imageElement.style.height = '100%'
    divElement.appendChild(imageElement)
    swiperWrapper.appendChild(divElement)
  })
  promiseArray.push(promise)

  console.log(favItems)
}

Promise.all(promiseArray).then(() => {
  const swiper = new Swiper(previewArea, {
    speed: 500,
    spaceBetween: 30,
    slidesPerView: 'auto',
    centeredSlides: true,
    effect: 'slide',
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  })
  console.log(swiper)
}
)



