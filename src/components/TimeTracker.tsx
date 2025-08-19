import { useState } from 'react';

interface TimeEntry {
  id: string;
  task: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

export default function TimeTracker() {
  const [tasks, setTasks] = useState<TimeEntry[]>([]);
  const [currentTask, setCurrentTask] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  const startTracking = () => {
    if (!currentTask.trim()) return;
    
    const newTask: TimeEntry = {
      id: Date.now().toString(),
      task: currentTask,
      startTime: new Date(),
    };
    
    setTasks(prev => [...prev, newTask]);
    setCurrentTaskId(newTask.id);
    setIsTracking(true);
    setCurrentTask('');
  };

  const stopTracking = () => {
    if (!currentTaskId) return;
    
    setTasks(prev => prev.map(task => 
      task.id === currentTaskId 
        ? { 
            ...task, 
            endTime: new Date(),
            duration: new Date().getTime() - task.startTime.getTime()
          }
        : task
    ));
    
    setCurrentTaskId(null);
    setIsTracking(false);
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">TimeSplit</h1>
        <p className="text-gray-600">Rastrea tu tiempo de manera eficiente</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            placeholder="¿En qué estás trabajando?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isTracking}
          />
          {!isTracking ? (
            <button
              onClick={startTracking}
              disabled={!currentTask.trim()}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Iniciar
            </button>
          ) : (
            <button
              onClick={stopTracking}
              className="btn bg-red-600 text-white hover:bg-red-700"
            >
              Detener
            </button>
          )}
        </div>

        {isTracking && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <span className="font-medium">Rastreando:</span> {tasks.find(t => t.id === currentTaskId)?.task}
            </p>
          </div>
        )}
      </div>

      {tasks.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Historial de Tareas</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-500">
                    {task.startTime.toLocaleTimeString()} - {task.endTime ? task.endTime.toLocaleTimeString() : 'En curso'}
                  </p>
                </div>
                {task.duration && (
                  <span className="text-sm font-medium text-primary-600">
                    {formatDuration(task.duration)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
