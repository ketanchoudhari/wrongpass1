import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterMessageService {

  constructor(private toastr: ToastrService) { }
  showSuccess(data:any){
    this.toastr.success(data)
}

showError(data:any){
    this.toastr.error(data)
}

showInfo(data:any){
    this.toastr.info(data)
}

showWarning(data:any){
    this.toastr.warning(data)
}

}
