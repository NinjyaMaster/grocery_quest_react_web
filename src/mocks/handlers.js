// src/mocks/handlers.js
import { rest } from 'msw';
import { LOGIN_URL, REGISTER_URL, STORES_URL, BASE_URL } from '../constants/network';

const handlers = [
  // Handles a POST /login request
  // rest.post("http://localhost:8000/api/1.0/users", null),
  rest.post(`${BASE_URL}${LOGIN_URL}`, (req, res, ctx) => {
    const requestBody = req.body;
    return res(
      ctx.status(200),
      ctx.json({
        requestBody,
      })
    );
  }),

  // Handles a GET /user request
  rest.post(`${BASE_URL}${LOGIN_URL}`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        email: 'test@test.com',
        username: 'test',
        tokens: {
          access: 'tmp_accessToken',
          refresh: 'tmp_refresh_token',
        },
      })
    )
  ),

  rest.post(`${BASE_URL}${REGISTER_URL}`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        username: 'sample_username',
      })
    )
  ),

  rest.delete(`${BASE_URL}${STORES_URL}:storeId`, (req, res, ctx) => {
    const [storeId] = req.params;
    res(
      ctx.status(200),
      ctx.json({
        storeId,
      })
    );
  }),

  rest.patch(`${BASE_URL}${STORES_URL}:storeId`, (req, res, ctx) => {
    const [storeId] = req.params;
    res(
      ctx.status(200),
      ctx.json({
        id: storeId,
        name: 'Rite Aid',
        groceries: [
          {
            id: 34,
            is_completed: false,
            name: 'coq10',
            qty: 1,
            store_id: 44,
          },
          {
            id: 35,
            is_completed: false,
            name: 'teeth paste',
            qty: 1,
            store_id: 44,
          },
          {
            id: 36,
            is_completed: false,
            name: 'pants',
            qty: 1,
            store_id: 44,
          },
        ],
        is_completd: false,
      })
    );
  }),

  rest.get(`${BASE_URL}${STORES_URL}`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: 44,
          name: 'Rite Aid',
          groceries: [
            {
              id: 34,
              is_completed: false,
              name: 'coq10',
              qty: 1,
              store_id: 44,
            },
            {
              id: 35,
              is_completed: false,
              name: 'teeth paste',
              qty: 1,
              store_id: 44,
            },
          ],
          is_completd: false,
        },
        {
          id: 45,
          name: 'LuLuLemon',
          groceries: [
            {
              id: 36,
              is_completed: false,
              name: 'coq10',
              qty: 1,
              store_id: 45,
            },
            {
              id: 37,
              is_completed: false,
              name: 'teeth paste',
              qty: 1,
              store_id: 45,
            },
          ],
          is_completd: false,
        },
      ])
    )
  ),
];

export default handlers;
