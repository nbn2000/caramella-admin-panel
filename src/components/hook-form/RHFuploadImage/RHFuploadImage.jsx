import propTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Container, Typography } from '@mui/material';

import { useUploadFileMutation, useUploadFilesMutation } from 'src/api/file-api-req';

import Iconify from 'src/components/iconify';

import { PreviewImage } from './PreviewImage';

export const RHFuploadImage = ({ multiple, name }) => {
  const [uploadFile] = useUploadFileMutation();
  const [uploadFiles] = useUploadFilesMutation();
  const [loading, setLoading] = useState({ files: false, file: false });
  const {
    control,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = async (event) => {
    const formData = new FormData();

    const { files } = event.target;

    const invalidFiles = Array.from(files).some(
      (file) =>
        !file?.type?.startsWith('image/') || !['image/png', 'image/jpeg'].includes(file.type)
    );

    if (invalidFiles) {
      setError(name, {
        type: 'manual',
        message:
          'Файл тури яроқсиз, Илтимос фақат шу (PNG, JPEG) расм форматдаги файларни танланг.',
      });
      return null;
    }

    if (multiple.multiple) {
      setSelectedFiles([...files]);
      [...files].map((i) => formData.append('files', i));
      setLoading({ file: loading.file, files: true });
      const id = JSON.parse(localStorage.getItem('files'))?.id || null;
      if (id !== null) formData.append('id', id);
      await uploadFiles(formData)
        .unwrap()
        .then((data) => {
          setValue('files', data.innerData.url);
          setLoading({ file: loading.file, files: false });
        });
    } else {
      setSelectedFiles([files[0]]);
      const id = JSON.parse(localStorage.getItem('file'))?.id || null;
      if (id !== null) formData.append('id', id);
      formData.append('file', files[0]);
      setLoading({ file: true, files: loading.files });
      await uploadFile(formData)
        .unwrap()
        .then((data) => {
          setValue('file', data.innerData.url);
          setLoading({ file: false, files: loading.files });
        });
    }
    return true;
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Container
          sx={{
            boxShadow:
              'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          {errors.files && <Typography color="red">{errors.files.message}</Typography>}
          <LoadingButton
            type="button"
            variant="contained"
            component="label"
            loading={(loading.file && loading.file) || (loading.files && loading.files)}
            sx={{ width: '100%' }}
          >
            <input
              id="files"
              name="files"
              type="file"
              multiple={multiple.multiple ?? false}
              accept="image/x-png, image/jpeg"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            Расм Жойлаш
            <Iconify icon="ph:upload-fill" />
          </LoadingButton>
          <PreviewImage watch={watch} selectedFiles={selectedFiles} name={name} />
        </Container>
      )}
    />
  );
};

RHFuploadImage.propTypes = {
  multiple: propTypes.object.isRequired,
  name: propTypes.string.isRequired,
};
