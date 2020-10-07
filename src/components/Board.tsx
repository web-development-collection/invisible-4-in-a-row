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

    if (this.check4InARow(index)) {
      const playerThatWon = this.state.currentPlayer;
      alert("You won!");
      alert(`Player ${this.state.players[playerThatWon]} wins!`);
      this.showAllTiles();
    }

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

  private check4InARow(lastMove: number): boolean {
    // Get current user
    const { board, currentPlayer } = this.state;

    const getIndexOnBoard = (row: number, col: number): number => {
      return col * 6 + row;
    }

    const getPlayerOnBoard = (row: number, col: number): number => {
      const index = getIndexOnBoard(row, col);

      return index === lastMove ? currentPlayer : board[index];
    }

    for (let row = 0; row < 6 - 3; ++row) {
      for (let col = 0; col < 6; ++col) {
        if (getPlayerOnBoard(row, col) === currentPlayer &&
            getPlayerOnBoard(row, col + 1) === currentPlayer &&
            getPlayerOnBoard(row, col + 2) === currentPlayer &&
            getPlayerOnBoard(row, col + 3) === currentPlayer) {
          return true;
        }
      }
    }

    for (let row = 0; row < 6; ++row) {
      for (let col = 0; col < 6 - 3; ++col) {
        if (getPlayerOnBoard(row, col) === currentPlayer &&
            getPlayerOnBoard(row + 1, col) === currentPlayer &&
            getPlayerOnBoard(row + 2, col) === currentPlayer &&
            getPlayerOnBoard(row + 3, col) === currentPlayer) {
          return true;
        }
      }
    }

    for (let row = 3; row < 6; ++row) {
      for (let col = 0; col < 6 - 3; ++col) {
        if (getPlayerOnBoard(row, col) === currentPlayer &&
            getPlayerOnBoard(row - 1, col + 1) === currentPlayer &&
            getPlayerOnBoard(row - 2, col + 2) === currentPlayer &&
            getPlayerOnBoard(row - 3, col + 3) === currentPlayer) {
          return true;
        }
      }
    }

    for (let row = 3; row < 6; ++row) {
      for (let col = 3; col < 6; ++col) {
        if (getPlayerOnBoard(row, col) === currentPlayer &&
            getPlayerOnBoard(row - 1, col - 1) === currentPlayer &&
            getPlayerOnBoard(row - 2, col - 2) === currentPlayer &&
            getPlayerOnBoard(row - 3, col - 3) === currentPlayer) {
          return true;
        }
      }
    }

    return false;
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