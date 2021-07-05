import React from "react";
import "./style.scss";

interface Props {}

const ContentCenteredLayout: React.FC<Props> = ({ children }) => {
  return <div className="content-centered-layout">{children}</div>;
};

export default ContentCenteredLayout;
