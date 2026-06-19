import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { }

export function Button({ ...props }: IProps) {
    return (
        <button 
        {...props} 
        className={`transition-all duration-200 w-full bg-[#03738C] hover:bg-[#00BC99] text-white py-2 px-4 rounded-md cursor-pointer `.concat(props?.className || "")} />
    )
}