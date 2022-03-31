import InvoiceInput from "@components/top-level/invoice-input"
import { Item } from "@lib/stores/invoices-types"
import Image from "next/image"
import { Fragment } from "react"

type InvoiceItemListProps = { items: Item[], setItem: (value: Item[]) => void }
const InvoiceItemList: React.FC<InvoiceItemListProps> = ({ items, setItem }) => {
	const priceFormater = new Intl.NumberFormat( "en-GB", { minimumFractionDigits: 2 } )
	const updateItemValue = (itemIndex: number, key: keyof Item, value: any) => {
		items[itemIndex][key] = value as never
		setItem([...items])
	}

	const onDeleteItem = (index: number) => () => {
		if (items.length === 1) return
		const newItemsArr = items.filter((_, itemIndex) => itemIndex != index)
		setItem( newItemsArr )
	}

	return <div className="grid grid-cols-[1fr,46px,100px,repeat(2,max-content)] grid-flow-row gap-4 items-center">
		<p className="text-body-1 text-grey-300">Item Name</p>
		<p className="text-body-1 text-grey-300">Qty.</p>
		<p className="text-body-1 text-grey-300">Price</p>
		<p className="text-body-1 text-grey-300">Total</p>

		{items.map((item, index) => (<Fragment key={index}>
			<InvoiceInput 
				value={item.name} 
				onValueChange={(value) => updateItemValue(index, "name", value)} 
				className="col-start-1 col-end-2" 
			/>
			<InvoiceInput 
				value={item.qty} 
				type="number" 
				onValueChange={(value) => updateItemValue(index, "qty", value)} 
				className="col-start-2 col-end-3 !px-2 text-center" 
			/>
			<InvoiceInput 
				value={item.price} 
				type="number" 
				onValueChange={(value) => updateItemValue(index, "price", value)} 
				className="col-start-3 col-end-4" 
			/>
			<p className="text-body-1 text-grey-300">{priceFormater.format( item.qty * item.price )}</p>
			<button type="button" onClick={onDeleteItem(index)}>
				<Image layout="fixed"width="13px" height="16px" src="/icon-delete.svg" alt="bin" />
			</button>
		</Fragment>))}
	</div>
}

export default InvoiceItemList
