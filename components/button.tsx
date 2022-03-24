import { MouseEventHandler } from "react"

type ButtonProps = {
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}
const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	return <button className={`text-purple-600 ${className}`} onClick={onClick}>{ children }</button>
}

export default Button
