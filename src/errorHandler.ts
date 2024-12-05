import { AxiosError } from "axios";

export const handleError = (
  error: unknown,
  errorCodesToCheck: number | number[],
  errorMessages: string | Record<number, string>
): string => {
  if (typeof errorMessages === "string") {
    return errorMessages;
  }
  const codesToCheck = Array.isArray(errorCodesToCheck)
    ? errorCodesToCheck
    : [errorCodesToCheck];
  if (error instanceof AxiosError && error.response) {
    const status = error.response.status;
    if (codesToCheck.includes(status) && errorMessages[status])
      return errorMessages[status];
    if (status >= 500)
      return "A server error occurred. Please try again later.";
    return "An unknown error occurred.";
  }
  if (error instanceof Error) return error.message;
  return "An unknown error occurred.";
};
