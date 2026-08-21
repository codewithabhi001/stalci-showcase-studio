export function reportLovableError(error: Error, metadata?: Record<string, any>) {
  if (process.env.NODE_ENV !== "production") {
    console.error("[Lovable Error Report]:", error, metadata);
  }
}
