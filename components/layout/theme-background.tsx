"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeBackground() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const bg = !mounted || resolvedTheme !== "dark"
    ? "https://res.cloudinary.com/dlndowzi/image/upload/v1792356696/BG-light.jpg"
    : "https://res.cloudinary.com/dlndowzi/image/upload/v1792356699/BG-dark.jpg";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bg}')` }}
      aria-hidden="true"
    />
  );
}