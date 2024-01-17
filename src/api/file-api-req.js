/* eslint-disable import/no-unresolved */
import { ErrorHandle } from 'src/utils/handleErorrs';

import api from './index';
import { FILE } from './urls';

// auth api
export const fileApiReq = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: `${FILE.FILE}`,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['UPLOADFILE'],
      transformResponse: (res) => {
        localStorage.setItem('file', JSON.stringify(res.innerData));
        return res;
      },
      transformErrorResponse: (err) => ErrorHandle(err),
    }),
    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: `${FILE.FILES}`,
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['UPLOADFILES'],
      transformResponse: (res) => {
        localStorage.setItem('files', JSON.stringify(res.innerData));
        return res;
      },
      transformErrorResponse: (err) => ErrorHandle(err),
    }),
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `${FILE.DELETEFILE}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['DELETEFILE'],
      transformResponse: (res) => {
        localStorage.removeItem('file');
        return res;
      },
    }),
    deleteFiles: builder.mutation({
      query: (id) => ({
        url: `${FILE.DELETEFILES}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['DELETEFILES'],
      transformResponse: (res) => {
        localStorage.removeItem('files');
        return res;
      },
    }),
  }),
});

export const {
  useUploadFileMutation,
  useUploadFilesMutation,
  useDeleteFileMutation,
  useDeleteFilesMutation,
} = fileApiReq;
