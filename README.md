# DualCounter - Componente Modular

## 🏗️ Estructura del Componente

El componente `DualCounter` ha sido refactorizado siguiendo las mejores prácticas de React y Astro, dividiéndose en componentes más pequeños y reutilizables.

### 📁 Estructura de Archivos

```
src/
├── components/
│   ├── DualCounter/           # Componente principal
│   │   ├── index.tsx         # Componente principal (orquestador)
│   │   ├── ToggleSection.tsx # Toggle de secciones
│   │   ├── ControlButtons.tsx # Botones de control
│   │   ├── TimeDisplay.tsx   # Display del tiempo
│   │   └── README.md         # Esta documentación
│   ├── ui/                   # Componentes UI reutilizables
│   │   ├── IconButton.tsx    # Botón con icono
│   │   └── Toggle.tsx        # Toggle de secciones
│   └── animations/           # Componentes de animación
│       ├── BackgroundEffects.tsx # Efectos de fondo
│       └── ExpandingWaves.tsx    # Ondas expansivas
├── hooks/                    # Hooks personalizados
│   ├── useTimeCounter.ts     # Hook para contador de tiempo
│   ├── useTheme.ts          # Hook para manejo de tema
│   └── useToggleDimensions.ts # Hook para dimensiones del toggle
├── utils/                    # Utilidades
│   ├── animations.ts         # Variantes de animación
│   └── timeCalculations.ts  # Cálculos de tiempo
├── constants/                # Constantes
│   └── dates.ts             # Fechas del sistema
└── types/                    # Tipos TypeScript
    └── index.ts             # Interfaces y tipos
```

## 🔧 Componentes Principales

### 1. **DualCounter/index.tsx**
- **Responsabilidad**: Orquestador principal del componente
- **Estado**: Maneja el estado global del componente
- **Composición**: Combina todos los subcomponentes

### 2. **ToggleSection.tsx**
- **Responsabilidad**: Maneja el toggle entre "Doble Sueldo" y "Bono Anual"
- **Props**: `showLabels`, `selectedSection`, `onSectionChange`, `isDarkTheme`, `toggleDimensions`

### 3. **ControlButtons.tsx**
- **Responsabilidad**: Botones de control (tema y etiquetas)
- **Props**: `showLabels`, `isDarkTheme`, `onToggleLabels`, `onToggleTheme`, `waveAnimation`

### 4. **TimeDisplay.tsx**
- **Responsabilidad**: Muestra el contador de tiempo
- **Props**: `selectedSection`, `timeUnits`, `previousTimeUnits`, `isDarkTheme`, `showLabels`

## 🎣 Hooks Personalizados

### 1. **useTimeCounter**
- Maneja la lógica del contador de tiempo
- Calcula las unidades de tiempo (meses, semanas, días, etc.)
- Actualiza el tiempo cada segundo

### 2. **useTheme**
- Maneja el estado del tema (claro/oscuro)
- Proporciona función para cambiar tema

### 3. **useToggleDimensions**
- Maneja las dimensiones responsivas del toggle
- Escucha cambios de tamaño de ventana

## 🎨 Componentes UI

### 1. **IconButton**
- Botón reutilizable con iconos
- Efectos de ondas al hacer click
- Soporte para temas claro/oscuro

### 2. **Toggle**
- Toggle de secciones reutilizable
- Indicador animado de selección
- Soporte para temas

## 🚀 Beneficios de la Refactorización

1. **Mantenibilidad**: Código más fácil de mantener y debuggear
2. **Reutilización**: Componentes que se pueden usar en otras partes de la app
3. **Testabilidad**: Cada componente se puede testear independientemente
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades
5. **Separación de responsabilidades**: Cada componente tiene una función específica
6. **TypeScript**: Tipado fuerte en toda la aplicación

## 📝 Uso

```tsx
import DualCounter from '../components/DualCounter';

// En tu componente Astro
<DualCounter client:load />
```

## 🔄 Flujo de Datos

1. **DualCounter** maneja el estado principal
2. **Hooks** procesan la lógica de negocio
3. **Componentes UI** renderizan la interfaz
4. **Props** pasan datos entre componentes
5. **Callbacks** manejan eventos y actualizaciones de estado

## 🎯 Próximos Pasos

- [ ] Agregar tests unitarios para cada componente
- [ ] Implementar lazy loading para componentes pesados
- [ ] Agregar más temas personalizables
- [ ] Implementar persistencia del tema en localStorage
- [ ] Agregar animaciones de transición entre secciones
