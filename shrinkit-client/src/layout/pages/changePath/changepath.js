import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Changepath() {
  const { path } = useParams();

  useEffect(() => {
    window.location.replace(`${process.env.REACT_APP_BASE_URL}/${path}`);
  }, []);

  return <div>Redirecting...</div>;
}
