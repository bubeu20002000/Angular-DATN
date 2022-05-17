import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../_services/product.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  isLoggedIn: any;
  selected: any;
  id: any;
  details: any;
  prodname: any;
  sku: any;
  price: any;
  cate: any;
  img_one: any;
  img_two: any;
  description: any;
  color: any;
  status = false;
  instock: String[] = [];
  size: String[] = [];
  stock: any;
  constructor(private route: ActivatedRoute, private tokenStorageService: TokenStorageService, private router: Router, private prodService: ProductService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.getProdDetails();
  }

  getProdDetails() {
    this.prodService.getDetails(this.id).subscribe(res => {
      this.details = res;
      this.prodname = res['prodname'];
      this.sku = res['sku'];
      this.price = res['prodprice'];
      if (this.cate = res['categories']['catname'] == 'Men') {
        this.cate = 'Nam'
      } else {
        this.cate = 'Nữ'
      }
      if (res['prodimg1']) {
        this.img_one = 'assets/images/' + res['prodimg1'];
      }
      if (res['prodimg2']) {
        this.img_two = 'assets/images/' + res['prodimg2'];
      }
      this.description = res['proddescription'];
      this.color = res['prodcolor'];
      if (res['prodstatus'] == 0) {
        this.status = false
      } else {
        this.status = true
      }
      this.getSizes();
    })
  }

  getSizes() {
    this.prodService.getSizes(this.sku).subscribe(res => {
      Object.keys(res).forEach(r => {
        this.size.push(r)
        this.instock.push(res[r])
      })
    })
  }
  click(i: any) {
    this.selected = i;
    this.stock = this.instock[i];
  }

  isLogged() {
    if (this.isLoggedIn) {
      return Swal.fire({
        icon: 'info',
        title: 'Thông báo',
        text: 'Sản phẩm đã được thêm vào giỏ hàng.',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: 'black'
      })
    }
    else {
      return this.router.navigate(['/login']);

    }
  }

}
