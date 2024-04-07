import { useSearchStudyByName } from "@/services/study";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const navigate = useNavigate();
  const { query, setQuery, studies, isLoadingStudies, isErrorStudies, errorStudies } =
    useSearchStudyByName({});

  const handleClickSearch = () => {
    navigate(`/test-studies/search?=${query}`);
  };

  console.log(studies);

  return (
    <>
      <form>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className=" input input-bordered"
        />
        <button
          type="button"
          onClick={handleClickSearch}
          className=" btn btn-secondary"
          disabled={isLoadingStudies || query.length === 0}>
          Search
        </button>
      </form>

      {isLoadingStudies ? (
        <div>Loading</div>
      ) : isErrorStudies ? (
        <div>Error {errorStudies?.message}</div>
      ) : (
        <ul>
          {studies &&
            studies.length > 0 &&
            studies.map((study) => <li key={study.id}>{study.name}</li>)}
        </ul>
      )}
    </>
  );
};
export default TestPage;
