import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getStrokeColor = (path: string) => {
    return location.pathname.includes(path) ? "black" : "#9E9E9E";
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        bottom: "0",
        padding: "20px 50px",
        backgroundColor: "#ECECEC",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        onClick={() => navigate("/shortform")}
      >
        <path
          d="M14 5L19 3V13L14 11M2 1.5H13C13.5523 1.5 14 1.94772 14 2.5V13.5C14 14.0523 13.5523 14.5 13 14.5H2C1.44772 14.5 1 14.0523 1 13.5V2.5C1 1.94772 1.44772 1.5 2 1.5Z"
          stroke={getStrokeColor("/shotform")}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        onClick={() => navigate("/search")}
        style={{
          stroke: getStrokeColor("/search") || getStrokeColor("/category"),
        }}
      >
        <path
          d="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z"
          stroke="#9E9E9E"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="22"
        viewBox="0 0 23 22"
        fill="none"
        onClick={() => navigate("/home")}
        style={{ stroke: getStrokeColor("/home") }}
      >
        <path
          d="M3.83398 9.16667L11.5007 2.75L19.1673 9.16667L19.1673 18.3333H14.3757V14.6667C14.3757 13.9373 14.0728 13.2378 13.5336 12.7221C12.9944 12.2064 12.2632 11.9167 11.5007 11.9167C10.7382 11.9167 10.0069 12.2064 9.46772 12.7221C8.92856 13.2378 8.62565 13.9373 8.62565 14.6667V18.3333H3.83399L3.83398 9.16667Z"
          stroke="#9E9E9E"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="23"
        viewBox="0 0 25 23"
        fill="none"
        onClick={() => navigate("/community")}
        style={{ stroke: getStrokeColor("/community") }}
      >
        <path
          d="M16.666 9.58331H16.6764M12.4993 9.58331H12.5098M8.33268 9.58331H8.3431M7.29102 15.3333V20.125L12.4993 15.3333H20.8327V3.83331H4.16602V15.3333H7.29102Z"
          stroke="#9E9E9E"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        onClick={() => navigate("/mypage")}
        style={{ stroke: getStrokeColor("/mypage") }}
      >
        <path
          d="M17.25 17.9288C17.25 16.3765 16.1271 14.375 14.375 14.375H8.625C6.8729 14.375 5.75 16.3765 5.75 17.9288M2.875 11.5C2.875 6.73654 6.73654 2.875 11.5 2.875C16.2635 2.875 20.125 6.73654 20.125 11.5C20.125 16.2635 16.2635 20.125 11.5 20.125C6.73654 20.125 2.875 16.2635 2.875 11.5ZM14.375 8.625C14.375 10.2128 13.0878 11.5 11.5 11.5C9.91218 11.5 8.625 10.2128 8.625 8.625C8.625 7.03718 9.91218 5.75 11.5 5.75C13.0878 5.75 14.375 7.03718 14.375 8.625Z"
          stroke="#9E9E9E"
          stroke-width="1.5"
        />
      </svg>
    </div>
  );
};

export default NavBar;
