import {
  Home,
  MessageCircle,
  CheckSquare,
  Users,
  Settings,
  ChevronLeft,
  Plus,
  MoreHorizontal,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="text-gray-900 font-medium">Project M.</span>
        </div>
        <ChevronLeft className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">Messages</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-sm">Tasks</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm">Members</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </a>
        </nav>
        <div className="mt-8 px-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              My Projects
            </h3>
            <Plus className="w-4 h-4 text-gray-400" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Mobile App</span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Website Redesign</span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Design System</span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Wireframes</span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-50 rounded-xl p-4 relative">
          <div className="text-center mb-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">💡</span>
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              Thoughts Time
            </h4>
          </div>
          <p className="text-xs text-gray-600 text-center mb-4 leading-relaxed">
            We don't have any notice for you, till then you can share your
            thoughts with your peers.
          </p>
          <button className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Write a message
          </button>
        </div>
      </div>
    </div>
  );
}
