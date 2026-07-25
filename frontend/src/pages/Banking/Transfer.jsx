export default function Transfer(){

return(

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">

Transfer Money

</h1>

<div className="bg-white shadow-xl rounded-xl p-8 w-[500px]">

<input
placeholder="Receiver Account"
className="border p-3 rounded-lg w-full mb-4"
/>

<input
placeholder="Amount"
className="border p-3 rounded-lg w-full mb-4"
/>

<button

className="bg-blue-600 text-white w-full rounded-lg p-3"

>

Transfer

</button>

</div>

</div>

);

}