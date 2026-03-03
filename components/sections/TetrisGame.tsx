'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const COLS = 10;
const ROWS = 20;

const SHAPES = [
  [['#0ea5e9', '#0ea5e9', '#0ea5e9', '#0ea5e9']], // I
  [['#3b82f6', ''], ['#3b82f6', '#3b82f6'], ['#3b82f6', '']], // J
  [['', '#f59e0b'], ['#f59e0b', '#f59e0b'], ['', '#f59e0b']], // L
  [['#eab308', '#eab308'], ['#eab308', '#eab308']], // O
  [['', '#22c55e', '#22c55e'], ['#22c55e', '#22c55e', '']], // S
  [['#a855f7', '#a855f7', '#a855f7'], ['', '#a855f7', '']], // T
  [['#ef4444', '#ef4444', ''], ['', '#ef4444', '#ef4444']] // Z
];

const createBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(''));

export default function TetrisGame() {
  const [board, setBoard] = useState(createBoard());
  const [piece, setPiece] = useState<{shape: string[][], x: number, y: number}>({ shape: [], x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isConfirmingRestart, setIsConfirmingRestart] = useState(false);

  // Use refs for the game loop to avoid dependency cycles
  const pieceRef = useRef(piece);
  const boardRef = useRef(board);
  const gameOverRef = useRef(gameOver);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    pieceRef.current = piece;
    boardRef.current = board;
    gameOverRef.current = gameOver;
    isPausedRef.current = isPaused || isConfirmingRestart;
  }, [piece, board, gameOver, isPaused, isConfirmingRestart]);

  const getNewPiece = () => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return {
      shape,
      x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
      y: 0
    };
  };

  const checkCollision = (shape: string[][], x: number, y: number, currentBoard: string[][]) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const newY = y + r;
          const newX = x + c;
          if (
            newY >= ROWS ||
            newX < 0 ||
            newX >= COLS ||
            (newY >= 0 && currentBoard[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const mergePiece = () => {
    const newBoard = boardRef.current.map(row => [...row]);
    const { shape, x, y } = pieceRef.current;
    
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] && y + r >= 0) {
          newBoard[y + r][x + c] = shape[r][c];
        }
      }
    }
    
    // Clear lines
    let linesCleared = 0;
    const finalBoard = newBoard.filter(row => {
      if (row.every(cell => cell !== '')) {
        linesCleared++;
        return false;
      }
      return true;
    });
    
    while (finalBoard.length < ROWS) {
      finalBoard.unshift(Array(COLS).fill(''));
    }
    
    if (linesCleared > 0) {
      setScore(s => s + [0, 100, 300, 500, 800][linesCleared]);
    }
    
    setBoard(finalBoard);
    
    const nextPiece = getNewPiece();
    if (checkCollision(nextPiece.shape, nextPiece.x, nextPiece.y, finalBoard)) {
      setGameOver(true);
    } else {
      setPiece(nextPiece);
    }
  };

  const moveDown = useCallback(() => {
    if (gameOverRef.current || isPausedRef.current) return;
    
    if (!checkCollision(pieceRef.current.shape, pieceRef.current.x, pieceRef.current.y + 1, boardRef.current)) {
      setPiece(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      mergePiece();
    }
  }, []);

  const moveHorizontal = (dir: number) => {
    if (gameOverRef.current || isPausedRef.current) return;
    if (!checkCollision(pieceRef.current.shape, pieceRef.current.x + dir, pieceRef.current.y, boardRef.current)) {
      setPiece(prev => ({ ...prev, x: prev.x + dir }));
    }
  };

  const rotate = () => {
    if (gameOverRef.current || isPausedRef.current) return;
    const { shape, x, y } = pieceRef.current;
    
    // Transpose and reverse rows for clockwise rotation
    const rotatedShape = shape[0].map((_, colIndex) => shape.map(row => row[colIndex]).reverse());
    
    if (!checkCollision(rotatedShape, x, y, boardRef.current)) {
      setPiece(prev => ({ ...prev, shape: rotatedShape }));
    }
  };

  const hardDrop = () => {
    if (gameOverRef.current || isPausedRef.current) return;
    let newY = pieceRef.current.y;
    while (!checkCollision(pieceRef.current.shape, pieceRef.current.x, newY + 1, boardRef.current)) {
      newY++;
    }
    pieceRef.current = { ...pieceRef.current, y: newY };
    mergePiece();
  };

  // Game Loop
  useEffect(() => {
    if (gameOver) return;
    const dropSpeed = Math.max(100, 800 - (Math.floor(score / 1000) * 100));
    const interval = setInterval(moveDown, dropSpeed);
    return () => clearInterval(interval);
  }, [moveDown, gameOver, score]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent space bar from scrolling specifically if we are playing
      if (e.key === ' ' && !gameOver) {
        e.preventDefault();
      }

      // Restart key
      if (e.key === 'r' || e.key === 'R') {
        if (hasStarted && !gameOver) {
          setIsPaused(true);
          setIsConfirmingRestart(true);
        } else if (gameOver) {
          startGame();
        }
        return;
      }
      
      if (gameOver || isConfirmingRestart) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveHorizontal(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveHorizontal(1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotate();
          break;
        case ' ':
          hardDrop();
          break;
        case 'p':
        case 'P':
          setIsPaused(p => !p);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, moveDown]);

  const startGame = () => {
    setBoard(createBoard());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setHasStarted(true);
    setIsConfirmingRestart(false);
    setPiece(getNewPiece());
  };

  const renderGrid = () => {
    const displayBoard = board.map(row => [...row]);
    if (!gameOver && piece.shape.length > 0) {
      for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {
          if (piece.shape[r][c] && piece.y + r >= 0 && piece.y + r < ROWS) {
            displayBoard[piece.y + r][piece.x + c] = piece.shape[r][c];
          }
        }
      }
    }

    return displayBoard.map((row, r) => (
      <div key={r} className="flex flex-1 w-full">
        {row.map((cell, c) => (
          <div 
            key={`${r}-${c}`} 
            className="flex-1 h-full border border-[var(--border)] opacity-90 transition-colors duration-75"
            style={{ backgroundColor: cell || 'var(--card)' }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-6xl mx-auto p-4 z-10 relative">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 w-full">
        {/* Game Board */}
        <div className="relative p-2 rounded-xl border-4 border-[var(--border)] shadow-2xl !bg-[var(--background)] glass flex-shrink-0">
          <div 
            className="bg-[var(--card)] rounded-lg overflow-hidden border border-[var(--border)] flex flex-col aspect-[1/2]"
            style={{ height: 'clamp(360px, 60vh, 750px)', maxHeight: '160vw' }}
          >
            {renderGrid()}
          </div>
          
          <AnimatePresence>
            {(gameOver || !hasStarted) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-20 shadow-2xl"
              >
                {hasStarted && (
                  <h2 className="text-3xl font-black text-white font-display mb-8 uppercase tracking-widest drop-shadow-lg text-center leading-tight">
                    Game Over
                  </h2>
                )}
                <button 
                  onClick={startGame}
                  className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] uppercase tracking-wider text-sm"
                >
                  {!hasStarted ? 'Start Game' : 'Play Again'}
                </button>
              </motion.div>
            )}

            {isPaused && !gameOver && hasStarted && !isConfirmingRestart && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-xl z-20"
              >
                <motion.button 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPaused(false)}
                  className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary-rgb),0.6)] focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.button>
              </motion.div>
            )}

            {isConfirmingRestart && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center rounded-xl z-30 p-6 text-center"
              >
                <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Restart Game?</h2>
                <div className="flex gap-4">
                  <button 
                    onClick={startGame}
                    className="bg-primary text-white font-bold px-6 py-2 rounded-full hover:bg-primary/80 transition-colors uppercase text-xs tracking-widest"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => {
                      setIsConfirmingRestart(false);
                      setIsPaused(false);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2 rounded-full transition-colors uppercase text-xs tracking-widest border border-white/20"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-8 w-full md:w-64 max-w-sm">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-[var(--foreground)] text-center md:text-left">
              Tet<span className="text-primary">ris</span>
            </h1>
          </div>
          
          <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow-xl glass !bg-[var(--background)] text-center md:text-left">
            <h3 className="text-[var(--muted)] uppercase tracking-widest text-xs font-bold mb-2">Score</h3>
            <div className="font-display text-4xl font-black text-[var(--foreground)]">{score}</div>
          </div>
          
          <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow-xl glass !bg-[var(--background)] hidden lg:block">
            <h3 className="text-[var(--muted)] uppercase tracking-widest text-xs font-bold mb-4">Controls</h3>
            <div className="space-y-3 text-sm text-[var(--foreground)] opacity-80">
              <div className="flex justify-between items-center"><span className="font-bold border border-[var(--border)] px-2 py-1 rounded">↑</span> <span>Rotate</span></div>
              <div className="flex justify-between items-center"><span className="font-bold border border-[var(--border)] px-2 py-1 rounded">← →</span> <span>Move</span></div>
              <div className="flex justify-between items-center"><span className="font-bold border border-[var(--border)] px-2 py-1 rounded">↓</span> <span>Soft Drop</span></div>
              <div className="flex justify-between items-center"><span className="font-bold border border-[var(--border)] px-2 py-1 rounded text-[10px]">SPACE</span> <span>Hard Drop</span></div>
              <div className="flex justify-between items-center"><span className="font-bold border border-[var(--border)] px-2 py-1 rounded text-[10px]">P</span> <span>Pause</span></div>
              <div className="flex justify-between items-center"><span className="font-bold border border-[var(--border)] px-2 py-1 rounded text-[10px]">R</span> <span>Restart</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
