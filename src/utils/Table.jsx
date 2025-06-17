const Table = ({ children, title, th }) => {
  return (
    <>
      <h1
        className="border border-slate-200 p-5 rounded-t-lg text-lg bg-slate-100 
        text-gray-700 uppercase font-semibold"
      >
        {title}
      </h1>
      <div className="border border-slate-200 p-2">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              {th.map((header, index) => (
                <th key={`header_${index}`} className="p-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
