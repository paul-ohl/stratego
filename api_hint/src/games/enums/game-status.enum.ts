export enum GameStatus {
  SETUP = 'S', // The game is created but awaiting the second player
  MATCH = 'M', // The game has two players but hasn't started yet
  PLAY = 'P', // The game is ongoing
  CLOSED = 'C', // The game is finished
}
