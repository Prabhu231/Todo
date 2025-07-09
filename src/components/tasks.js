import { useState, useReducer } from "react";
import {
  Filter,
  Share,
  Menu,
  Plus,
  MoreHorizontal,
  MessageCircle,
  Paperclip,
  Calendar,
  X,
  Search,
} from "lucide-react";

const defaultTasks = {
  tasks: {
    "to-do": [],
    "on-progress": [],
    done: [],
  },
  filter: {
    priority: "all",
    category: "all",
    search: "",
  },
};

function manageTaskState(currentState, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...currentState,
        tasks: {
          ...currentState.tasks,
          [action.section]: [
            ...currentState.tasks[action.section],
            action.task,
          ],
        },
      };
    case "MOVE_TASK":
      const { taskId, fromSection, toSection } = action;
      const taskToMove = currentState.tasks[fromSection].find(
        (t) => t.id === taskId
      );
      if (!taskToMove) return currentState;

      return {
        ...currentState,
        tasks: {
          ...currentState.tasks,
          [fromSection]: currentState.tasks[fromSection].filter(
            (t) => t.id !== taskId
          ),
          [toSection]: [...currentState.tasks[toSection], taskToMove],
        },
      };
    case "SET_FILTER":
      return {
        ...currentState,
        filter: { ...currentState.filter, [action.filterType]: action.value },
      };
    case "LOAD_STATE":
      return action.state;
    default:
      return currentState;
  }
}

export default function Tasks() {
  const [appState, updateState] = useReducer(manageTaskState, defaultTasks);
  const [currentlyDragging, setCurrentlyDragging] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "Low",
  });
  const [selectedSection, setSelectedSection] = useState("to-do");
  const [highlightedColumn, setHighlightedColumn] = useState(null);

  const startDrag = (e, taskItem, columnName) => {
    setCurrentlyDragging({ task: taskItem, section: columnName });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", "");
  };

  const allowDrop = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const enterDropZone = (e, columnName) => {
    e.preventDefault();
    if (currentlyDragging && currentlyDragging.section !== columnName) {
      setHighlightedColumn(columnName);
    }
  };

  const exitDropZone = (e) => {
    e.preventDefault();
    const bounds = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (
      mouseX < bounds.left ||
      mouseX > bounds.right ||
      mouseY < bounds.top ||
      mouseY > bounds.bottom
    ) {
      setHighlightedColumn(null);
    }
  };

  const completeDrop = (e, destinationColumn) => {
    e.preventDefault();
    setHighlightedColumn(null);

    if (currentlyDragging && currentlyDragging.section !== destinationColumn) {
      updateState({
        type: "MOVE_TASK",
        taskId: currentlyDragging.task.id,
        fromSection: currentlyDragging.section,
        toSection: destinationColumn,
      });
    }
    setCurrentlyDragging(null);
  };

  const finishDrag = (e) => {
    setCurrentlyDragging(null);
    setHighlightedColumn(null);
  };

  const createNewTask = () => {
    if (taskForm.title.trim()) {
      const newTaskData = {
        id: Date.now().toString(),
        title: taskForm.title,
        description: taskForm.description,
        priority: taskForm.priority,
        comments: 0,
        files: 0,
        assignees: [
          { id: 1, name: "John", avatar: "👨‍💻" },
          { id: 2, name: "Sarah", avatar: "👩‍💼" },
        ],
        category: "general",
      };
      updateState({
        type: "ADD_TASK",
        section: selectedSection,
        task: newTaskData,
      });
      setTaskForm({ title: "", description: "", priority: "Low" });
      setIsModalOpen(false);
    }
  };

  const getFilteredTasks = (taskList) => {
    return taskList.filter((task) => {
      const priorityMatch =
        appState.filter.priority === "all" ||
        task.priority === appState.filter.priority;
      const categoryMatch =
        appState.filter.category === "all" ||
        task.category === appState.filter.category;
      const searchMatch =
        appState.filter.search === "" ||
        task.title
          .toLowerCase()
          .includes(appState.filter.search.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(appState.filter.search.toLowerCase());

      return priorityMatch && categoryMatch && searchMatch;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "High":
        return "text-red-600 bg-red-50";
      case "Low":
        return "text-green-600 bg-green-50";
      case "Completed":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getColumnStyle = (columnType) => {
    switch (columnType) {
      case "to-do":
        return "border-purple-500";
      case "on-progress":
        return "border-yellow-500";
      case "done":
        return "border-green-500";
      default:
        return "border-gray-300";
    }
  };

  const TaskItem = ({ task, section }) => {
    const isBeingDragged = currentlyDragging?.task.id === task.id;

    return (
      <div
        draggable
        onDragStart={(e) => startDrag(e, task, section)}
        onDragEnd={finishDrag}
        className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-move select-none ${
          isBeingDragged ? "opacity-50 scale-95 rotate-3" : ""
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </div>
        <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{task.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {task.assignees.map((person) => (
              <div
                key={person.id}
                className="w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center text-xs border-2 border-white"
                title={person.name}
              >
                {person.avatar}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-3 text-gray-500">
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{task.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Paperclip className="w-4 h-4" />
              <span className="text-sm">{task.files}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ColumnContainer = ({ section, children }) => {
    const isHighlighted = highlightedColumn === section;
    const canAcceptDrop =
      currentlyDragging && currentlyDragging.section !== section;

    return (
      <div
        className={`flex flex-col h-full border-t-4 ${getColumnStyle(section)} 
                      bg-white rounded-lg transition-all relative ${
                        isHighlighted && canAcceptDrop
                          ? "bg-blue-50 border-blue-400 shadow-lg"
                          : ""
                      }`}
        onDragOver={allowDrop}
        onDragEnter={(e) => enterDropZone(e, section)}
        onDragLeave={exitDropZone}
        onDrop={(e) => completeDrop(e, section)}
      >
        {children}
        {isHighlighted && canAcceptDrop && (
          <div className="absolute inset-0 bg-blue-100 bg-opacity-50 rounded-lg border-2 border-dashed border-blue-400 flex items-center justify-center z-10 pointer-events-none">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-blue-600 font-medium">Drop task here</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Mobile App</h1>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
              <Plus className="w-4 h-4" />
              <span>Invite</span>
            </button>
            <div className="flex -space-x-2">
              {["👨‍💻", "👩‍💼", "👨‍🎨", "👩‍🔬", "👨‍💼"].map((emoji, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-sm border-2 border-white"
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={appState.filter.priority}
                onChange={(e) =>
                  updateState({
                    type: "SET_FILTER",
                    filterType: "priority",
                    value: e.target.value,
                  })
                }
              >
                <option value="all">All Priority</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={appState.filter.category}
                onChange={(e) =>
                  updateState({
                    type: "SET_FILTER",
                    filterType: "category",
                    value: e.target.value,
                  })
                }
              >
                <option value="all">All Categories</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={appState.filter.search}
                onChange={(e) =>
                  updateState({
                    type: "SET_FILTER",
                    filterType: "search",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-purple-700">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColumnContainer section="to-do">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">To Do</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {getFilteredTasks(appState.tasks["to-do"]).length}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedSection("to-do");
                    setIsModalOpen(true);
                  }}
                  className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center hover:bg-purple-200"
                >
                  <Plus className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4 min-h-[200px]">
              {getFilteredTasks(appState.tasks["to-do"]).map((taskItem) => (
                <TaskItem key={taskItem.id} task={taskItem} section="to-do" />
              ))}
            </div>
          </ColumnContainer>

          <ColumnContainer section="on-progress">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">On Progress</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {getFilteredTasks(appState.tasks["on-progress"]).length}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedSection("on-progress");
                    setIsModalOpen(true);
                  }}
                  className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center hover:bg-yellow-200"
                >
                  <Plus className="w-4 h-4 text-yellow-600" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4 min-h-[200px]">
              {getFilteredTasks(appState.tasks["on-progress"]).map(
                (taskItem) => (
                  <TaskItem
                    key={taskItem.id}
                    task={taskItem}
                    section="on-progress"
                  />
                )
              )}
            </div>
          </ColumnContainer>

          <ColumnContainer section="done">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Done</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {getFilteredTasks(appState.tasks["done"]).length}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedSection("done");
                    setIsModalOpen(true);
                  }}
                  className="w-6 h-6 bg-green-100 rounded flex items-center justify-center hover:bg-green-200"
                >
                  <Plus className="w-4 h-4 text-green-600" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4 min-h-[200px]">
              {getFilteredTasks(appState.tasks["done"]).map((taskItem) => (
                <TaskItem key={taskItem.id} task={taskItem} section="done" />
              ))}
            </div>
          </ColumnContainer>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Task</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 h-20"
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={taskForm.priority}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, priority: e.target.value })
                  }
                >
                  <option value="Low">Low</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewTask}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
