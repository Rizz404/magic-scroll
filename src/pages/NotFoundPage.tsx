import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      // * Cara liat page itu pake window.history
      navigate(-1);
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <h1>Not found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={handleGoBack}>Go back to previous page</button>
    </div>
  );
};
export default NotFoundPage;
