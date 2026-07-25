export default function Input({

  label,

  type = "text",

  placeholder,

  value,

  onChange,

  name,

}) {
  return (

    <div className="mb-5">

      <label className="block mb-2 font-semibold">

        {label}

      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />

    </div>

  );
}