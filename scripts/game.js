const createGame = (numPlayers, board) => {
  const players = []
  let turns = 0

  // const askName = (num) => prompt(`Hello player ${num} what is your name?`)
  // legacy function for console play
  // const askMove = (player) => prompt(`Hello ${player.name} where would you like to play ? (type a cell number)`)

  const setPlayersNames = (first, second) => {
    [firstPlayer, secondPlayer] = players
    if (first) firstPlayer.name = first
    if (second) secondPlayer.name = second
  }

  const createPlayers = () => {
    for (let i = 1; i < numPlayers + 1; i++) {
      players.push(createPlayer(`Player ${i}`))
    }
  }

  const setPlayersMarkers = () => {
    players[0].marker = 'X'
    players[1].marker = 'O'
  }

  const logInitialInfo = () => {
    [player1, player2] = players
    let initialInfo = `Hello ${player1.name} and ${player2.name} :) Ready for rumble ?
      ${player1.name} you'll be playing first and with the ${player1.marker} marker,
      whereas you ${player2.name} will be playing with the ${player2.marker} marker. Let's Go!`
    return initialInfo
  }

  const initializeGame = () => {
    createPlayers()
    setPlayersMarkers()
    return logInitialInfo
  }

  const isWinner = (player) => {
    const winningPattern = player.marker.repeat(3)
    return board.getAllPossibleTrios().some(trio => trio === winningPattern)
  }

  const winner = () => players.find(player => isWinner(player))

  const getDuePlayer = () => {
    [player1, player2] = players
    return turns % 2 === 0 ? player1 : player2
  }

  const playTurn = (move) => {
    let currentPlayer = getDuePlayer()
    if (!board.writeToCell(move, currentPlayer.marker)) {
      return
    }
    turns++
    return currentPlayer.marker
  }

  const endOfGame = () => {
    let gameWinner = winner()
    if (gameWinner) {
      let winnerMessage = `Congratulations ${gameWinner.name}! you won this game :)`
      return winnerMessage
    }

    let drawMessage = `It's a draw this time!`
    return drawMessage
  }

  // became obsolete with the dom version
  // const gameLoop = () => {
  //   while(!winner() && !board.isFull()){
  //     board.logBoard()
  //     playTurn()
  //   }
  //   board.logBoard()
  //   endOfGame()
  // }

  const restartGame = function() {
    this.turns = 0
    this.board = board.resetBoard()
  }

  // obsolete
  // const playGame = () => {
  //   initializeGame()
  //   gameLoop()
  //   board.logBoard()
  // }

  return { logInitialInfo, setPlayersNames, initializeGame, playTurn, winner, endOfGame, restartGame }
}
