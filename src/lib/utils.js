import LogoRenderer from "../components/LogoRenderer";

const formatNumber = (params) => {
  if (params.value < 10) {
    return "0" + params.value.toLocaleString();
  } else {
    return params.value.toLocaleString();
  }
};

const formatCountry = (params) => {
  const p = params.value.split(",");
  if (p[1] === " United States") {
    p[1] = "USA";
  }
  return p[0] + ", " + p[1];
};

const contains = (target, lookingFor) => {
  return target && target.indexOf(lookingFor) >= 0;
};

let filterParams = {
  filterOptions: ["contains"],
  textMatcher: ({ value, filterText }) => {
    let literalMatch = contains(value, filterText || "");
    return !!literalMatch;
  },
  trimInput: true,
  debounceMs: 1000,
};

export const rowHeight = () => {
  return 50;
};

export const columnDefs = [
  {
    headerName: "ID",
    field: "id",
    valueFormatter: formatNumber,
    maxWidth: 50,
    headerTooltip: "ID of an employee",
    cellDataType: "number",
  },
  {
    field: "image",
    cellRenderer: LogoRenderer,
    minWidth: 75,
    maxWidth: 80,
    headerTooltip: "Icon of an employee",
    cellDataType: "object",
  },
  {
    headerName: "Full Name",
    valueGetter: (p) =>
      `${p.data.firstName} ${p.data.maidenName} ${p.data.lastName}`,
    headerTooltip: "Full Name of an employee",
    filter: "agTextColumnFilter",
    filterParams: filterParams,
    minWidth: 225,
    cellDataType: "text",
  },
  {
    headerName: "Demography",
    headerTooltip: "Gender/Age of an employee",
    valueGetter: (p) =>
      `${p.data.gender.charAt(0).toUpperCase()}/${p.data.age}`,
    cellDataType: "text",
  },
  {
    headerName: "Designation",
    valueGetter: (p) => `${p.data.company.title}`,
    headerTooltip: "Designation of an employee",
    filter: "agTextColumnFilter",
    filterParams: filterParams,
    minWidth: 225,
    cellDataType: "text",
  },
  {
    headerName: "Location",
    headerTooltip: "Location of an employee",
    valueGetter: (p) => `${p.data.address.state}, ${p.data.address.country}`,
    valueFormatter: formatCountry,
    filter: "agTextColumnFilter",
    filterParams: filterParams,
    minWidth: 225,
    cellDataType: "text",
  },
  {
    headerName: "Height (in cm)",
    headerTooltip: "Height(in cm) of an employee",
    valueGetter: (p) => `${Math.ceil(p.data.height)}`,
    maxWidth: 175,
    filter: "agNumberColumnFilter",
    filterParams: {
      debounceMs: 1000,
      filterOptions: ["greaterThan", "lessThan", "inRange"],
    },
    cellDataType: "text",
  },
  {
    headerName: "Weight (in kg)",
    headerTooltip: "Weight(in cm) of an employee",
    valueGetter: (p) => `${Math.ceil(p.data.weight)}`,
    maxWidth: 175,
    filter: "agNumberColumnFilter",
    filterParams: {
      debounceMs: 1000,
      filterOptions: ["greaterThan", "lessThan", "inRange"],
    },
    cellDataType: "text",
  },
];
