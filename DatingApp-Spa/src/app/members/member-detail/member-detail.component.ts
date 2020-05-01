import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../_services/alertify.services';
import { UserService } from '../../_services/user.services ';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  user: User; 

  constructor(private http: HttpClient,
    private alertify: AlertifyService, private userservice: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent:100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }]
    this.galleryImages = this.getImages();
     
  }


  getImages() {
    const imageUrls = [];
    for (var photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description:photo.description
      })
    }
    return imageUrls;
  }



  //loadUser() {
  //  this.userservice.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
  //    this.user = user
  //  }, error => { this.alertify.error(error) });
  //}
}
