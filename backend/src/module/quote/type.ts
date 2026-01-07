import { t } from "elysia"

export const createQuoteSchema = t.Object({
    text: t.String(),
})