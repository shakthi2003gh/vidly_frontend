import "font-awesome/css/font-awesome.css";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  classes += liked ? "" : "-o";

  return (
    <i
      onClick={onClick}
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
