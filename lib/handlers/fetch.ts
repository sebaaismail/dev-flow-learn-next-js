import { ActionResponse } from "@/types/global";
import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const startedAt = Date.now();
  logger.info(`fetchHandler - start request: ${url}`);
  const {
    timeout = 15000, // todo decrease to 5000 ms later in production
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }

    const duration = Date.now() - startedAt;
    logger.info(
      `fetchHandler - success: ${url} (${duration}ms) [${response.status}]`
    );
    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("An unknown error occurred");

    const duration = Date.now() - startedAt;
    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out after ${duration}ms`);
    } else {
      logger.error(
        `Fetch error for ${url} after ${duration}ms: ${error.message}`
      );
    }

    return handleError(error) as ActionResponse<T>;
  }
}
