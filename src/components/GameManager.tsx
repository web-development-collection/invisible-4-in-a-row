import React, { Component } from 'react'
import Board from './Board';
import Button from './Button';
import Container from './Container';


/**
 * interface State
 * @author Ingo Andelhofs
 */
interface State {
  playing: boolean,
  message: string,
}



/**
 * class GameManager
 * @author Ingo Andelhofs
 */
export class GameManager extends Component<any, State> {
  // Strings
  private readonly strings = {
    header: "Invisible 4 in a row",
    stopPlaying: "Stop",
    startPlaying: "Play",
  };

  // State
  public state: State = {
    playing: false,
    message: "",
  };

  public setPlaying = (playing: boolean) => {
    if (playing === this.state.playing)
      return;

    console.log("Playing,", playing);
    this.setState(() => ({ playing }));
  }

  public setMessage = (message: string) => {
    if (message === this.state.message)
      return;

    this.setState(() => ({ message }));
  }


  // Render
  public render() {
    const { playing, message } = this.state;

    return <div className="GameManager">
      <h1 className="Header">{this.strings.header}</h1>
      <p className="SubHeader">{message}</p>

      <Board
        playing={playing}
        onMessageChange={this.setMessage}
        onPlayingChange={this.setPlaying}
      />

      <Container>
        <Button
          onClick={() => {this.setPlaying(!playing)}}
          children={playing ? this.strings.stopPlaying : this.strings.startPlaying}
        />
      </Container>
    </div>;
  }
}


export default GameManager;
