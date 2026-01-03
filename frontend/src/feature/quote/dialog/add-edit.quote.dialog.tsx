import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Quote } from "@/model/quote.model"
import { Textarea } from "@/components/ui/textarea"
import { useState, type Dispatch, type SetStateAction } from "react"

interface Props {
  open: boolean;
  mode: "add" | "edit";
  quote: Quote | null;
  handleSubmit: (quote: Quote)=> void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddEditQuoteDialog(props: Props) {

  const { quote, mode, open, setOpen, handleSubmit } = props
  let [quoteData, setQuoteData] = useState<Quote | null>(quote)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={()=>handleSubmit(quoteData!)}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Add Quote</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {mode == "add" ? "Add " : "Edit "}
              Quote
            </DialogTitle>
            <DialogDescription>
              {
                mode == "add"
                  ? "Add a new quote to your collection."
                  : "Edit the quote details below."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Quote</Label>
              <Textarea id="name-1" name="name" defaultValue={quote && quote.text || ""}
              onChange={(text)=>{
                let textValue = (text.target as HTMLTextAreaElement).value

                console.log({text, textValue})

                setQuoteData({
                  ...quoteData,
                  id: quoteData ? quoteData.id : performance.now(),
                  text: textValue
                })
              }} />
            </div>
          </div>
          <DialogFooter>
            {/* <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose> */}
            <Button type="submit" onClick={()=>handleSubmit(quoteData!)}>Add Quote</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
