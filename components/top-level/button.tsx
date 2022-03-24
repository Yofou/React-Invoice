import { MouseEventHandler } from "react"

type ButtonProps = { onClick?: MouseEventHandler<HTMLButtonElement>, className?: string }
const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
	return <button className={`${className ?? ''}`} onClick={onClick}>{ children }</button>
}

export default Button
