export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `flex items-center px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 hover:shadow-lg transition duration-300 ${
                    disabled && "opacity-25 cursor-not-allowed"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
