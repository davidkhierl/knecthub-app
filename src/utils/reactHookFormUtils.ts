import { AxiosError } from 'axios';
import { ErrorOption } from 'react-hook-form';
import { ResponseError } from 'services/api';

/**
 * Map response error to react hook form.
 * @param error Api error response.
 * @param setError react-hook-form setError method.
 */
export function mapServerErrors(
  error: AxiosError<ResponseError[]>,
  setError: (name: string, error: ErrorOption) => void
) {
  error.response?.data.forEach((error) => {
    if (error.param) setError(error.param, { type: 'server', message: error.message });
  });
}
