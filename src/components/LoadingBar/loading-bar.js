import "./loading-bar.scss";

function LoadingBar(props) {
  if (props.size == "large") {
    return (<div className="large-spinner"/>);
  
  } else if (props.size == "small") {
    return (<div className="small-spinner"/>);
  }
}
export default LoadingBar;