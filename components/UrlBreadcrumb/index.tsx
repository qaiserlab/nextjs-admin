import React from "react";
import { Breadcrumb } from "antd";
import { PropsInterface } from './schema'

export default class RouterBreadcrumb extends React.Component<
  PropsInterface
> {
  
  constructor(props: PropsInterface) {
    super(props);
  }

  getDataSource() {
    const urlArray = this.props.url.split("/");

    if (this.props.url.substr(0, 1) === '/') {
      urlArray.shift();
    }
    else if (this.props.url.substr(0, 4) === 'http') {
      urlArray.shift();
      urlArray.shift();
      urlArray.shift();
    }

    return urlArray.map((item: any, index: number) => {
      const title = item;
      let href = "";

      for (let i = 0; i <= index; i++) {
        href += `/${urlArray[i]}`;
      }

      return {
        index,
        title,
        href,
      };
    });
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            {(this.props.icon)?this.props.icon:'Home'}
          </Breadcrumb.Item>

          {this.getDataSource().map((item: any) => {
            return (
              <Breadcrumb.Item>
                <a href={item.href}>{item.title}</a>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </React.Fragment>
    );
  }
}