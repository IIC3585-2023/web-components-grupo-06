import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class SimpleComponent extends LitElement {
  static properties = {
    rating: {},
    discount: {},
    name: {},
    image: {},
    price: {},
  };
  
  static styles = css`
    :host {
      font-family: Verdana, sans-serif;
      color: #000000;
    }

    .badly-rated {
      border: 7.5px solid #F55D3E;
    }

    .well-rated { 
      border: 7.5px solid #007EA7;
    }

    .product-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #FFFFFF;
      border-radius: 15px;
      padding: 10px;
      margin: 10px;
    }

    .product-name {
      font-weight: bold;
      text-align: center;
      padding: 10px;
      max-width: 20ch;
      height: 5em;
      font-size: 1.5rem;
    }

    .product-image {
      width: 15vmax;
      min-height: 15vmax;
      max-height: auto;
      margin: 10px;
      padding: 10px;
    }

    .product-image img {
      max-width: 100%;
      width: 20vw;
      height: 20vw;
    }

    .rating {
      color: #F8D23A;
      font-size: 2rem;
    }

    .price-before {
      text-decoration: line-through;
      text-decoration-color: black;
    }
    
    .price-after {
      font-weight: bold;
      font-size: 2.5rem;
    }

    .product-info {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
    }

    .discount-box {
      font-weight: bold;
      border-radius: 20px;
      border: 5px solid #000000;
      background-color: #F8D23A;
      padding: 5px;
      margin-left: 50px;
    }
  `;

  constructor() {
    super();
    this.rating = 7;
    this.discount = 0;
    this.name = 'Product Name';
    this.image = 'https://via.placeholder.com/250';
    this.price = '29990';
  }
  
  cardTemplate(ratingTem, priceTem) { 
    const color = this.rating >= 5 ? 'well-rated' : 'badly-rated';

    return html`
      <div class="product-card ${color}">
        <p class="product-name">${this.name}</p>
        <div class="product-image">
          <img src="${this.image}" alt="${this.name}">
        </div>
        ${ratingTem}
        ${priceTem}
      </div>
    `
  }

  ratingTemplate() {
    function makeStars(rating) {
      const stars = '★'.repeat(rating);
      const noStars = '☆'.repeat(10 - rating);
      return `${stars}${noStars}`;
    }
    return html`<p class="rating">${makeStars(this.rating)}</p>`;
  }

  priceTemplate() { 
    const finalPrice = Math.round(+this.price - (+this.price * +this.discount / 100));
    return html`
      ${this.discount > 0 ? html`
        <div class="product-info">
          <p class="price-before">$${this.price}</p>
          <p class="discount-box">${this.discount}%</p>
        </div>` : ''}
      <p class="price-after">$${finalPrice}</p>
    `;
  }

  render() {
    return html`
      ${this.cardTemplate(this.ratingTemplate(), this.priceTemplate())}
    `;
  }
}

customElements.define('simple-component', SimpleComponent);