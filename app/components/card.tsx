import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

export function Card({ ...props }: IProps) {
    return (
        <div>
            {props?.title && (<div className="mb-2 flex flex-row items-center gap-2">
                <h3 className="font-bold text-gray-400 capitalize text-xs">{props.title}</h3>
                <div className="flex-1 h-px w-full bg-gray-400" />
            </div>)}
            <div
                {...props}
                className={"bg-white border-2 rounded-md p-4 border-none ".concat(props?.className || "")} />
        </div>
    )
}