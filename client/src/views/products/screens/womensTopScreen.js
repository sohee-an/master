import Rating from "../components/Rating.js";

const womensTopScreen = {
  render: async () => {
    //fetch를 이용해서 벡엔드 데이터 가져오기
    const response = await fetch("/api/products?lc=women&mc=top")
    if (!response || !response.ok) {
      return `<div>Error in getting data</div>`
    }
    const products = await response.json();

    return `

    <ul class="products">
      ${products
        .map(
          (product) => `
        <li>
          <div class="product">
          <div class="product-image">
            <a href="#/product/${product._id}">
              <img src="/uploads/${product.image}" alt="${product.name}">
            </a>
          </div>
          <div class="product-name">
            <a href="#/product/${product._id}">
              ${product.name}
            </a>
          </div>
          <div class="product-rating">
          ${Rating.render({
            value: product.ratingAvg,
            text: `${product.reviewTotal} reviews`,
          })}
          </div>
          <div class="product-subtitle">
            <div class="product-brand">
              ${product.brand}
            </div>
            <div class="product-price">
              ${product.price} 원
            </div>
          </div>
        </div>
        </li>
        `
        )
        .join('\n')
      }
    </ul>
    `
  }
}

export default womensTopScreen;