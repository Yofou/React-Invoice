import InvoiceInput from "@components/top-level/invoice-input";
import { Item } from "@lib/stores/invoices-types";
import Image from "next/image";
import { Fragment } from "react";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";

type InvoiceItemListProps = {
	items: FieldArrayWithId<{ items: Item[] }>[];
	itemsWatch: Item[];
	removeItem: (value: number) => void;
	register: UseFormRegister<any>;
	errors?: any;
};

const InvoiceItemList: React.FC<InvoiceItemListProps> = ({
	items,
	itemsWatch,
	removeItem,
	register,
	errors,
}) => {
	const priceFormater = new Intl.NumberFormat("en-GB", {
		minimumFractionDigits: 2,
	});

	const onDeleteItem = (index: number) => () => {
		if (items.length === 1) return;
		removeItem(index);
	};

	return (
		<div className="grid grid-flow-row-dense grid-cols-[64px,100px,56px,1fr] items-center gap-4 md:grid-flow-row md:grid-cols-[1fr,46px,100px,repeat(2,max-content)]">
			<p className="hidden text-grey-300 text-body-1 md:block">Item Name</p>
			<p className="hidden text-grey-300 text-body-1 md:block">Qty.</p>
			<p className="hidden text-grey-300 text-body-1 md:block">Price</p>
			<p className="hidden text-grey-300 text-body-1 md:block">Total</p>

			{items.map((item, index) => (
				<Fragment key={item.id}>
					<h2 className="col-start-1 col-end-[-1] mt-8 text-grey-300 text-body-1 first-of-type:mt-0 md:mt-0 md:hidden">
						Item Name
					</h2>
					<InvoiceInput
						value={item.name}
						register={register(`items.${index}.name` as const)}
						defaultValue={item.name}
						className="col-start-1 col-end-[-1] md:col-end-2"
					/>
					<p className="col-start-1 col-end-2 text-grey-300 text-body-1 md:hidden">
						Qty.
					</p>
					<InvoiceInput
						value={item.qty}
						type="number"
						register={register(`items.${index}.qty` as const, {
							valueAsNumber: true,
						})}
						defaultValue={item.qty}
						className="col-start-1 col-end-2 !px-2 text-center md:col-start-2 md:col-end-3"
					/>
					<p className="col-start-2 col-end-3 text-grey-300 text-body-1 md:hidden">
						Price.
					</p>
					<InvoiceInput
						value={item.price}
						type="number"
						register={register(`items.${index}.price` as const, {
							valueAsNumber: true,
						})}
						defaultValue={item.price}
						className="col-start-2 col-end-3 md:col-start-3 md:col-end-4"
					/>
					<p className="col-start-3 col-end-[-1] text-grey-300 text-body-1 md:hidden">
						Total.
					</p>
					<p className="col-start-3 col-end-4 text-grey-300 text-body-1 md:col-auto">
						{priceFormater.format(
							itemsWatch[index].qty * itemsWatch[index].price
						)}
					</p>
					<button
						className="relative justify-self-end md:justify-self-start"
						type="button"
						onClick={onDeleteItem(index)}
					>
						<Image
							layout="fixed"
							width="13px"
							height="16px"
							src="/icon-delete.svg"
							alt="bin"
						/>
					</button>
				</Fragment>
			))}
		</div>
	);
};

export default InvoiceItemList;
