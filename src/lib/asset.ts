export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "./";
  const clean = path.replace(/^\.\//, "").replace(/^\//, "");
  return `${base}${clean}`;
}
