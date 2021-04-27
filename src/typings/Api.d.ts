interface ResponseError {
  location?: 'body' | 'cookies' | 'headers' | 'params' | 'query';
  message?: any;
  param?: string;
  value?: string;
  nestedErrors?: any;
}

interface StandardErrorResponse {
  message: string;
  success: boolean;
  errors: ResponseError[];
}

/**
 * Standard API Response.
 */
interface StandardResponse<T = any> {
  /**
   * Response data.
   */
  data: T;
  /**
   * Response errors.
   */
  errors?: ResponseError[];
  /**
   * Helpful response message.
   */
  message: string;
  /**
   * Optional redirect url hint.
   */
  redirectUrl?: string;
  /**
   * Response status.
   */
  success: boolean;
}

interface AuthSuccessResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
