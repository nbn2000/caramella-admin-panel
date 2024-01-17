import { ErrorHandle } from 'src/utils/handleErorrs';
import { showUserMessage } from 'src/utils/showUserMessage';

import api from './index';
import { AUTH } from './urls';

// auth api
export const authApiReq = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `${AUTH.LOGIN}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : ['LOGIN']),
      transformErrorResponse: (err) => ErrorHandle(err),
      transformResponse: (res) => {
        localStorage.setItem('token', JSON.stringify(res.innerData.token));
        showUserMessage(res);
        return res;
      },
    }),
  }),
});

export const { useLoginMutation } = authApiReq;
