import { Elysia, t } from 'elysia'
import { quoteService } from '@/src/module/quote/service'
import { createQuoteSchema, getQuoteSchema, updateQuoteSchema } from '@/src/module/quote/type'

export const quote = new Elysia({ prefix: '/quote' })
    .get(
        '/:id',
        async ({ params, cookie: { session } }) => {
            const response = await quoteService.getQuote(params.id)
            return response
        }, {
        params: getQuoteSchema,
        detail: {
            summary: 'Get a quote by id',
            description: 'Get a quote by id',
            tags: ['quote'],
        }
    }
    )
    .patch(
        '/:id',
        async ({ params, body, cookie: { session } }) => {
            const response = await quoteService.updateQuote(params.id, body.text)
            return response
        }, {
        params: getQuoteSchema,
        body: updateQuoteSchema,
        detail: {
            summary: 'Update a quote by id',
            description: 'Update a quote by id',
            tags: ['quote'],
        }
    })
    .get("/", async ({ cookie: { session } }) => {
        const response = await quoteService.getQuotes()
        return response
    }, {
        detail: {
            summary: 'Get all quotes',
            description: 'Get all quotes',
            tags: ['quote'],
        }
    })
    .post(
        '/',
        async ({ body, cookie: { session } }) => {
            const response = await quoteService.createQuote({
                text: body.text,
            })
            return response
        }, {
        body: createQuoteSchema,
        detail: {
            summary: 'Create a new quote',
            description: 'Create a new quote',
            tags: ['quote'],
        }
    }
    )