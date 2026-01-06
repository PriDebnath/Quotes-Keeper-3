import { Elysia } from 'elysia'

export const quote = new Elysia({ prefix: '/quote' })
    .get(
        '/',
        async ({ body, cookie: { session } }) => {
            const response = {
                message: 'Hello The Quotes Keeper World'
            }
            return response
        }, {
        // body: AuthModel.signInBody,
        response: {
        }
    }
    )