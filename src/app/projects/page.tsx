async function getData() {
  const res = await fetch('https://api.github.com/users/iposho/repos');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Projects() {
  const data = await getData();

  return (
    <>
      <h1>Проекты</h1>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
