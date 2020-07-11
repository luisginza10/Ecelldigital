import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  carouselOptions =
    {
      center: true,
      animateOut: 'bounceOutRight',
      animateIn: 'bounceInLeft',
      items: 1,
      dots: true,
      navigation: false,
      loop: true,
      margin: 10,
      autoplay: true,
    //  animateOut: 'fadeOut',
      autoHeight: true,
      autoHeightClass: 'owl-height',
  };
  images = [
    {src: 'https://www.consurshop.com/images/product/81xl8Klf-kL._AC_SL1500_.jpg'},
    {src: 'https://s23527.pcdn.co/wp-content/uploads/2018/09/gopro-her-7.jpg.optimal.jpg'},
    {src: 'https://i.ytimg.com/vi/o53Q4H8M61g/maxresdefault.jpg'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
