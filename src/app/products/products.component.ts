import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { AuthenticationService } from '../services/authentication-service.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList : Array<Product> = [];
  public product : Product;
  public dataSource = new MatTableDataSource<Product>(this.productList);
  edit:boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    {
      columnDef: 'Product Id',
      header: 'Product Id',
      cell: (element: Product) => `${element.productId}`
    },
    {
      columnDef: 'productName',
      header: 'Product Name',
      cell: (element: Product) => `${element.productName}`
    },
    {
      columnDef: 'productCategory',
      header: 'Product Category',
      cell: (element: Product) => `${element.productCategory}`
    },
    {
      columnDef: 'productDescription',
      header: 'Product Description',
      cell: (element: Product) => `${element.productDescription}`
    },
    {
      columnDef: 'units',
      header: 'Product Units',
      cell: (element: Product) => `${element.units}`
    }
  ];
  columnsToDisplay = this.columns.map(c => c.columnDef);

  constructor(private productService:ProductsService, public dialog: MatDialog,
    private authenticationService: AuthenticationService,private router: Router) {
    console.log(this.columnsToDisplay);
    this.columnsToDisplay.push("Actions");
   }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.getAllProduct();
    // this.productList.forEach(x=>{
    //   this.dataSource.push(x);
    // });
    // console.log(this.dataSource);
    this.dataSource.data = this.productList;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllProduct(){
    this.productList = [];
    console.log("all----"+this.productList);
    this.productService.getAllProduct().subscribe(
      data =>{
        data.forEach(x =>{
          this.productList.push(x);
        });
        // console.log(this.productList);
        this.dataSource.data = this.productList;
      }
    );
  }

  applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '300px';
        dialogConfig.data = {
          id: 1,
          title: 'Add New Product'
      };

        // this.dialog.open(AddProductComponent, dialogConfig);
        const dialogRef = this.dialog.open(AddProductComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {
              console.log("Dialog output:", data);
              this.product = data;
              console.log(this.product);
             if(data!=undefined){
              this.productService.saveProducts(this.product).subscribe(
                data => {
                  console.log(data);
                  this.productList.push(data);
                  this.dataSource.data = this.productList;
                }
              );
             }
            }
        );
        // dialogRef.close();
  }

  deleteProduct(productId:String){
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.productService.deleteProducts(productId).subscribe(data =>{
          console.log(data);
          this.ngOnInit();
        });

      }
    });
  }

  editProduct(editProduct:Product){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      id: 1,
      product: editProduct
  };

    // this.dialog.open(AddProductComponent, dialogConfig);
    const dialogRef = this.dialog.open(EditProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          console.log("Dialog output:", data);
          this.product = data;
          console.log(this.product);
         if(data!=undefined){
          this.productService.updateProducts(this.product).subscribe(
            data => {
              console.log(data);
              this.ngOnInit();
            }
          );
         }
        }
    );

  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
