import React, {Component} from 'react';
import Board from "./components/Board";
import "./style/app.css"
import Button from "./components/Button";
import Container from "./components/Container";



class App extends Component<any, any> {
  public state: any = {
    playing: false,
    currentPlayerName: "",
  }


  public render() {
    return <div>
      <h1 className="Header">Invisible 4 in a row</h1>
      <p className="SubHeader">Player {this.state.currentPlayerName}'s turn.</p>

      <Board
        playing={this.state.playing}
        onPlayerChange={(name: string) => this.setState(() => ({currentPlayerName: name}))}
      />

      <Container>
        <Button onClick={() => this.setState(() => ({playing: !this.state.playing}))}>
          {this.state.playing ? "Stop" : "Play"}
        </Button>
      </Container>
    </div>;
  }
}

export default App;
