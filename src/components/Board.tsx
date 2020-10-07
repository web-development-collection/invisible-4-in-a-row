import React, { Component, ReactNode } from 'react';
import Tile from "./Tile";



/**
 * interface Props
 * @author Ingo Andelhofs
 */
interface Props {
  playing: boolean,
  onMessageChange: (message: string) => void,
  onPlayingChange: (playing: boolean) => void,
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
const defaultPlayers = ["Red", "Yellow"];
const defaultCurrentPlayer = 0;
const defaultPlaying = false;
const defaultLastSelectedTile = -1;
const defaultShowAll = false;



/**
 * class Board
 * @author Ingo Andelhofs
 */
class Board extends Component<Props, State> {
  // State
  public state: State = {
    board: [...defaultBoard],
    players: [...defaultPlayers],
    currentPlayer: defaultCurrentPlayer,
    playing: defaultPlaying,
    lastSelectedTile: defaultLastSelectedTile,
    showAll: defaultShowAll,
  }

  public setPlaying = (playing: boolean) => {
    if (playing === this.state.playing)
      return;

    this.setState(
      () => ({ playing }),
      () => this.props.onPlayingChange(playing)
    );
  }

  public setCurrentPlayer = (player: number, callback?: () => void) => {
    if (player === this.state.currentPlayer) {
      if (callback)
        callback();
      return;
    }

    this.setState(() => ({ currentPlayer: player }), callback);
  }

  public setBoard = (board: number[], callback?: () => void) => {
    if (board === this.state.board) {
      if (callback)
        callback();
      return;
    }

    this.setState(() => ({ board }), callback);
  }

  public setLastSelectedTile = (index: number) => {
    this.setState(() => ({ lastSelectedTile: index }));
  }


  // Methods
  private selectTile = (index: number) => {
    const { playing, board } = this.state;

    if (!playing) {
      this.props.onMessageChange(`You must first start playing before you select a Tile.`);
      return;
    }

    if (this.check4InARow(index)) {
      this.props.onMessageChange(`You won! Player ${this.getCurrentPlayerName()} wins!`);
      this.setPlaying(false);
      this.updateBoardAtIndex(index);
      this.showAllTiles();
      return;
    }

    const selectedTile = board[index];
    if (selectedTile !== -1) {
      this.props.onMessageChange(`
        The other player won! 
        The selected tile was already selected! 
        Player ${this.getNextPlayerName()} wins!`
      );

      this.setPlaying(false);
      this.showAllTiles();
      return;
    }

    this.setLastSelectedTile(index);
    this.updateBoardAtIndex(index);
    this.setCurrentPlayer(
      this.getNextPlayer(), 
      this.playerMessage,
    )
  }

  private showAllTiles() {
    this.setState(() => ({ showAll: true }));
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
    console.log("reset", this.state.playing);


    this.setState(() => ({
      board: [...defaultBoard],
      players: [...defaultPlayers],
      currentPlayer: defaultCurrentPlayer,
      lastSelectedTile: defaultLastSelectedTile,
      showAll: defaultShowAll,
    }));
  }

  private updateBoardAtIndex = (index: number) => {
    const { board, currentPlayer } = this.state;
    board[index] = currentPlayer;
    this.setBoard(board);
  }

  private getNextPlayer = () => {
    const { currentPlayer, players } = this.state;
    const amountOfPlayers = players.length;

    return (currentPlayer + 1) % amountOfPlayers;
  }

  private getCurrentPlayerName = () => {
    const { currentPlayer, players } = this.state;
    return players[currentPlayer];
  }

  private getNextPlayerName = () => {
    const nextPlayer = this.getNextPlayer();
    const { players } = this.state;
    return players[nextPlayer];
  }


  // Messages
  private welcomeMessage = () => {
    const { players } = this.state;
    this.props.onMessageChange(`Welcome players ${players.join(" and ")}! Player ${this.getCurrentPlayerName()} may start!`);
  }

  private playerMessage = () => {
    this.props.onMessageChange(`It's player ${this.getCurrentPlayerName()}'s turn!`);
  }



  // Component lifecycles
  public componentDidMount() {
    this.setPlaying(this.props.playing);
    this.props.onMessageChange(`Press play to start playing...`);
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.playing !== this.props.playing) {
      this.setPlaying(this.props.playing);

      if (this.props.playing) {
        this.reset();
        this.welcomeMessage();
      }
    }
  }



  // Rendering
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