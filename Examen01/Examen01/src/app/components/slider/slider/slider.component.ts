import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  assets = [
    {
      title: "Adiestramiento canino",
      description: "Convierte a tu perro en un cachorro sociable y emocionalmente estable",
      imgUrl: "https://crehana-public.imgix.net/images/banners/top/69e0e33c/adiestramiento-canino.jpg?w=1560&h=304&fit=crop&auto=format&q=60"
    },
    {
      title: "El arte de preparar pizzas",
      description: "Aprende cómo conseguir la masa perfecta para cada tipo de pizza.",
      imgUrl: "https://crehana-public.imgix.net/images/banners/top/8e0e8dcc/el-arte-de-preparar-pizzas.jpg?w=1560&h=304&fit=crop&auto=format&q=60"
    },
    {
      title: "Sé un streamer de éxito en Twitch",
      description: "Y optimiza tus livestreams con los tips de Alkapone.",
      imgUrl: "https://crehana-public.imgix.net/images/banners/top/98bffc6e/se-un-streamer-de-exito-en-twitch.jpg?w=1560&h=304&fit=crop&auto=format&q=60"
    }
  ]

  currentAssetIndex = 0;

  setCurrentImage() {
    setInterval(() => {
      if (this.currentAssetIndex == this.assets.length - 1)
        this.currentAssetIndex = 0;
      else
        this.currentAssetIndex ++;
    },3000);
  }

  constructor() { }

  ngOnInit(): void {
    this.setCurrentImage();
  }

}
