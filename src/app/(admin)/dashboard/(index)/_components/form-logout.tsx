"use client";

import { initialState } from "@/types";
import { LogOut } from "lucide-react";
import { useFormState } from "react-dom";
import { signOut } from "../lib/action";

export default function FormLogout() {
  const [state, formAction] = useFormState(signOut, initialState);

  return (
    <nav className="mt-auto flex flex-col gap-2 px-4 py-4">
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <form action={formAction}>
        <button className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </form>
    </nav>
  );
}
