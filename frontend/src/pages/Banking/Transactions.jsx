const transactions=[

{name:"John",amount:"$200",status:"Completed"},

{name:"Alice",amount:"$450",status:"Completed"},

{name:"Bob",amount:"$120",status:"Pending"}

];

export default function Transactions(){

return(

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">

Transactions

</h1>

<table className="w-full bg-white shadow rounded-lg">

<thead>

<tr className="bg-blue-600 text-white">

<th>Name</th>

<th>Amount</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

transactions.map((t,index)=>(

<tr key={index} className="text-center border">

<td>{t.name}</td>

<td>{t.amount}</td>

<td>{t.status}</td>

</tr>

))

}

</tbody>

</table>

</div>

);

}