"use client"

import { useSyncExternalStore } from "react"

export type Theme = "dark" | "light"

const STORAGE_KEY = "karven-theme"
const EVENT = "karven-theme-change"

/** Inline script run before paint so the stored theme applies without a flash. */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`

export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark"
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"
}

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme)
  try { localStorage.setItem(STORAGE_KEY, theme) } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }))
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  return () => window.removeEventListener(EVENT, onChange)
}

/** Current theme; "dark" during SSR and hydration, then whatever the document carries. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "dark")
}
