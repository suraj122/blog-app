import { useParams, useNavigate, useLocation } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    let params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return <Component params={params} {...props} {...{ navigate, location }} />;
  };
  return Wrapper;
};
