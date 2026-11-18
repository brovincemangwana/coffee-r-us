// Displays a single coffee. It only receives data through props,
// so it stays simple and easy to test.
function CoffeeCard({ coffee }) {
  const { name, description, origin, price } = coffee;

  return (
    <article className="coffee-card">
      <h2>{name}</h2>
      <p className="description">{description}</p>
      <p className="origin">{origin}</p>
      <p className="price">${Number(price).toFixed(2)}</p>
    </article>
  );
}

export default CoffeeCard;
