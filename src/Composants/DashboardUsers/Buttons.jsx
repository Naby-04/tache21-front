export const Buttons = ({text , onClick }) => {
    return <button className="cursor-pointer" 
    onClick={onClick}>{text}</button>;
}