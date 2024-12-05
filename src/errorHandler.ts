import { AxiosError } from "axios";

/**
 * Handles errors by checking the error type and status code.
 * @param error - The error object, which could be an AxiosError or a generic Error.
 * @param errorMessages - A string or an object mapping status codes to specific error messages. Must be an object if errorCodeToCheck is not provided.
 * @param errorCodeToCheck - Optionally specify a single error code to check against. Must be specified if errorMessages is a string.
 * @param serverErrorMessage - The message to show for server errors (status codes >= 500) (optional).
 * @param unknownErrorMessage - The message to show when the error type is unknown (optional).
 */

export const handleError = (
  error: unknown,
  errorMessages: string | Record<number, string>,
  errorCodeToCheck?: number,
  serverErrorMessage: string = "A server error occurred. Please try again later.",
  unknownErrorMessage: string = "An unknown error occurred."
): string => {
  if (error instanceof AxiosError && error.response) {
    if (
      typeof errorMessages === "string" &&
      !errorCodeToCheck &&
      error.response.status < 500
    )
      return errorMessages;
    const codesToCheck: number[] = errorCodeToCheck
      ? [errorCodeToCheck]
      : Object.keys(errorMessages).map(Number);
    if (codesToCheck.includes(error.response.status)) {
      if (
        typeof errorMessages === "object" &&
        errorMessages[error.response.status]
      )
        return errorMessages[error.response.status];
      else if (typeof errorMessages === "string") return errorMessages;
    } else if (error.response.status >= 500) return serverErrorMessage;
    return unknownErrorMessage;
  } else if (error instanceof Error) return error.message;
  return unknownErrorMessage;
};
