"use client";

export function Search({ query }) {
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = formData.get("query")?.toString() ?? "";
    const response = await fetch(`/rsc?query=${newQuery}`);
    window.__updateTree?.(response.body);
  };

  return (
    <form onSubmit={handleSearch}>
      <input name="query" defaultValue={query} />
      <button type="submit">search</button>
    </form>
  );
}
