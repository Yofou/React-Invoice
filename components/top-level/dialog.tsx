type DialogProps = { isOpen: boolean }
const Dialog: React.FC<DialogProps> = ({ children, isOpen }) => {
	if (isOpen === false) return <></>

	return <div className="fixed z-10 grid w-full h-full top-0 left-0 bg-black-full/50">
		{children}
	</div>
}

export default Dialog
