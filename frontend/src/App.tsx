import './App.css'
import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import type { Quote } from './model/quote.model'
import { ListQuote } from './feature/quote/list.quote'
import AddEditQuoteDialog from '@/feature/quote/dialog/add-edit.quote.dialog'

let quotesMock = [
  {
    id: 1,
    text: "Q 1"
  },
  {
    id: 2,
    text: "Q 2"
  }
]

function App() {

  const [openDialog, setOpenDialog] = useState(false)
  const [addOrEdit, setAddOrEdit] = useState<"add" | "edit">("add")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [quotes, setQuotes] = useState<Quote[]>(quotesMock)

  const openAddDialog = () => {
    setSelectedQuote(null)
    setAddOrEdit("add")
    setOpenDialog(true)
  }

  const addQuote = (quote: Quote) => {
    setQuotes([...quotes, quote])
  }


  const openEditDialog = (quote: Quote) => {
    setSelectedQuote(quote)
    setAddOrEdit("edit")
    setOpenDialog(true)
  }

  const handleSubmit = (quote: Quote) => {
    console.log(quote)
    let editedQuote = quotes.find((quote) => quote.id == quote.id)
    let editedQuoteIndex = quotes.indexOf(editedQuote!)
    quotes[editedQuoteIndex] = quote
    let newQuotes = quotes
    setQuotes(newQuotes)
    setOpenDialog(false)
  }

  const openEditDeleteDialog = (quote: Quote) => {

  }

  return (
    <main>
      <div className="flex gap-4">
        <h3>List Quote</h3>
        <Button onClick={openAddDialog} > <PlusIcon /> Add Quote </Button>
      </div>

      <ListQuote quotes={quotes} onEdit={openEditDialog} onDelete={openEditDeleteDialog} />

      <AddEditQuoteDialog
        mode={addOrEdit}
        quote={selectedQuote}
        open={openDialog}
        setOpen={setOpenDialog}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default App
