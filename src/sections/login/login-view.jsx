import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { useLoginMutation } from 'src/api/auth-api-req';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const [login] = useLoginMutation();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    await login(e)
      .unwrap()
      .then((res) => {
        router.push('/');
      });
  };

  const renderForm = (
    <form onSubmit={handleSubmit((e) => onSubmit(e))}>
      <Stack spacing={3}>
        <TextField type="text" {...register('login')} label="Логин" />

        <TextField
          {...register('password')}
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        loading={false}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        style={{ marginTop: '20px' }}
      >
        Кириш
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Админ Панелга Кириш</Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Логин
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
