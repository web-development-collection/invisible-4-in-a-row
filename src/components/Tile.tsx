import React, {Component, ReactNode} from 'react';



/**
 * interface Props
 * @author Ingo Andelhofs
 */
interface Props {
  player: number,
  index: number,
  onClick: (index: number) => any,
  selected: boolean,
}


/**
 * class Tile
 * @author Ingo Andelhofs
 */
class Tile extends Component<Props, any> {
  public render(): ReactNode {
    return <div
      className={"Tile"}
      data-player={this.props.player}
      data-selected={this.props.selected}
      onClick={() => this.props.onClick(this.props.index)}
    />;
  }
}


export default Tile;