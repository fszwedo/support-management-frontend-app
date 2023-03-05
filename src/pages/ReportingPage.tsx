import { useState, useEffect } from "react";
import Reporting from "../components/Reporting/Reporting";

const ReportingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <Reporting />
    </div>
  );
};

export default ReportingPage;
