/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Stack, Button, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
import { RHFTextField } from 'src/components/hook-form';

export default function DynamicForm() {
  const { control } = useFormContext();

  const {
    fields: properties,
    append: appendProperty,
    remove: removeProperty,
  } = useFieldArray({
    control,
    name: 'property',
  });

  useEffect(() => {
    if (properties.length === 0) {
      appendProperty({
        value: '',
      });
    }
  }, [appendProperty, properties]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: '#edeff1',
        borderRadius: '10px',
        padding: '5%',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0;',
      }}
    >
      <Typography variant="h4" color="primary">
        Асосий Ингридиентлар
      </Typography>
      {[...properties].map((property, propertyIndex) => (
        <Stack
          spacing={5}
          direction="column"
          key={property.id}
          sx={{
            bgcolor: 'white',
            borderRadius: '10px',
            padding: '5%',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0;',
            margin: '10px',
          }}
        >
          <RHFTextField
            name={`property.${propertyIndex}.value`} // Use 'property' instead of 'properties'
            label="Қатор"
            fullWidth
          />
          {propertyIndex > 0 && (
            <Button
              variant="contained"
              size="large"
              color="error"
              id="remove-property"
              onClick={() => removeProperty(propertyIndex)}
            >
              <Iconify icon="bi:trash-fill" />
            </Button>
          )}
        </Stack>
      ))}
      <Button
        variant="contained"
        id="add-property"
        onClick={() => {
          appendProperty({
            value: '', // Use 'value' instead of 'property'
          });
        }}
        fullWidth
        size="large"
        color="secondary"
        sx={{ margin: '10px' }}
      >
        <Iconify icon="zondicons:add-solid" />
      </Button>
    </Container>
  );
}
