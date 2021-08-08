import { Component, OnInit } from '@angular/core';
import { RestService } from './Services/rest.service';
import { Weather } from './Weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularFlask';

  constructor(private rs : RestService){}

  headers = ["day","temperature", "windspeed",  "event"]

  weather : Weather[] = [];

  ngOnInit()
  {
      this.rs.readWeather()
      .subscribe
        (
          (response) => 
          {
            this.weather = response[0]["data"];
          },
          (error) =>
          {
            console.log("No Data Found" + error);
          }

        )
  }

  // readData()
  // {
  //   this.rs.readFile()
  //   .subscribe
  //       (
  //         (response) => 
  //         {
  //           this.weather = response[0]["data"];
  //         },
  //         (error) =>
  //         {
  //           console.log("File doesn't exist..." + error);
  //         }

  //       )
  // }

}
