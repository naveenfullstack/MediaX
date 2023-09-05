import React from "react";
import { MdAdd } from "react-icons/md";

export default function MyList() {
  return (
    <div className="flex items-center space-x-2 w-fit px-6 pl-4 py-2 rounded-md text-white border-default border-white/[.60] hover:bg-input_bg hover:border-transparent">
      <MdAdd className="text-[1.5rem]" />
      <button className="capitalize">my list</button>
    </div>
  );
}
