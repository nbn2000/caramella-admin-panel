import React from 'react';
import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Container, Typography } from '@mui/material';

import { useAddCardMutation } from 'src/api/card-api-req';
import { useDeleteFileMutation, useDeleteFilesMutation } from 'src/api/file-api-req';

import { RHFSelect, RHFTextField, RHFuploadImage } from 'src/components/hook-form';

import DynamicForm from './dynamicForm';

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Илтимос Махсулотга исм беринг')
      .min(2, 'Алифбо сони 2 та дан кам бўлмаслиги керак')
      .max(30, 'Алифбо сони 30 та дан ошмаслиги керак'),
    description: yup
      .string()
      .required('Илтимос Махсулотни тасвирлаб беринг')
      .min(5, 'Алифбо сони 5 та дан кам бўлмаслиги керак'),
    category: yup.string().required('Илтимос махсулот тойфасини танланг'),
    price: yup.string().required('Илтимос махсулот нархини ёзинг'),
    property: yup.array().of(
      yup.object().shape({
        value: yup
          .string()
          .required(
            'Илтимос хеч бўлмаса 1 та махсулот ингридиентини ёзинг, ёки махсулот ингидиенти йоқ деб ёзинг'
          ),
      })
    ),
  })
  .required();

function InputPrice() {
  return <RHFTextField name="price" label="Нархи" type="number" />;
}
export default function Form() {
  const [deleteFile] = useDeleteFileMutation();
  const [deleteFiles] = useDeleteFilesMutation();
  const [addCard, result] = useAddCardMutation();
  // const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      file: '',
      files: [],
      property: [],
    },
    resolver: yupResolver(schema),
  });

  /* WHEN USER USES UPLOAD FILE INPUT IT SETS THE VALUE OF FILE AND FILIES 
  PROPERTIES IN THE USEFORM AND WHEN USER REFRESHES IT JUST RESETS 
  TO DEFAULT BUT DATA IN THE BACKEND STAYS THERE THATS WHY WE NEED 
  TO DELELE JUNKS FROM BACKEND TOO THEREFORE NEEDS THAT LOGIC IN THE USEEFFECT */
  React.useEffect(() => {
    const func = async () => {
      const ids = JSON.parse(localStorage.getItem('files'))?.id || null;
      const id = JSON.parse(localStorage.getItem('file'))?.id || null;
      if (id !== null) {
        await deleteFile({ id })
          .unwrap()
          .then((data) => console.log(data));
      }
      if (ids !== null) {
        await deleteFiles({ id: ids })
          .unwrap()
          .then((data) => console.log(data));
      }
    };
    func();
  }, [deleteFile, deleteFiles]);
  const {
    handleSubmit,
    // reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    await addCard(data)
      .unwrap()
      .then((res) => console.log(res));
    // reset();
    // navigate('/products');
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
            <RHFTextField name="name" label="Махсулот Исми" />
            <RHFTextField name="description" label="Махсулот Хақида" minRows={3} multiline />
            <RHFSelect
              name="category"
              label="Махсулот Тоифаси"
              options={[
                { label: 'Тўй Тўртлари', value: 'weddingCake' },
                { label: 'Макаронлар', value: 'macarons' },
                { label: 'Бисквитлар', value: 'biscuits' },
                { label: 'Буйуртма Асосида', value: 'customCake' },
                { label: 'Кекслар', value: 'cupcake' },
                { label: 'Тўғилган кун тўртлари', value: 'birthdayCake' },
              ]}
            />
            <NumericFormat thousandSeparator customInput={InputPrice} />
            <DynamicForm />
            <Typography variant="h4" fontSize={12} align="center">
              Асосий Расми
            </Typography>
            <RHFuploadImage name="file" multiple={{ multiple: false }} />
            <Typography variant="h4" fontSize={12} align="center">
              Қолган Расмлари
            </Typography>
            <RHFuploadImage name="files" multiple={{ multiple: true }} />
            <LoadingButton
              type="submit"
              variant="contained"
              fullwidth="true"
              loading={result.isLoading}
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
