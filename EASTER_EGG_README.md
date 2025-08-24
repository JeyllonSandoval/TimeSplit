# 🎉 Easter Egg de TimeSplit

## 🎮 Cómo Activarlo

Para desbloquear este increíble easter egg, debes ejecutar la siguiente secuencia de teclas:

**↑ ↑ ↓ ↓ ← → ← → B A**

### 📱 Instrucciones:
1. **Flecha Arriba** (2 veces)
2. **Flecha Abajo** (2 veces)
3. **Flecha Izquierda**
4. **Flecha Derecha**
5. **Flecha Izquierda**
6. **Flecha Derecha**
7. **Tecla B**
8. **Tecla A**

## ✨ Características del Easter Egg

### 🎭 Animación de Desbloqueo
Cuando completes correctamente la secuencia, se activará una **animación increíble y alucinante** que incluye:

#### 🌟 Fase 1: Explosión de Partículas
- **100 partículas** de colores brillantes
- Efectos de luz y sombra
- Movimiento aleatorio y expansivo
- **Efectos de sonido** generados por Web Audio API

#### 🌊 Fase 2: Ondas Expansivas
- **5 ondas concéntricas** con colores diferentes
- Efecto de pulso central animado
- Transiciones suaves y fluidas

#### 🌀 Fase 3: Vortex Giratorio
- **3 círculos giratorios** con partículas
- Efecto de espiral en contrarrotación
- Animaciones sincronizadas

#### 📊 Fase 4: Matrix de Números
- **100 números** cayendo en cascada
- **20 símbolos especiales** (⚡💎🌟🔥💫)
- Efecto visual tipo "Matrix"

#### 🎊 Fase 5: Mensaje Final
- Título **"¡DESBLOQUEADO!"** con gradientes
- Efectos de confeti animados
- **Sombra de texto** con blur
- Emoji con efectos de brillo

### 🎵 Efectos de Audio
- **Sonido principal** de desbloqueo con acordes
- **Efectos de partículas** con tonos aleatorios
- **Sonido Matrix** con ondas cuadradas
- **Efecto "whoosh"** final

### 📊 Indicador de Progreso
- **Visualización en tiempo real** de la secuencia
- **Teclas iluminadas** según el progreso
- **Barra de progreso** animada
- **Mensajes motivacionales**

## 🛠️ Tecnologías Utilizadas

- **Framer Motion** - Animaciones fluidas y avanzadas
- **Web Audio API** - Generación de sonidos en tiempo real
- **React Hooks** - Estado y efectos personalizados
- **Tailwind CSS** - Estilos y efectos visuales
- **TypeScript** - Tipado seguro y robusto

## 🎨 Personalización

### Colores de Partículas
```typescript
const colors = ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#00ffff', '#ff00ff'];
```

### Secuencia Personalizable
```typescript
const EASTER_EGG_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
];
```

### Duración de Fases
```typescript
const phaseDuration = 800; // milisegundos por fase
```

## 🚀 Funcionalidades Avanzadas

### 🔄 Sistema de Fases
- **5 fases** de animación secuenciales
- **Transiciones automáticas** entre fases
- **Sincronización** de audio y video

### 🎯 Partículas Inteligentes
- **Posicionamiento aleatorio** en pantalla
- **Movimiento físico** realista
- **Efectos de desvanecimiento** graduales

### 🎭 Efectos Visuales
- **Gradientes dinámicos** con CSS
- **Sombras y blur** para profundidad
- **Animaciones de escala** y rotación

## 📱 Compatibilidad

- ✅ **Chrome/Edge** - Soporte completo
- ✅ **Firefox** - Soporte completo
- ✅ **Safari** - Soporte completo
- ⚠️ **Móviles** - Limitado (requiere teclado físico)

## 🎯 Consejos para Usuarios

1. **Practica la secuencia** antes de intentarla
2. **No presiones teclas adicionales** durante la secuencia
3. **Disfruta la animación** completa antes de continuar
4. **Usa auriculares** para una experiencia inmersiva

## 🔧 Desarrollo

### Estructura de Archivos
```
src/components/EasterEgg/
├── EasterEggUnlockAnimation.tsx    # Animación principal
├── EasterEggProgressIndicator.tsx  # Indicador de progreso
├── EasterEggModal.tsx             # Modal del easter egg
├── EasterEggScreen.tsx            # Pantalla completa
└── index.ts                       # Exportaciones
```

### Hooks Personalizados
- `useEasterEgg` - Lógica principal del easter egg
- `useAudioEffects` - Efectos de sonido

### Componentes Reutilizables
- **EasterEggUnlockAnimation** - Animación de desbloqueo
- **EasterEggProgressIndicator** - Indicador visual de progreso

---

## 🎊 ¡Disfruta del Easter Egg!

Este easter egg fue diseñado para proporcionar una **experiencia visual y auditiva increíble** que celebra el logro del usuario. ¡Cada detalle fue cuidadosamente pensado para crear una animación memorable y alucinante!
