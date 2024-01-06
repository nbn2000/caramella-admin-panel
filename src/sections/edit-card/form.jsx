/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-extraneous-dependencies */
import * as yup from 'yup';
import React, { useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { Box, Container, Typography } from '@mui/material';

import { products } from 'src/_mock/products';
import { useUserCardMutation } from 'src/api/dynamic-api-req';

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
  const { id } = useParams();
  const product = products?.filter((i) => i.id === id)[0] || null;
  const navigate = useNavigate();
  const checkProduct = products?.find((i) => i.id === id);
  const [userCard, result] = useUserCardMutation();
  React.useEffect(() => {
    if (!checkProduct) {
      navigate('/404');
    }
  }, [checkProduct, navigate]);
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
  useEffect(() => {
    reset({
      name: product?.name,
      description: product?.description,
      category: product?.category,
      price: product?.price,
      file: `${product?.cover}`,
      files: [`${product?.cover}`],
      property: product?.property,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    console.log(data);
    await userCard({ id, body: data })
      .unwrap()
      .then((res) => {
        console.log(res);
      });
    reset();
    navigate('/products');
  };
  if (checkProduct) {
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
              <RHFuploadImage
                name="file"
                multiple={{ multiple: false }}
                showFiles={{ showFiles: true }}
              />
              <Typography variant="h4" fontSize={12} align="center">
                Қолган Расмлари
              </Typography>
              <RHFuploadImage
                name="files"
                multiple={{ multiple: true }}
                showFiles={{ showFiles: true }}
              />
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
}
