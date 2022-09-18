import { Component, OnInit } from '@angular/core';
import { RestService } from './Services/rest.service';
import { Weather } from './Weather';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularFlask';

  fileName= 'ExcelSheet.xlsx';
  constructor(private rs : RestService){}

  headers = ["day","temperature", "windspeed",  "event"]

  weather : Weather[] = [];

  ngOnInit()
  {
      this.rs.readWeather("test")
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

  clickme(username : string){
    this.rs.readWeather(username)
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

  exportexcel(): void
  {
    /* pass here the table id */
    console.log("in exporting");
    let element = document.getElementById('weather');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
    console.log("done saving");
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
