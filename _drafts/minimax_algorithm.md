---
title: Algoritma Minimax Pada Game Tic-Tac-Toe
date: 2021-09-21 15:25:45 Z
tags:
- Algorithm
layout: article
key: 201806251
comments: true
---

## Apa itu MiniMax
Minimax merupakan suatu algoritma yang digunakan pada pembuatan keputusan atau game theory. khususnya zero-sum game yang dijalankan oleh dua pemain secara bergantian, algoritma ini mencoba untuk mencari langkah yang paling optimal untuk sipemain untuk bisa memenangkan permainan, dengan asumsi bahwa lawan juga bermain secara optimal. contoh game ini seperti Tic-Tac-Toe, Backgamon dsb.

<!--more-->

Pada suatu game, algoritma ini akan menganggap kedua pemain pada game yang disebut **maximizer** dan **minimizer**. **maximizer** mencoba untuk mendapatkan nilai tertinggi, sementara **minimizer** sebaliknya mendapatkan nilai yang terendah.

Artikel ini akan membahas tentang game *tic-tac-toe*, setiap state pada game, dan setiap langkah yang memungkinkan memiliki suatu nilai, dimana nilai tersebut dikalkulasikan secara rekursif sampai ke state akhir/terminal game. untuk **maximizer** nilai yang ingin dia temukan adalah suatu nilai maximum yang merepresentasikan bahwa itu adalah langkah yang optimal, sementara **minimizer** sebaliknya langkah optimalnya adalah dengan nilai yang rendah.

## Tic-Tac-Toe Game
Asumsi pada state game *tic-tac-toe* terdapat dua pemain **X** dan **O**, dimana **X** adalah **maximizer** player yang mencari nilai *max* dan **O** adalah **minimizer** player yang mencari nilai *min*, state permain digambarkan oleh node root dibawah, dan pada saat itu adalah giliran **X**.

- Nilai **100** diberikan jika **X** menang.
- Nilai **-100** diberikan jika **O** mengang (**X** kalah).
- 0 jika seri.

![tic-tac-toe state](/assets/images/minimax/ttt1.png){:.center}

- Pada game state seperti node root diatas maka **X** akan memiliki 3 kemungkinan langkah yang dapat diambil karena **X** adalah **maximizer** maka dua state pertama yang menghasilkan end/terminal state yang menjadikan **X** menang akan dipilih (salah satu).
- Tetapi jika asumsi **X** memilih langkah ketiga maka dia tidak akan memenangkan game pada saat itu dan gilirian selanjutnya adalah **O**.
- **O** memiliki 2 kemungkinan langkah yang dapat diambil, tentunya karena **O** adalah **minimizer** maka dia akan memilih langkah pertama yang merupakan terminal state dan menjadikannya pemenang game dengan nilai *-100*.
- Tetapi jika dievaluasi lebih lanjut untuk langkah **O** yang kedua maka tidak akan menjadikannya menang, sehingga masuk kegiliran selanjutnya yaitu **X** dimana hanya ada satu *cell* yang dapat diisi dan menjadikannya (**X**) menang dengan nilai *100*.

## Koding

### Tic-tac-toe board

![array 2d](/assets/images/minimax/array2d.png){:.center}

### Fungsi skor (evaluation function)

![win set](/assets/images/minimax/ttt-eval.png){:.center}

```kotlin
class Evaluator {

    companion object {
        const val VAL_MAX = 100
        const val VAL_MIN = -100
        const val VAL_DRAW = 0

        @JvmStatic
        fun evaluate(board: Board, maxPlayer: Int, minPlayer: Int): Int {
            // horizontal
            for (i in 0 until board.rowCount) {
                if (board[i, 0] == board[i, 1] && board[i, 1] == board[i, 2]) {
                    if (board[i, 0] == maxPlayer)
                        return VAL_MAX
                    if (board[i, 0] == minPlayer)
                        return VAL_MIN
                }
            }

            // vertical
            for (i in 0 until board.colCount) {
                if (board[0, i] == board[1, i] && board[1, i] == board[2, i]) {
                    if (board[0, i] == maxPlayer)
                        return VAL_MAX
                    if (board[0, i] == minPlayer)
                        return VAL_MIN
                }
            }

            if (board[0, 0] == board[1, 1] && board[1, 1] == board[2, 2]) {
                if (board[0, 0] == maxPlayer)
                    return VAL_MAX
                if (board[0, 0] == minPlayer)
                    return VAL_MIN
            }

            if (board[0, 2] == board[1, 1] && board[1, 1] == board[2, 0]) {
                if (board[0, 2] == maxPlayer)
                    return VAL_MAX
                if (board[0, 2] == minPlayer)
                    return VAL_MIN
            }

            return VAL_DRAW
        }
    }
}
```

## References
- [https://en.wikipedia.org/wiki/Minimax](https://en.wikipedia.org/wiki/Minimax)
- [https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/)
- [https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-2-evaluation-function/](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-2-evaluation-function/)
- [https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/)
- [https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13](https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13)