import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Container } from '@mui/material';

import { RHFTextField } from 'src/components/hook-form';

import DynamicForm from './dynamicForm';

const schema = yup
  .object()
  .shape({
    vacancyName: yup
      .string()
      .required('Илтимос Вакансияга исм беринг')
      .min(5, 'Алифбо сони 5 та дан кам бўлмаслиги керак')
      .max(30, 'Алифбо сони 30 та дан ошмаслиги керак'),
    experience: yup
      .string()
      .required('Илтимос Иш тажрибаси қанчалигини ёзинг хеч бўлмаса керак эмас деб ёзинг')
      .min(5, 'Алифбо сони 5 та дан кам бўлмаслиги керак')
      .max(30, 'Алифбо сони 30 та дан ошмаслиги керак'),
    responsibility: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            value: yup
              .string()
              .required(
                'Илтимос хеч бўлмаса 1 та масуляти хақида ёзинг, ёки масулят керак эмас деб'
              ),
          })
      ),
    requirement: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            value: yup
              .string()
              .required('Илтимос хеч бўлмаса 1 та талаблар хақида ёзинг, ёки талабларимиз йоқ деб'),
          })
      ),
    condition: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            value: yup
              .string()
              .required('Илтимос хеч бўлмаса 1 та шарт хақида ёзинг, ёки шартимиз йоқ деб'),
          })
      ),
  })
  .required();

export default function Form() {
  const methods = useForm({
    defaultValues: {
      vacancyName: '',
      experience: '',
      responsibility: [],
      requirement: [],
      condition: [],
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    // reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: '10px',
          padding: '5%',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0;',
        }}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <RHFTextField name="vacancyName" label="Махсулот Исми" />
            <RHFTextField name="experience" label="Иш Тажрибаси" />
            <DynamicForm propertyName="responsibility" typography="Масулиятлари Хақида" />
            <DynamicForm propertyName="requirement" typography="Талабари Хақида" />
            <DynamicForm propertyName="condition" typography="Шартлари Хақида" />
            <LoadingButton
              type="submit"
              variant="contained"
              fullwidth="true"
              // loading={result.isLoading}
              size="large"
              color="success"
              disabled={isSubmitting}
              loadingPosition="center"
            >
              Сақлаш
            </LoadingButton>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
}
