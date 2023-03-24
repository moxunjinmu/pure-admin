const { VITE_HTTP_API_HEADER } = import.meta.env;

export const baseUrlApi = (url: string) => {
  console.log("VITE_HTTP_API_HEADER", VITE_HTTP_API_HEADER);
  return `/${VITE_HTTP_API_HEADER}/v1/${url}`;
};
