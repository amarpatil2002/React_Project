import React from "react";
import ManageInventry from "./ManageInventry";
import { Link } from "lucide-react";

function LandingPages() {
  return (
    <div>
      LandingPages
      <Link to="/inventry">
        <span>Inventry</span>
      </Link>
    </div>
  );
}

export default LandingPages;
