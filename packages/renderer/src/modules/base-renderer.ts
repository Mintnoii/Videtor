import Konva from 'konva'
import { ElementNode, RenderNode, IRenderInfo, LayerData } from '@/types'
import { EventEmitter, IKonvaEventEmitter } from '@/libs'

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
  /**创建renderNode */
  protected createNode(renderNode: RenderNode<LayerData>) {
    const node = {
      // nid: renderNode.nid,
      // data: renderNode.data,
      ...renderNode,
      container: new Konva.Group()
      // coreProcess: null,
      // assets: null
    }
    return node
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
      allPromises.push(this.drawNode(node, notFill))
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

  async drawNode(renderNode: RenderNode<LayerData>, notFill: boolean = false) {
    // trackLogsStart(LOGS_TYPE.beforeFillWork)
    // let renderNode = this.cacheRenderNodeMap.get(segmentNode.nid)
    let node = null
    console.log(renderNode, 'renderNode')
    // 创建
    if (!node) {
      node = this.createNode(renderNode)
      const nodeContainer: Konva.Group | Konva.Text = node.container
      nodeContainer.id(renderNode.nid)
      // nodeContainer.draggable(!renderNode.data.disabled)
      // this.cacheRenderNodeMap.set(segmentNode.nid, renderNode)
      // this.addElementEventListener(nodeContainer)
    }
    this.curLayer.add(node.container)

    // 首先更新数据
    // renderNode.data = segmentNode
    // const nodeContainer: Konva.Group | Konva.Text = renderNode.container
    // this.setElementOffset(nodeContainer)

    // 更新
    // this.updateRenderNodeAttrs(renderNode)
    // if (renderNode.isDestroyed) {
    //   // 更新完renderNode数据之后，如果发现节点被损坏了，那么直接终止后续异步渲染填充
    //   return this.drawSegmentNode(segmentNode, notFill)
    // }

    // if (judgeSegmentNodeIsInFrame(segmentNode, this.curRenderFrame)) {
    //   this.curLayer.add(nodeContainer)
    //   this.curRenderNodes.push(renderNode)
    // } else {
    //   this.removeRenderNode(segmentNode.nid)
    // }

    // trackLogsEnd(LOGS_TYPE.beforeFillWork)
    // 异步填充
    this.fillRenderNode(node)
    // if (!notFill) {
    //   // 异步填充（如果懒绘制则无需等待绘制结果）
    //   if (this.curDrawIsLazy) {
    //     this.fillRenderNode(renderNode)
    //   } else {
    //     await this.fillRenderNode(renderNode)
    //     trackLogsStart(LOGS_TYPE.drawTime, this)
    //     /**切记不能移除：该函数能确保渲染时能拿到准确的帧数据 */
    //     this.curLayer.draw()
    //     trackLogsEnd(LOGS_TYPE.drawTime, this)
    //   }
    // }
  }
}
