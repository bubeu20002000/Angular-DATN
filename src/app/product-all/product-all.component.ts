import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product.model';
import { range } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
  size = '';
  type = '';
  cate = '';
  sort = '';
  page = 1;
  count = 0;
  pageSize = 6;
  pageSizes = [3, 6, 9];

  numbers: string[] = [];
  selected: any;

  info: any;
  aval_size: any;

  toppings: FormGroup;
  men:any;
  women:any;
  unisex:any;

  constructor(private prodService: ProductService, private fb: FormBuilder) {
    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false,
    });
  }

  ngOnInit(): void {
    this.numbers = this.rangeofSize(38, 49);
    this.retrieveProducts();
    this.getInfo();

    
  }

  getInfo() {
    this.prodService.getInfo().subscribe(res => {
      this.info = res;
      this.aval_size = this.info.map(function (a: any) { return a["prodsize"]; });
    })
  }

  retrieveProducts(): void {
    const field = {
      "prodName": this.title,
      "prodType": this.type,
      "prodSize": this.size,
      "catName": this.cate,
      "sort": this.sort
    };
    this.prodService.getAll(this.page - 1, this.pageSize, field)
      .subscribe(
        response => {
          if (response) {
            let prods = response['products'];
            let totalItems = response['totalItems'];
            this.products = prods;
            this.count = totalItems;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Thông báo',
              text: 'Hàng bạn tìm không tồn tại',
              confirmButtonText: 'Xác nhận',
              confirmButtonColor: 'black'
            })
            this.title = '';
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Đã xảy ra lỗi',
            text: 'error',
          })
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
    this.sort = '';
    this.size = '';
    this.selected = null;
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }
  setActiveProducts(tutorial: Product, index: number): void {
    this.currentProduct = tutorial;
    this.currentIndex = index;
  }
  searchTitle() {
    this.page = 1;
    this.retrieveProducts();
  }

  onButtonGroupClick($event: any) {
    let clickedElement = $event.target || $event.srcElement;
    if (clickedElement.nodeName === "BUTTON") {
      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove("active");
      }
      clickedElement.className += " active";
    }
  }

  getProdsAsc() {
    this.sort = 'asc';
    this.retrieveProducts();
  }

  getProdsDesc() {
    this.sort = 'desc';
    this.retrieveProducts();
  }

  rangeofSize(j: number, k: number) {
    return Array
      .apply(null, Array((k - j) + 1))
      .map(function (_, n) { return String(n + j); });
  }

  click(i: any, n: any) {
    this.selected = i;
    let stringN = n.toString();
    this.size = stringN;
    this.retrieveProducts();
  }

  changeS(cb: MatCheckboxChange){
    if(this.toppings.get('pepperoni')){
      this.men = true;
    }
    if(this.toppings.get('extracheese')){
      this.women = true;
    }
    if(this.toppings.get('mushroom')){
      this.unisex = true;
    }
  }
}
