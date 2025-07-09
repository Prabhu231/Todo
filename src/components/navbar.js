import { Search, Calendar, Bell, ChevronDown } from "lucide-react";

export default function NavBar() {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar className="w-5 h-5 text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                Palak Jain
              </div>
              <div className="text-xs text-gray-500">Rajasthan, India</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">PJ</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
