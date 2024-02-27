import type { AbstractClass } from 'type-fest'
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

export default class ImageRenderer extends BaseRenderer {
  // createRenderNode(segmentNode: SegmentNode<WidgetImageData>): SegmentRenderNode<number, null> {
  //   const renderNode = super.createRenderNode(segmentNode)
  //   const group = new Konva.Group({
  //     id: segmentNode.nid,
  //     width: segmentNode.data.width,
  //     height: segmentNode.data.height,
  //   })
  //   renderNode.container = group
  //   renderNode.coreProcess = new ImageProcess(segmentNode.data.url, renderNode, {
  //     layer: this.curLayer,
  //     group: group
  //   })
  //   return renderNode
  // }
}
