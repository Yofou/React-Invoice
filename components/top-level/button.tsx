import { MouseEventHandler } from "react";

type ButtonProps = {
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	type?: "button" | "submit";
};
const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	className,
	type = "button",
	disabled = false,
}) => {
	return (
		<button
			type={type}
			className={`rounded-full px-6 py-4 ${className ?? ""}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
