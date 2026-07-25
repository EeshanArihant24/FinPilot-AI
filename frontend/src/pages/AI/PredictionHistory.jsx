const history=[

{
amount:500,
prediction:"Safe",
confidence:"96%"
},

{
amount:2500,
prediction:"Fraud",
confidence:"99%"
}

];

export default function PredictionHistory(){

return(

<div>

<h1 className="text-3xl font-bold mb-8">

Prediction History

</h1>

<table className="w-full bg-white rounded shadow">

<thead>

<tr className="bg-blue-600 text-white">

<th>Amount</th>

<th>Prediction</th>

<th>Confidence</th>

</tr>

</thead>

<tbody>

{

history.map((h,index)=>(

<tr key={index} className="text-center border">

<td>${h.amount}</td>

<td>{h.prediction}</td>

<td>{h.confidence}</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}