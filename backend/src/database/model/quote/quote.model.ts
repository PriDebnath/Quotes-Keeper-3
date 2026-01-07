import type { quotes } from "@/src/database/schema/quote/quote.schema"

export type Quote = typeof quotes.$inferSelect

export type NewQuote = Omit<
    Quote,
    "id"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
    | "isDeleted"
>