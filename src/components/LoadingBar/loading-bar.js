import "./loading-bar.scss";

function LoadingBar(args) {
  if (args.size == "large") {
    return (<div className="large-spinner"/>);
  
  } else if (args.size == "small") {
    return (<div className="small-spinner"/>);
  }
}
export default LoadingBar;