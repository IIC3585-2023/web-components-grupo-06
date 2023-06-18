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
      font-size: 24px;
    }

    .badly-rated {
      background-color: #F55D3E;
    }

    .well-rated { 
      background-color: #007EA7;
    }

    .rating {
      color: #F8D23A;
      font-size: 44px
    }

    .price-before {
      text-decoration: line-through;
      text-decoration-color: black;
    }
    
    .price-after {
      font-size: 44px;
      font-weight: bold;
    }

    .product-card { 
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      border: 3px solid #FFFFFF;
    }

    .product-info {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }

    .discount-box {
      font-size: 34px;
      font-weight: bold;
      border-radius: 20px;
      border: 5px solid #FFFFFF;
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
    this.image = 'https://via.placeholder.com/150';
    this.price = '29990';
  }
  
  cardTemplate(ratingTem, discountTem) { 
    const color = this.rating >= 5 ? 'well-rated' : 'badly-rated';
    const finalPrice = Math.round(+this.price - (+this.price * +this.discount / 100));
    const priceSection = html`
      ${this.discount > 0 ? html`
        <div class="product-info">
          <p class="price-before">$${this.price}</p>
          ${discountTem}
        </div>` : ''}
      <p class="price-after">$${finalPrice}</p>
    `;

    return html`
      <div class="product-card ${color}">
        <p>${this.name}</p>
        <div class="product-image">
          <img src="${this.image}" alt="${this.name}">
        </div>
        ${ratingTem}
        ${priceSection}
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

  discountTemplate() {
    return html`<p class="discount-box">${this.discount}%</p>`;
  }

  render() {
    return html`
      ${this.cardTemplate(this.ratingTemplate(), this.discountTemplate())}
    `;
  }
}

customElements.define('simple-component', SimpleComponent);