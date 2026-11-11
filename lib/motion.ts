export const MOTION_STORAGE_KEY = "lrjc:background-motion";
export const MOTION_EVENT = "lrjc:background-motion";

export type MotionMode = "on" | "off";

export function getStoredMotionMode(): MotionMode | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(MOTION_STORAGE_KEY);
    return value === "on" || value === "off" ? value : null;
  } catch {
    return null;
  }
}

export function getSystemReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMotionPaused(): boolean {
  const mode = getStoredMotionMode();
  if (mode === "off") return true;
  if (mode === "on") return false;
  return getSystemReducedMotion();
}

