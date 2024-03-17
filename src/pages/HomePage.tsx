import { useGetPaginatedUsersQuery } from "@/services/user";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { users, isLoading, isError, error, paginationState } = useGetPaginatedUsersQuery({
    page,
    limit,
  });

  const handleLimitChange = (newLimit: number) => {
    setSearchParams({ page: "1", limit: `${newLimit}` });
  };

  const handlePrevPage = () => {
    setSearchParams({ page: `${page - 1}`, limit: `${limit}` });
  };

  const handleNextPage = () => {
    setSearchParams({ page: `${page + 1}`, limit: `${limit}` });
  };

  return (
    <div>
      {isLoading && <span>loading</span>}
      {isError && <span>Error {error?.message}</span>}
      {users.length === 0 && <span>No user found</span>}
      {users.map((user) => (
        <div key={user.id}>
          <div>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <br />
          </div>
        </div>
      ))}
      <button onClick={handlePrevPage} disabled={!paginationState?.hasPrevPage}>
        prev
      </button>
      <input
        type="number"
        onChange={(e) => handleLimitChange(Number(e.target.value))}
        min={1}
        max={paginationState?.totalData}
      />
      <button onClick={handleNextPage} disabled={!paginationState?.hasNextPage}>
        next
      </button>
    </div>
  );
};
export default HomePage;
