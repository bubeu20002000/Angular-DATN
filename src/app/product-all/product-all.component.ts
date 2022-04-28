import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product.model';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {
  products: Product[] = [];
  currentProduct: Product = {};
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 6;
  pageSizes = [3, 6, 9];

  showEmpty = false;

  constructor(private prodService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};
    if (searchTitle) {
      params[`title`] = searchTitle;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  retrieveProducts(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.prodService.getAll(params)
      .subscribe(
        response => {
          const { products, totalItems } = response;
          this.products = products;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });
    
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveProducts();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProducts();
  }
  refreshList(): void {
    this.title = '';
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }
  setActiveProducts(tutorial: Product, index: number): void {
    this.currentProduct = tutorial;
    this.currentIndex = index;
  }
  searchTitle(): void {
    this.page = 1;
    this.retrieveProducts();
    if (this.count == 0) {
      this.showEmpty = false;
    } else {
      this.showEmpty = true;
    }
    console.log(this.showEmpty)
  }
}
