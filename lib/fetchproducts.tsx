export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products")
  return res
}