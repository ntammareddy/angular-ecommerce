import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product(); //initiate to avoid race condition on view. 
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.handleProductDetails());
  }

  handleProductDetails() {
    const productId: number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(productId).subscribe(
      data => { this.product = data });
  }

}
