import { MouseEventHandler } from "react"

type ButtonProps = { onClick?: MouseEventHandler<HTMLButtonElement>, className?: string, type?: "button" | "submit" }
const Button: React.FC<ButtonProps> = ({ children, onClick, className, type="button" }) => {
	return <button 
		type={type}
		className={`px-6 py-4 rounded-full ${className ?? ''}`} 
		onClick={onClick}
	>
		{ children }
	</button>
}

export default Button
