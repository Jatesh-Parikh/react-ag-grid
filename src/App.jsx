import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import { rowHeight, columnDefs } from "./lib/utils.js";

function App() {
  let limit = 300;
  let skip = 0;
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState(columnDefs);

  useEffect(() => {
    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => setRowData(data.users));
  }, []);

  return (
    <main
      className="ag-theme-quartz-auto-dark w-screen h-screen bg-gradient-to-r from-slate-900 via-slate-600 via-60%
     to-purple-500 flex flex-col"
    >
      <nav className="flex justify-between items-center py-4 px-2 min-w-[1400px] mx-auto">
        <svg
          id="logo-35"
          width="50"
          height="39"
          viewBox="0 0 50 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
            class="ccompli1"
            fill="#007AFF"
          ></path>
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            class="ccustom"
            fill="#312ECB"
          ></path>
        </svg>
        <div className="w-5 h-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
      </nav>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        getRowHeight={rowHeight}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 30]}
        cacheBlockSize={10}
        className="flex-grow flex-shrink basis-auto mx-auto min-w-[1400px]"
      />
    </main>
  );
}

export default App;
