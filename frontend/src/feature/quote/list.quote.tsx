import { PenIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Quote } from "@/model/quote.model"


interface Props {
  quotes: Quote[];
  onEdit:(quote: Quote) => void
  onDelete:(quote: Quote) => void
}


export function ListQuote(props: Props) {
  let { quotes, onEdit, onDelete } = props

  return (
    <div>
      {
        (quotes && quotes?.length > 0) && (
          <div className="flex flex-col gap-4">
            {quotes.map((q) => {
              return (
                <div key={q.id + q.text.slice(0, 5)} 
                className=" px-4 py-2 flex items-center justify-between border border-grey-200">
                  <p>{q.text}</p>
                  <Button onClick={()=>onEdit(q)}>
                    <PenIcon/>
                  </Button>
                </div>
              )
            })}
          </div>
        )
      }
    </div>
  )
}