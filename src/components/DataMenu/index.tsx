import React from "react"
import { Menu as AntdMenu, MenuProps} from 'antd'

import { TProps } from "./schema"

const { SubMenu } = AntdMenu
type TMenuProps = MenuProps & TProps

const DataMenu = React.forwardRef((props: TMenuProps, ref: any) => {
  return (
    <AntdMenu 
      ref={ref}
      {...props}
    >
      { props.dataSource.map((item) => {
        if (!item.hidden) {
          if (!item.children) {
            return (
              <AntdMenu.Item 
                key={(item.url)?item.url:item.id}
                icon={item.icon}
                disabled={item.disabled}
              >
                {item.title}
              </AntdMenu.Item>
            )
          }
          else {
            return (
              <SubMenu 
                key={(item.url)?item.url:item.id} 
                title={item.title}
                icon={item.icon}
                disabled={item.disabled}
              >
                { item.children?.map((subItem, subItemIndex) => {
                  if (!subItem.hidden) {
                    return (
                      <AntdMenu.Item 
                        key={
                          (subItem.url)?subItem.url:subItem.id
                        }
                        icon={subItem.icon}
                        disabled={subItem.disabled}
                      >
                        {subItem.title}
                      </AntdMenu.Item>
                    )
                  }
                })}
              </SubMenu>
            )
          }
        }
      })}
    </AntdMenu>
  )
})

DataMenu.defaultProps = {
  dataSource: [],
  // horizontal, vertical, inline
  mode: 'horizontal',
  // light, dark
  theme: 'light',
  // default keys
  defaultOpenKeys: [],
  defaultSelectedKeys: [],
}

export default DataMenu