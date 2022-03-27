type DialogProps = { isOpen: boolean, zIndex?: number }
const Dialog: React.FC<DialogProps> = ({ children, isOpen, zIndex=10 }) => {
	if (isOpen === false) return <></>

	return <div className="fixed grid w-full h-full top-0 left-0 bg-black-full/50" style={{ zIndex }}>
		{children}
	</div>
}

export default Dialog
