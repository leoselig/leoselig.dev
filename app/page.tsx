"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const { push } = useRouter();

  useEffect(() => {
    push("/me");
  }, [push]);

  return null;
}
