board = [
    [0, 0, 9, 0, 7, 1, 0, 0, 0],
    [0, 8, 0, 2, 0, 4, 0, 9, 6],
    [7, 0, 2, 0, 0, 8, 0, 3, 0],
    [9, 0, 7, 0, 2, 0, 3, 0, 4],
    [0, 3, 0, 0, 0, 0, 0, 0, 0],
    [4, 5, 0, 1, 0, 3, 0, 0, 0],
    [0, 2, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 6, 5, 7],
    [5, 0, 0, 0, 8, 0, 0, 1, 3]
]


def pr(board):
    for i in range(len(board)):
        if i % 3 == 0 and i != 0:
            print("---------------------")

        for j in range(len(board[i])):
            if j % 3 == 0 and j != 0:
                print("|", end=" ")

            if j == 8:
                print(board[i][j])

            else:
                print(board[i][j], end=" ")


def valid(row, colum, number):
    global board
    # check if the row is valid
    for i in range(0, 9):
        if board[row][i] == number:
            return False

    # check if the colum is valid
    for i in range(0, 9):
        if board[i][colum] == number:
            return False

    # check if the box is valid
    x = (row // 3) * 3
    y = (colum // 3) * 3
    for i in range(0, 3):
        for j in range(0, 3):
            if board[x + i][y + j] == number:
                return False

    return True


def sudoku_solver():
    global board
    for row in range(0, 9):
        for colum in range(0, 9):
            if board[row][colum] == 0:
                for i in range(1, 10):
                    if valid(row, colum, i):
                        board[row][colum] = i
                        sudoku_solver()
                        board[row][colum] = 0

                return True
    pr(board)





pr(board)
print("######################################")
sudoku_solver()

