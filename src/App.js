import { Fragment } from "react";
import NavBar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Tasks from "./components/tasks";

export default function App() {
  return (
    <Fragment>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <NavBar />
          <div className="flex-1 overflow-auto bg-gray-50 p-4">
            <Tasks />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
