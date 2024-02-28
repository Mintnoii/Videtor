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
