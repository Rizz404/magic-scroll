import { useSearchStudyByName } from "@/services/study";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TestStudyPage = () => {
  const location = useLocation();

  const { studies, query, setQuery, isLoadingStudies, isErrorStudies, errorStudies } =
    useSearchStudyByName({ page: 1, limit: 10 });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get("search");
    if (searchQuery) {
      setQuery(searchQuery);
    }

    console.log(query.length === 0 ? "asw" : query);
  }, [location, query, setQuery]);
  return (
    <div>
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
    </div>
  );
};
export default TestStudyPage;
