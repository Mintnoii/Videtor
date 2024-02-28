import type { AbstractClass } from 'type-fest'
import Konva from 'konva'
import { RenderNode, WidgetImageData, ElementNode } from '@/types'
// // 定义一个抽象类
// abstract class Animal {
//     abstract makeSound(): void;
// }

// // 定义一个类 Dog 继承自抽象类 Animal
// class Dog extends Animal {
//     makeSound(): void {
//         console.log('Woof! Woof!');
//     }
// }

// // 创建 Dog 类的实例
// const myDog = new Dog();
// myDog.makeSound(); // 输出: Woof! Woof!
import BaseRenderer from './base-renderer'
import { genImageElement } from '@/modules/elements'
export default class ImageRenderer extends BaseRenderer {
  protected createNode(renderNode: RenderNode<WidgetImageData>) {
    const node = super.createNode(renderNode)
    const group = new Konva.Group({
      id: renderNode.nid,
      x: 50,
      y: 50,
      width: renderNode.data.width,
      height: renderNode.data.height
    })
    node.container = group
    // node.coreProcess = new ImageProcess(renderNode.data.url, renderNode, {
    //   layer: this.curLayer,
    //   group: group
    // })
    console.log(node, 'imageNode')
    return node
  }
  protected async fillRenderNode(node: any, isLazy: boolean = false): Promise<void> {
    // let process = renderNode.coreProcess
    const element = node.container as Konva.Group
    const segmentNode = node.data as RenderNode<WidgetImageData>
    console.log(element, 'element', node)
    genImageElement(node.data.url, this.curLayer, element)
    // 如果要渲染的url和process处理的url不一致，则重新创建一个新的process
    // if (segmentNode.data.url !== process.url) {
    //   process.destory()
    //   const imageContainer = element.findOne('.imageNode') as Konva.Image
    //   // imageContainer.width(segmentNode.data.width)
    //   // imageContainer.height(segmentNode.data.height)
    //   // 移除image
    //   if (imageContainer) {
    //     // imageContainer.image(new Image())
    //     imageContainer.remove()
    //   }
    //   // 创建新的imageProcess
    //   renderNode.coreProcess = new ImageProcess(segmentNode.data.url, renderNode as any, {
    //     layer: this.curLayer,
    //     group: element
    //   })
    //   process = renderNode.coreProcess
    // }
    // await process.update(this.curSegmentInfo, this.curRenderFrame)
  }
}
