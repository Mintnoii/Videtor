import { IRenderNode, SegmentRenderNode, LayerData } from './node'
export { NodeType } from './node'

export type { IRenderNode, SegmentRenderNode, LayerData }

export interface IRenderInfo {
  children: SegmentRenderNode[]
}
