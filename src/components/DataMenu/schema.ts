export interface TItem {
  id: string
  url?: string
  title: string
  icon?: Object
  disabled?: boolean
  hidden?: boolean
  children?: Array<TItem>
}

export interface TProps {
  ref?: any
  dataSource: Array<TItem>
}