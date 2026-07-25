export default function Button({
    text,
    onClick,
    className=""
}){

    return(

<button

onClick={onClick}

className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg ${className}`}

>

{text}

</button>

    )

}