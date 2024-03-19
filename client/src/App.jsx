import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";

const App = () => {
  return (
    <>
      <div className="bg-zinc-800">
        <div className="flex justify-center">
          <Header></Header>
        </div>
        <main className="flex justify-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
