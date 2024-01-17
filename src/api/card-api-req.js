/* eslint-disable spaced-comment */
import { ErrorHandle } from 'src/utils/handleErorrs';
import { showUserMessage } from 'src/utils/showUserMessage';

import api from './index';
import { CARD } from './urls';

// auth api
export const cardApiReq = api.injectEndpoints({
  endpoints: (builder) => ({
    addCard: builder.mutation({
      query: (body) => ({
        url: `${CARD.ADDCARD}`,
        method: 'POST',
        body,
      }),
      onSuccess: (data) => data,
      transformErrorResponse: (err) => ErrorHandle(err),
      transformResponse: (res) => {
        showUserMessage(res);
        return res;
      },
      invalidatesTags: ['ADDCARD'],
    }),
    getAllCards: builder.query({
      query: (body) => ({
        url: `${CARD.GETALLCARD}`,
        body,
      }),
    }),
  }),
});

export const { useAddCardMutation, useGetAllCardsQuery } = cardApiReq;
