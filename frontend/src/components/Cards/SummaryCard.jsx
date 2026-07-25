export default function SummaryCard({

title,
value,
icon

}){

return(

<div className="bg-white rounded-xl shadow-lg p-6">

<div className="text-3xl mb-4">

{icon}

</div>

<h2 className="text-lg font-semibold">

{title}

</h2>

<p className="text-3xl font-bold mt-3">

{value}

</p>

</div>

)

}