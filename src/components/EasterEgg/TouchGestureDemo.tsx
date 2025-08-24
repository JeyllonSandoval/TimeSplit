import { useTouchGestures } from '../../hooks/useTouchGestures';
import { motion } from 'framer-motion';

export const TouchGestureDemo = () => {
  const { lastGesture, resetGesture, handleTouchStart, handleTouchEnd, handleTouchMove } = useTouchGestures();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-4">
      <motion.div
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          🎮 Demo de Gestos Táctiles
        </h1>
        
        <div className="text-center mb-6">
          <p className="text-white/80 text-sm mb-4">
            Prueba los gestos táctiles en esta área:
          </p>
          
          <div 
            className="w-64 h-64 mx-auto bg-white/5 border-2 border-dashed border-white/30 rounded-xl flex items-center justify-center cursor-pointer"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">👆</div>
              <p className="text-white/60 text-sm">Toca aquí</p>
            </div>
          </div>
        </div>

        {lastGesture && (
          <motion.div
            className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-green-300 text-center font-semibold">
              Último gesto: <span className="text-green-200">{lastGesture}</span>
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">⬆️</div>
            <p className="text-white/70">Swipe Arriba</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">⬇️</div>
            <p className="text-white/70">Swipe Abajo</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">⬅️</div>
            <p className="text-white/70">Swipe Izquierda</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">➡️</div>
            <p className="text-white/70">Swipe Derecha</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">👆👆</div>
            <p className="text-white/70">Doble Tap</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">👆⏱️</div>
            <p className="text-white/70">Mantener</p>
          </div>
        </div>

        <button
          onClick={resetGesture}
          className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg border border-white/20 transition-colors"
        >
          Resetear Gesto
        </button>
      </motion.div>
    </div>
  );
};
