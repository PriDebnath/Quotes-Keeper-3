import { db } from '@/src/database'
import { table } from '@/src/database/schema/quote/quote.schema'
import type { NewQuote, Quote } from '@/src/database/model/quote/quote.model'

class QuoteService {    
    async getQuotes(): Promise<Quote[]> {
        const quotes = await db.select().from(table.quotes)
        return quotes
    }
    async createQuote(quote: NewQuote): Promise<Quote> {
        const newQuote = await db.insert(table.quotes).values({
            text: quote.text,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning()
        return newQuote[0]
    }
}

export const quoteService = new QuoteService()