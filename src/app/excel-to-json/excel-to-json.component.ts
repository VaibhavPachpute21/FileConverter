import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-excel-to-json',
  templateUrl: './excel-to-json.component.html',
  styleUrls: ['./excel-to-json.component.css']
})
export class ExcelToJsonComponent implements OnInit {
  convertedJsonData!: String;
  constructor() { }

  ngOnInit(): void {
  }
  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
     const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data);
        this.convertedJsonData = JSON.stringify(data, undefined, 4);
      })
    }
 
  }
}
