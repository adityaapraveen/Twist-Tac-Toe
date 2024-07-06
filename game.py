from collections import deque

class TicTacToe:
    def __init__(self):
        self.board = [['' for _ in range(3)] for _ in range(3)]
        self.x_queue = deque()
        self.o_queue = deque()
    
    def place_mark(self, row, col, mark):
        if self.board[row][col] != '':
            return "Cell is already occupied!"
        
        if mark == 'X':
            if len(self.x_queue) == 3:
                old_row, old_col = self.x_queue.popleft()
                self.board[old_row][old_col] = ''
            self.x_queue.append((row, col))
        elif mark == 'O':
            if len(self.o_queue) == 3:
                old_row, old_col = self.o_queue.popleft()
                self.board[old_row][old_col] = ''
            self.o_queue.append((row, col))
        
        self.board[row][col] = mark
        return self.board

# Example usage:
game = TicTacToe()
print(game.place_mark(0, 0, 'X'))
print(game.place_mark(1, 1, 'O'))
print(game.place_mark(0, 1, 'X'))
print(game.place_mark(0, 2, 'X'))
print(game.place_mark(1, 0, 'X'))  # This should remove the X at (0,0)
