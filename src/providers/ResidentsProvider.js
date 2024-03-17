import { createContext, useCallback, useContext, useState } from "react";

/**
 * Context for managing residents data and operations.
 * @typedef {Object} ResidentsContextType
 * @property {Array<{ name: string, validityDate: string }>} residents - The list of residents. The `validityDate` is in "yyyy-mm-dd" format.
 * @property {string} error - The error message for adding a resident.
 * @property {function} handleAddResident - Function to add a resident.
 * @property {function} setError - Function to set the error message.
 */

const ResidentsContext = createContext();

/**
 * Hook to access the ResidentsContext.
 * @returns {ResidentsContextType} The ResidentsContext object.
 */
export function useResidents() {
  return useContext(ResidentsContext);
}

export default function ResidentsProvider({ children }) {
  const [residents, setResidents] = useState([]);
  const [addResidentError, setAddResidentError] = useState("");

  const handleAddResident = useCallback((resident) => {
    setResidents((prev) => [...prev, resident]);
    setAddResidentError("");
  }, []);

  return (
    <ResidentsContext.Provider
      value={{
        residents,
        error: addResidentError,
        handleAddResident,
        setError: setAddResidentError,
      }}
    >
      {children}
    </ResidentsContext.Provider>
  );
}
