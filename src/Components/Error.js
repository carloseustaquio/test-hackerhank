import React from "react";
import { useResidents } from "../providers/ResidentsProvider";

function Error() {
  const { error } = useResidents();

  if (!error) return null;

  return (
    <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">
      {error}
    </div>
  );
}

export default Error;
