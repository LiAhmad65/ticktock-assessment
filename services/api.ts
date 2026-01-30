/**
 * API Service
 * Centralized fetch function for making API requests
 */

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

/**
 * Main fetch function for API requests
 * Handles request/response transformation, error handling, and authentication
 */
async function apiRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', headers = {}, body, params } = options;

  // Build URL with query parameters
  let finalUrl = url;
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    finalUrl = `${url}?${searchParams.toString()}`;
  }

  // Default headers
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge headers
  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  // Prepare request config
  const config: RequestInit = {
    method,
    headers: mergedHeaders,
  };

  // Add body for POST, PUT, PATCH requests
  if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(finalUrl, config);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { data: null as T };
    }

    const data = await response.json();

    // Handle error responses
    if (!response.ok) {
      return {
        data: null as T,
        error: data.message || data.error || `HTTP error! status: ${response.status}`,
      };
    }

    return {
      data: data.data || data,
      message: data.message,
    };
  } catch (error) {
    // Handle network errors
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred';

    return {
      data: null as T,
      error: errorMessage,
    };
  }
}

/**
 * Convenience methods for different HTTP methods
 */
export const api = {
  get: <T>(url: string, params?: RequestOptions['params']) =>
    apiRequest<T>(url, { method: 'GET', params }),

  post: <T>(url: string, body?: unknown) =>
    apiRequest<T>(url, { method: 'POST', body }),

  put: <T>(url: string, body?: unknown) =>
    apiRequest<T>(url, { method: 'PUT', body }),

  patch: <T>(url: string, body?: unknown) =>
    apiRequest<T>(url, { method: 'PATCH', body }),

  delete: <T>(url: string) =>
    apiRequest<T>(url, { method: 'DELETE' }),
};

export default api;
