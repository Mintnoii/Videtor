import Konva from 'konva'

import { RenderNode, LayerData } from './node'
/**
 * 渲染器所持有的渲染节点类型
 */
export interface Sprite {
  /**唯一标识 */
  nid: string
  /**数据 */
  data: LayerData
  // data: RenderNode<LayerData>
  /**渲染节点容器 */
  container: Konva.Group | Konva.Text
  //   /**渲染节点核心控制器：pag渲染，图片渲染等会用到 */
  //   // coreProcess: T
  //   /**节点所需要的素材：扩展字段，暂时无用 */
  //   // assets: K

  //   /**节点是否被损坏了 */
  //   // isDestroyed?: boolean
}
