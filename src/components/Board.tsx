import React, {Component, ReactNode} from 'react';
import Tile from "./Tile";


/**
 * interface Props
 * @author Ingo Andelhofs
 */
interface Props {
  playing: boolean,
  onPlayerChange: (name: string) => void,
}

/**
 * interface State
 * @author Ingo Andelhofs
 */
interface State {
  board: any[],
  players: string[],
  currentPlayer: number,
  playing: boolean,
  lastSelectedTile: number,
  showAll: boolean,
}


const defaultBoard = [
  -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1,
];



/**
 * class Board
 * @author Ingo Andelhofs
 */
class Board extends Component<Props, State> {
  public state: State = {
    board: defaultBoard,
    players: ["A", "B"],
    currentPlayer: 0,
    playing: false,
    lastSelectedTile: -1,
    showAll: false,
  }


  private selectTile = (index: number) => {
    if (!this.state.playing)
      return;

    // todo: Check 4 in a row


    // todo: check already set
    const selectedTile = this.state.board[index];
    if (selectedTile !== -1) {
      const playerThatWon = (this.state.currentPlayer + 1) % 2;

      alert("The selected tile was already selected!");
      alert(`Player ${this.state.players[playerThatWon]} wins!`);

      this.setState(() => ({ playing: false }));
      this.showAllTiles();
      return;
    }

    this.setState(() => ({lastSelectedTile: index}))

    this.updateBoard(this.state.currentPlayer, index);
    this.updatePlayer();
  }

  private showAllTiles() {
    this.setState(() => ({showAll: true}));
  }


  private reset() {
    this.setState(() => ({
      board: defaultBoard,
      currentPlayer: 0,
    }))
  }

  private updateBoard(player: number, index: number): void {
    const {board} = this.state;
    board[index] = player;
    this.setState(() => ({ board }));
  }

  private updatePlayer(): void {
    this.setState(
      (prevState) => ({ currentPlayer: (prevState.currentPlayer + 1) % 2 }),
      () => this.props.onPlayerChange(this.state.players[this.state.currentPlayer]),
    );
  }


  public componentDidMount() {
    this.setState(() => ({ playing: this.props.playing }));
    this.props.onPlayerChange(this.state.players[this.state.currentPlayer]);
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.playing !== this.props.playing) {
      this.setState(() => ({ playing: this.props.playing }));
      this.props.onPlayerChange(this.state.players[this.state.currentPlayer]);
    }
  }

  private renderTiles(): ReactNode {
    return this.state.board.map((player, index: number) =>
      <Tile
        key={index}
        index={index}
        selected={index === this.state.lastSelectedTile || this.state.showAll}
        player={player}
        onClick={this.selectTile}
      />
    );
  }

  public render(): ReactNode {
    return <div className="Board">
      {this.renderTiles()}
    </div>;
  }
}


export default Board;