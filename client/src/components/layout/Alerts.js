import React, { useContext } from "react";
import AlertCotext from "../../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertCotext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle">{alert.msg}</i>
      </div>
    ))
  );
};

export default Alerts;
