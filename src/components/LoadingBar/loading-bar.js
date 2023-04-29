import "./loading-bar.scss";

function LoadingBar(args) {
  if (args.size == "large") {
    return (
      <div
        className="large-spinner"
        style={{marginTop: `${args.height ? args.height : 0}%`}}
      />
    );
  
  } else if (args.size == "small") {
    return (
      <div
        className="small-spinner"
        style={{marginTop: `${args.height ? args.height : 0}%`}}
      />
    );
  }
}
export default LoadingBar;