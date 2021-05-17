import { AxiosError } from 'axios';
import { ErrorOption } from 'react-hook-form';

/**
 * Map response error to react hook form.
 * @param error Api error response.
 * @param setError react-hook-form setError method.
 */
function mapApiResponseErrors(
  error: AxiosError<StandardErrorResponse>,
  setError: (name: any, error: ErrorOption) => void
) {
  error.response?.data.errors.forEach((error) => {
    if (error.param) setError(error.param, { type: 'server', message: error.message });
  });
}

export default mapApiResponseErrors;
