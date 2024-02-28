import Konva from 'konva'
import { getImgUrlType } from '@/utils'
// import GIFRenderer from 'gif-canvas-renderer'
// import parseAPNG, { APNG } from 'apng-js'
// import { loadImage, getImgUrlType, isAPNG, getImgBuffer } from '../helper'

const generatePureImageNode = async (url: string, imageNode: Konva.Image): Promise<any> => {
  return new Promise((resolve, reject) => {
    Konva.Image.fromURL(
      url,
      (node: Konva.Image) => {
        // 在图像加载成功后，设置crossOrigin属性
        // const img = imageNode.image() as HTMLImageElement
        // if (img) img.crossOrigin = 'Anonymous'
        // return resolve(imageNode)
        imageNode.image(node.image())
        resolve({ imageNode, frames: [{ imageData: node.image() }], duration: 1 })
      },
      () => {
        console.warn('图片加载失败', url)
        // 返回一个空的 Image 对象
        const image = new Image()
        imageNode.image(image)
        resolve({ imageNode, frames: [{ imageData: image }], duration: 1 })
        // return reject(new Konva.Image({ image: new Image() }))
      }
    )
  })
}

// const generateGifNode = async (url: string, layer: Konva.Layer, imageNode: Konva.Image) => {
//   const canvas = document.createElement('canvas')
//   // const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
//   const image = (await loadImage(url)) as HTMLImageElement
//   // image.crossOrigin = 'Anonymous'
//   canvas.width = image.width
//   canvas.height = image.height
//   const curImageDate = { value: null }
//   const gifObject = new GIFRenderer({
//     gifSource: url,
//     canvasElement: canvas,
//     renderGif: true,
//     onFrameChange: (imageData) => {
//       curImageDate.value = imageData
//     },
//     // eslint-disable-next-line @typescript-eslint/no-empty-function
//     handleOnCompleteLoop: () => {},
//     delay: 0,
//     useRequestAnimationFrame: true,
//     runGifOnce: false
//   })

//   // TODO 这里注释掉应该不会有问题，找刘博确认下
//   // gifObject.playing = false

//   return new Promise((resolve) => {
//     gifObject.load(() => {
//       imageNode.image(canvas)
//       if (gifObject && gifObject.frames && gifObject.frames.length > 0) {
//         resolve({ imageNode, canvas, gifObject, layer, curImageDate })
//       }
//     })
//   })
// }

// const generateAPngNode = async (
//   buffer: ArrayBuffer,
//   layer: Konva.Layer,
//   imageNode: Konva.Image
// ) => {
//   // 生成 apng 实例并播放
//   // const buffer = await getImgBuffer(url, {
//   //   width: imageNode.width(),
//   //   height: imageNode.height()
//   // });
//   const apng = parseAPNG(buffer) as APNG
//   const canvas = document.createElement('canvas')
//   // const image = await loadImage(url) as HTMLImageElement;
//   canvas.width = imageNode.width()
//   canvas.height = imageNode.height()
//   const ctx = canvas.getContext('2d')
//   const player = await apng.getPlayer(ctx)
//   let frames = apng.frames
//   let duration = apng.playTime
//   imageNode.image(canvas)
//   return { imageNode, duration, frames, canvas, player, layer }
// }

// const generateAPngNode = async (url: string, layer: Konva.Layer, imageNode: Konva.Image) => {
//   // 生成 apng 实例并播放
//   const buffer = await getImgBuffer(url, {
//     width: imageNode.width(),
//     height: imageNode.height()
//   });
//   const apng = parseAPNG(buffer) as APNG;
//   const canvas = document.createElement('canvas');
//   const image = await loadImage(url) as HTMLImageElement;
//   canvas.width = image.width
//   canvas.height = image.height
//   const ctx = canvas.getContext('2d');
//   const player = await apng.getPlayer(ctx);
//   let frames = apng.frames;
//   let duration = apng.playTime;
//   imageNode.image(canvas);
//   return { imageNode, duration, frames, canvas, player, layer };
// }

export enum IMAGE_TYPES {
  'gif',
  'apng',
  'common'
}

const generateImageNode = async (url: string, layer: Konva.Layer, imageNode: Konva.Image) => {
  const urlType = getImgUrlType(url)
  // if (['gif'].includes(urlType) && layer) {
  //   return { value: await generateGifNode(url, layer, imageNode), type: IMAGE_TYPES.gif }
  // }
  // let newUrl = `${url}?requestTag=videtor_render`
  // if (url.indexOf('?') >= 0) {
  //   newUrl = `${url}&requestTag=videtor_render`
  // }
  // const apngBuffer = await isAPNG(newUrl, {
  //   width: imageNode.width(),
  //   height: imageNode.height()
  // })
  // if (apngBuffer && layer) {
  //   return {
  //     value: await generateAPngNode(apngBuffer as ArrayBuffer, layer, imageNode),
  //     type: IMAGE_TYPES.apng
  //   }
  // }
  return { value: await generatePureImageNode(url, imageNode), type: IMAGE_TYPES.common }
}

export default generateImageNode
