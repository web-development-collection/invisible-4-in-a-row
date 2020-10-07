import React, {Component, ReactNode} from 'react';


/**
 * class Button
 * @author Ingo Andelhofs
 */
class Button extends Component<any, any> {
  public render(): ReactNode {
    return <button className="Button" {...this.props}/>
  }
}

export default Button;