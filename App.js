import React, { useState } from 'react';
import { View, Image, Button, Alert,Text } from 'react-native';

const TicTacToe = () => {
  const [grid, setGrid] = useState([    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);

  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handlePress = (x, y) => {
    if (!gameOver && grid[x][y] === null) {
      let newGrid = [...grid];
      newGrid[x][y] = currentPlayer;
      setGrid(newGrid);
      checkForWinner();
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkForWinner = () => {
    // check for horizontal win
    for (let i = 0; i < 3; i++) {
      if (grid[i][0] !== null && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
        setGameOver(true);
        setWinner(grid[i][0]);
        return;
      }
    }

    // check for vertical win
    for (let i = 0; i < 3; i++) {
      if (grid[0][i] !== null && grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
        setGameOver(true);
        setWinner(grid[0][i]);
        return;
      }
    }

    // check for diagonal win
    if (grid[0][0] !== null && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
      setGameOver(true);
      setWinner(grid[0][0]);
      return;
    }

    if (grid[0][2] !== null && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      setGameOver(true);
      setWinner(grid[0][2]);
      return;
    }

    // check for draw
    if (grid.flat().filter(cell => cell === null).length === 0) {
      setGameOver(true);
      setWinner('draw');
      return;
    }
  };

  const playAgain = () => {
    setGrid([      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
    setCurrentPlayer('X');
    setGameOver(false);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      {grid.map((row, x) => (
        <View key={x} style={styles.row}>
          {row.map((cell, y)=> (
<View key={y} style={styles.cell}>
<Button
onPress={() => handlePress(x, y)}
disabled={gameOver || cell !== null}
style={styles.button}
>
{cell === 'X' ? (
<Image source={require('./assets/x.jpg')} style={styles.image} />
) : cell === 'O' ? (
<Image source={require('./assets/o.png')} style={styles.image} />
) : null}
</Button>
</View>
))}
</View>
))}
{gameOver && (
<View style={styles.gameOverContainer}>
{winner === 'draw' ? (
<Text style={styles.gameOverText}>It's a draw!</Text>
) : (
<Text style={styles.gameOverText}>
Player {winner} wins!
</Text>
)}
<Button onPress={playAgain} title="Play Again" />
</View>
)}
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center'
},
row: {
flexDirection: 'row'
},
cell: {
width: 100,
height: 100,
alignItems: 'center',
justifyContent: 'center'
},
button: {
width: 100,
height: 100
},
image: {
width: 80,
height: 80
},
gameOverContainer: {
alignItems: 'center',
justifyContent: 'center'
},
gameOverText: {
fontSize: 20,
fontWeight: 'bold'
}
});

export default TicTacToe;