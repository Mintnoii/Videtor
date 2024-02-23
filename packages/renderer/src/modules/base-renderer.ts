import Konva from "konva"
import {LayerData, FrameNode,FrameRenderNode, FrameInfo} from '@/types'

export interface RendererFrameInfo {
  // 片段信息
  frameInfo: FrameInfo,
  // 渲染第几帧
  index: number,
  // 渲染容器
  layer: Konva.Layer,
  // 渲染 transformer
  transformer: Konva.Transformer,
  // 渲染数据
  // segmentNodes: Array<SegmentNode<LayerData>>
}

export default abstract class BaseRenderer {
   /**当前绘制信息 */
  protected curRenderInfo: RendererFrameInfo
  /**当前绘制是否是懒绘制：懒绘制是指无需关心帧数据是否准备完毕 */
  // protected curDrawIsLazy: boolean
  protected frameIndex: number
  constructor() {
    this.frameIndex = 0
  }

    /**创建renderNode */
  protected createRenderNode(frameNode: FrameNode<LayerData>): FrameRenderNode<any, any> {
    const node: FrameRenderNode = {
      nid: frameNode.nid,
      data: frameNode,
      container: new Konva.Group,
      // coreProcess: null,
      // assets: null
    }
    return node
  }

  async draw(renderInfo: RendererFrameInfo) {
    this.curRenderInfo = renderInfo
    this.frameIndex = renderInfo.index
  }

}