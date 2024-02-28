import Konva from 'konva'
import generateImageNode from './image'

export const genImageElement = async (url: string, layer: Konva.Layer, container: Konva.Group) => {
  const width = container.width()
  const height = container.height()
  const imgNode = new Konva.Image({
    image: new Image(),
    name: 'imageNode',
    width: width,
    height: height
  })
  container.add(imgNode)
  return generateImageNode(url, layer, imgNode)
}
