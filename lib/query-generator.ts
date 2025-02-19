export function queryGenerator(params: Record<string, any>) {
  const queryParams = new URLSearchParams(params);
  return "?" + queryParams.toString();
}
