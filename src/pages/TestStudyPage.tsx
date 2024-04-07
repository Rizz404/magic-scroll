import { useSearchStudyByName } from "@/services/study";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const TestStudyPage = () => {
  const { search } = useParams();

  const { studies, query, setQuery, isLoadingStudies, isErrorStudies, errorStudies } =
    useSearchStudyByName({ page: 1, limit: 10 });

  useEffect(() => {
    if (search) {
      setQuery(search)
    }
  }, [search, setQuery])



  console.log(studies)
  return (
    <div>
      {isLoadingStudies ? (
        <div>Loading</div>
      ) : isErrorStudies ? (
        <div>Error {errorStudies?.message}</div>
      ) : (
        <ul>
          {studies &&
            studies.data.length > 0 &&
            studies.data.map((study) => <li key={study.id}>{study.name}</li>)}
        </ul>
      )}
    </div>
  );
};
export default TestStudyPage;
