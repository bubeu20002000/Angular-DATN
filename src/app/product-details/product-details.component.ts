import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: any;
  details: any;
  prodname:any;
  sku:any;
  price:any;
  cate:any;
  constructor(private route: ActivatedRoute, private prodService: ProductService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProdDetails();
  }

  getProdDetails(){
    this.prodService.getDetails(this.id).subscribe(res=>{
      this.details=res;
      this.prodname=res['prodname'];
      this.sku = res['sku'];
      this.price = res['prodprice'];
      this.cate = res['categories']['catname'];
    
    })
  }

}
