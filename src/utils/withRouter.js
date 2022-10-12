import { useParams } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    let params = useParams();
    return <Component params={params} {...props} />;
  };
  return Wrapper;
};
