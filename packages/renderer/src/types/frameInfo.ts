import Konva from 'konva'

/**视口的坐标系类型 */
export enum ViewPortCoordinateType {
  LEFT_TOP = 'left_top', // 左上角为坐标原点
  CENTER = 'center' // 中心点为坐标原点
}

export interface ViewPortSize {
  width: number
  height: number
}

/**视口坐标系。如果内部节点需要单独设置anchor，则优先使用节点的anchor。 */
export interface ViewPortCoordinate {
  coordinate: ViewPortCoordinateType
  // anchor: ViewPortCoordinateType
}

export type ViewPort = ViewPortSize & ViewPortCoordinate

export interface FrameInfo {
  /**
   * 视口信息，片段的生存空间（可以理解为舞台，可以理解为显示屏）
   * 坐标系设置coordinate默认为'left-left'
   * 该值只作用于片段根节点。
   * 譬如：字幕模板，字幕模板有自己的x,y坐标，字幕模板有2个子节点，分别是背景图和文字节点，这2个子节点的锚点始终在左上角，且从字幕根节点的左上角开始绘制
   *
   * Tips：一般来说只有前端会出现center的坐标系类型，数据给到后端时会统一转成left_top的坐标系
   */
  viewport: ViewPort
  /**
   * 时间轴节点单位：
   * 该字段为片段的duration以及节点的trigger字段和duration字段的数值单位，目前只有帧单位
   * 注：节点中data里面的所有涉及到时间的字段均不受该字段控制。data中所有有涉及到时间的字段，其单位默认都为毫秒，如果设置了FPS，则单位为帧。
   * */
  // timelineUnit: TimelineUnitType
  /**timelineUnit为frame时，该字段表示帧率，即1s中多少帧 */
  timelineFPS: number

  /**
   * 播放倍速：默认是1，倍速不会影响duration的值。
   * 例：speed为1，fps30时，duration为90，那么片段的自然时长是3秒，此时如果将speed改为2，那么duration依然为90，片段的自然时长依然是3s。
   * 只是在画布渲染时，会根据speed得出真正的时长为1.5秒，当然离线渲染也要根据该字段来处理相应的数据
   * */
  speed: number

  /**片段时长，数值单位依赖timelineUnit */
  duration: number

  /**快速定位切片列表：片段的切片快速定位列表，主要是对片段各个小环节进行了简短命名，用来快速定位的作用 */
  // quickPosSlices?: Array<SliceInfo>

  /**轴配置 */
  // rowsConfig: RowsConfig
  /**
   * 轴数据相关
   * 轴内容：
   *    rows中有什么轴，有多少轴，取决于业务上下文。不过轴本身有自己的特性原则，在往rows中加入轴时要遵循基本的原则，而editor/core以及editor中的组件，
   *    都严格遵循rows中的轴规则。譬如场景轴只能有0或者1个，片头片尾轴只能有0或者1个。
   * 全量轴顺序（注意，这里定义的是全量轴元素的情况下轴的排列顺序以及axisId的数值定义。轴内容是取决于具体的业务和上下文。原则上来说轴数据可以是空轴）：
   *    从下到上分别是：
   *    音频轴（<=-1000；固定到最下方）（轴数量：>=0）；
   *    场景轴（固定到音频轴上方）（轴数量：0或者1）；
   *    片头片尾轴（固定到场景轴上方）（轴数量：0或者1）；
   *    角色轴（场景轴之上（如有片头片尾轴，则是片头片尾轴之上））（轴数量：>=0）
   *    widget_imgage轴（场景轴之上（如有片头片尾轴，则是片头片尾轴之上））（轴数量：>=0）
   *    widget_text轴（场景轴之上（如有片头片尾轴，则是片头片尾轴之上））（轴数量：>=0）
   *    caption轴（场景轴之上（如有片头片尾轴，则是片头片尾轴之上））（轴数量：>=0）
   *    widget_video轴（场景轴之上（如有片头片尾轴，则是片头片尾轴之上））（轴数量：>=0）
   *    ...其他扩展的widget轴（全局2D背景轴，全局2D标题轴，全局2D底片轴等）（场景轴之上（如有片头片尾轴，则是片头片尾轴之上））（轴数量：>=0）
   *
   * 轴分块（视觉方面从下到上，数组存储方面是从后往前）：
   *   音频块：音频可以多轴，音频之间可以互相调整轴顺序
   *   场景轴块：场景轴只能有0或者1个轴
   *   片头片尾轴块：片头片尾轴只能有0或者1个轴
   *   widget块：widget图片轴，widget视频轴，widget文字轴，caption轴等（widget块中的轴可以互相调整顺序，但是caption轴不能拖拽删除）
   *
   * 轴下标index和axisId的关系：轴下标index和axisId数值基本是反过来。
   * 示例：
   * ['widget_image', 'caption', 'widget_text', 'role', 'title_tail', 'scene', 'audio', 'audio']
   * axisId最大的轴下标最小（这样方便时间轴组件，图层组件拿到数组数据直接遍历显示图层即可）
   */
  // rows: Array<MainTrackData>
}

// todo 后续拓展
export interface LayerData {}
export interface AudioData {}
/**帧节点数据 */
/**图层数据；音频数据 */
export type FrameNodeData = LayerData | AudioData

/**
 * 片段节点：一段FrameInfo中，是片段生存空间信息+诸多片段节点的合集
 * 一个片段节点清晰的记录了该节点所在的层级，以及他的生命周期，节点属性等数据
 */
export interface FrameNode<T extends FrameNodeData> {
  /**
   * 节点唯一标识
   */
  nid: string

  /**
   * 节点处在哪个轴上
   * 节点的轴类型一般控制节点在轴上应该处在什么位置以及轴所在层级以及能出现多少个相同类型的轴。
   * 譬如片头片尾轴，该轴只能出现1次，且片头片尾的顺序也被限制，轴的层级也相对受限，其本身的data数据是pag相关的数据，但是将其放在片头片尾上，
   * 则片头片尾的trigger则会固定，不可随意设置了。但是片头片尾的在画布上的渲染逻辑却依然使用pag的方式进行渲染，读取片头片尾内容也依然使用pag的方式读取。
   *
   * 如果想了解具体的轴特性，可参考TRACK_TYPE的注释部分
   */
  // trackType: TRACK_TYPE | SUB_TRACK_TYPE

  /**
   * 节点轴id
   * axisId数值越小，渲染时的层级越往下，其中audio的处理不受axisId影响，audio元素的axisId<=-1000
   */
  axisId: number

  /**
   * 默认值：false
   * 节点是否可编辑属性：如果设置为true，则节点属性被冻结，不能再更改其任何属性，但可整体替换
   * 这里要说明一下：
   *    每个节点的可编辑属性和节点自身的类型以及所处的轴有密切关系，节点的disabled设置为falase，并不代表节点的所有属性可以任意更改。
   *    譬如片头片尾的宽高，旋转等在塞入到segmentInfo之后就已经确定，在修改片段信息的过程中，片头片尾的宽高，旋转等是不可以修改的。
   *    但是片头片尾中的可编辑文本内容是可以变更的，如果片头片尾节点的disabled设置为true，那么片头片尾节点的可编辑内容也不可更改
   */
  disabled: boolean

  /**
   * 默认值：true
   * 可替换，这里的可替换指的是整体替换节点，而不是像片头片尾中替换某一个图片或者文字的概念（这个是编辑节点的属性）
   * canReplace和disabled这2个字段是独立的。
   * 有些节点disabled可以为true,canReplace为true的情况下，节点虽然不可编辑，但是可以整体替换（譬如有言中的演播室的前景背景）
   */
  canReplace: boolean

  /**
   * 默认值：true
   * 节点是否能展示
   * 如果设置为false，则该节点不展示。
   */
  visible: boolean

  /**
   * 节点在片段中何时出现的时间点
   * 注： 目前单位只有帧
   */
  trigger: number

  /**
   * 节点在片段中的出现的持续时长，trigger+duration则是该节点在片段中的结束时间点
   * 注： 目前单位只有帧
   */
  duration: number

  /**
   * 注：data中所有有涉及到时间的字段（这些字段的单位不受segmentInfo中的timelineUnit这些所控制），
   *    其单位默认都为毫秒，如果设置了FPS，则单位为帧。
   *
   * 节点数据（描述节点本身特性的数据，用来渲染图像或者用来播放）：
   * 分为layerData（能以图像的形式展现在屏幕上），audioData（能以音频的方式出现）
   * layerData：
   *    通用属性（x,y,rotation,scale,width,height,alpha等）
   *    特有属性（譬如widget_text_pag，则有pagNodes等属性，widget_image，则有mask，background等属性）
   * audioData：
   *    音频相关属性
   */
  data: T

  /**
   * 在不同上下文结构中，用来存放一些业务上下文相关的其他字段
   * 举个例子：
   *    譬如ssml转为segmentInfo时，一些ssml中的冗余字段可以放到这里，方便transform回去的时候再塞到ssml中
   */
  // extraData?: any
}

/**
 * 渲染器所持有的渲染节点类型
 */
export interface FrameRenderNode<T = null, K = null> {
  /**唯一标识 */
  nid: string
  /**数据 */
  data: FrameNode<LayerData>
  /**渲染节点容器 */
  container: Konva.Group | Konva.Text
  /**渲染节点核心控制器：pag渲染，图片渲染等会用到 */
  // coreProcess: T
  /**节点所需要的素材：扩展字段，暂时无用 */
  // assets: K

  /**节点是否被损坏了 */
  // isDestroyed?: boolean
}
