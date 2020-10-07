import React, {Component, ReactNode} from 'react';



/**
 * class Container
 * @author Ingo Andelhofs
 */
export class Container extends Component<any, any> {
  public render(): ReactNode {
    return <div className="Container" {...this.props}/>
  }
}


export default Container;