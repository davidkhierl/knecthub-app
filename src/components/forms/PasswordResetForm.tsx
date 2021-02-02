import * as yup from 'yup';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { authFailed, authSuccess, startAuth } from 'redux/authSlice';

import React from 'react';
import { mapServerErrors } from 'utils/reactHookFormUtils';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { usePasswordResetMutation } from 'services/password.services';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  confirmPassword: string;
  password: string;
};

const PasswordResetFormSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password'), null], 'Password must match.'),
  password: yup.string().required('Password is required.')
});

export interface PasswordResetFormProps {
  token: string;
}

const PasswordResetForm: React.VFC<PasswordResetFormProps> = ({ token }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  const { mutate, isLoading } = usePasswordResetMutation(token);

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    resolver: yupResolver(PasswordResetFormSchema)
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(startAuth());

    mutate(data, {
      onSuccess: (res) => {
        dispatch(authSuccess(res.data.data));
      },
      onError: (error) => {
        mapServerErrors(error, setError);
        dispatch(authFailed());
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid gap={2}>
        <FormControl id='password' isInvalid={errors.password?.message !== undefined}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name='password'
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              ref={register}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='confirmPassword' isInvalid={errors.confirmPassword?.message !== undefined}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name='confirmPassword'
            placeholder='Confirm Password'
            type='password'
            ref={register}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' mt={2} colorScheme='pink' isLoading={isLoading}>
          Reset Password
        </Button>
      </Grid>
    </form>
  );
};

export default PasswordResetForm;
