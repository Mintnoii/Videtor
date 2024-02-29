import Konva from 'konva'
import { EventEmitter, IKonvaEventEmitter } from '@/libs'
import { RenderNode, IRenderInfo, LayerData, Sprite } from '@/types'

export interface RendererFrameInfo {
  // 片段信息
  renderInfo: IRenderInfo
  // 渲染第几帧
  frameIndex: number
  // 渲染容器
  layer: Konva.Layer
  // 渲染 transformer
  // transformer: Konva.Transformer
  // 渲染数据
  segmentNodes: Array<RenderNode<LayerData>>
}

export default abstract class BaseRenderer {
  // 渲染器实例
  protected renderer: any
  /**当前绘制信息 */
  protected curDrawInfo: RendererFrameInfo
  /**当前绘制是否是懒绘制：懒绘制是指无需关心帧数据是否准备完毕 */
  protected curDrawIsLazy: boolean

  protected curRenderInfo: IRenderInfo
  protected curFrameIndex: number
  protected curLayer: Konva.Layer

  protected eventEmitter: IKonvaEventEmitter

  // todo 这里的类型需要修改
  constructor(renderer: any, eventEmitter: IKonvaEventEmitter) {
    this.renderer = renderer
    this.eventEmitter = eventEmitter
  }

  protected createSprite(renderNode: RenderNode<LayerData>): Sprite {
    return {
      ...renderNode,
      // container: new Konva.Group({
      //   offsetX: renderNode.data.width / 2,
      //   offsetY: renderNode.data.height / 2
      // })
      container: new Konva.Group()
      // coreProcess: null,
      // assets: null
    }
  }

  /**用data数据更新 sprite */
  private updateAttrs(sprite: Sprite) {
    console.log(sprite, 'updateAttrs = sprite')
    const { data, container } = sprite
    // const renderNode = sprite.data
    // 如果是文本节点，且文本节点的高度是自动计算的，那么height设置为undefined
    // if (segmentUtils.isAutoHeightSingleTextSegmentNode(renderNode)) {
    //   height = undefined
    // }

    container.setAttrs({
      // renderNode: sprite,
      renderNodeType: data.type,
      // axisId: renderNode.axisId,
      // zIndex: renderNode.axisId,
      // visible: renderNode.visible,
      // disabled: renderNode.disabled,

      x: data.x,
      y: data.y,
      width: data.width,
      // 纯文本节点不设置高度
      height: data.height,
      scaleX: data.scale,
      scaleY: data.scale,
      rotation: data.rotation,
      opacity: data.alpha
    })

    // 如果是场景，片头片尾则不允许拖拽（这里理解可以将片头片尾理解为场景）
    // if (
    //   renderNode.data.type === SegmentNodeDataType.head_pag ||
    //   renderNode.data.type === SegmentNodeDataType.tail_pag ||
    //   renderNode.data.type === SegmentNodeDataType.scene
    // ) {
    //   element.draggable(false)
    // } else {
    //   element.draggable(!renderNode.disabled)
    // }
  }
  // 只对第一层做offset即可
  private layoutSprite(item: Konva.Node) {
    if (!item) {
      return
    }
    const width = item.width()
    const height = item.height()
    if (width) {
      item.offsetX(width / 2)
    } else {
      // EditorLog.warn('setItemOffset:元素宽度为空:', item.width(), item)
    }
    if (height) {
      item.offsetY(height / 2)
    } else {
      // EditorLog.warn('setItemOffset:元素高度为空:', item.height(), item)
    }
    // console.log('offsetX:', item.getAttr('offsetX'))
    // if (item.hasChildren()) {
    //   const children = (item as Konva.Group).getChildren()
    //   for (let i = 0; i < children.length; ++i) {
    //     this.setElementOffset(children[i])
    //   }
    // }
  }
  /**异步填充renderNode */
  protected async fillRenderNode(renderNode: any): Promise<any> {}

  // async draw(renderInfo: RendererFrameInfo) {
  //   this.curRenderInfo = renderInfo
  //   this.frameIndex = renderInfo.index
  // }

  /**
   * renderer绘制一批 renderNode
   * @param drawInfo
   * @param isLazy
   * @param notFill
   */
  async draw(drawInfo: RendererFrameInfo, options?: { isLazy: boolean; notFill: boolean }) {
    const { isLazy = true, notFill = false } = options || {}
    this.curDrawInfo = drawInfo
    this.curDrawIsLazy = isLazy

    this.curRenderInfo = this.curDrawInfo.renderInfo
    this.curFrameIndex = this.curDrawInfo.frameIndex
    this.curLayer = this.curDrawInfo.layer
    // this.curTransformer = this.curDrawInfo.transformer

    const allPromises: any[] = []
    // 不能在forEach中await，因为在lazy渲染时，是不会等待draw的过程，所以先收集promise，最后返回promise all
    this.curDrawInfo.segmentNodes.forEach((node) => {
      allPromises.push(this.drawSprite(node, notFill))
    })

    return Promise.all(allPromises)
  }

  // asyncGenElements = async (nodes: UIEventNode[], groups: Konva.Group[]) => {
  //   const toHandleElements = groups
  //     .map((group) => {
  //       const node = nodes.find((node) => node.nid === group.id()) || null
  //       return { node, group }
  //     })
  //     .filter((item) => item.node !== null) as { node: UIEventNode; group: Konva.Group }[]
  //   const promises = toHandleElements.map(({ node, group }) => asyncGenElement(node, group))
  //   const results = await Promise.allSettled(promises)
  //   return results
  //     .map((item) => (item.status === 'fulfilled' && item.value ? item.value : undefined))
  //     .filter((item) => item !== undefined) as Group[]
  // }
  async drawSprite(renderNode: RenderNode<LayerData>, notFill: boolean = false) {
    let sprite = null
    console.log(renderNode, 'drawSprite - renderNode')
    if (!sprite) {
      sprite = this.createSprite(renderNode)
      const nodeContainer: Konva.Group | Konva.Text = sprite.container
      nodeContainer.id(renderNode.nid)
      // nodeContainer.draggable(!renderNode.data.disabled)
      // this.cacheRenderNodeMap.set(renderNode.nid, renderNode)
      // this.addElementEventListener(nodeContainer)
    }
    // 首先更新数据
    // sprite.data = renderNode
    this.layoutSprite(sprite.container)
    // 更新
    this.updateAttrs(sprite)

    this.curLayer.add(sprite.container)
    this.fillRenderNode(sprite)
  }
}
