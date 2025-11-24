import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert a byte size to a human-readable string using KB, MB, or GB units.
 * - Uses a 1024 base (1 KB = 1024 B)
 * - Shows at most one decimal place for KB and larger
 * - Uses whole numbers for bytes (B)
 *
 * Examples:
 *  - formatSize(0) => "0 B"
 *  - formatSize(1024) => "1 KB"
 *  - formatSize(1536) => "1.5 KB"
 *  - formatSize(1048576) => "1 MB"
 *  - formatSize(1073741824) => "1 GB"
 */
export function formatSize(bytes: number): string {
  if (bytes === null || bytes === undefined || !Number.isFinite(bytes)) {
    return "0 B"
  }

  const negative = bytes < 0
  let value = Math.abs(bytes)

  const units = ["B", "KB", "MB", "GB"] as const
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex++
  }

  const formatted = unitIndex === 0
    ? Math.round(value).toString()
    : (Math.round(value * 10) / 10).toString() // one decimal max, no trailing .0

  return `${negative ? "-" : ""}${formatted} ${units[unitIndex]}`
}

export const generateUUID = () => crypto.randomUUID()