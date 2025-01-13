export class Client {
  clientId: number;
  contactPersonName: string;
  companyName: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  employeeStrenght: number;
  gstNo: string;
  contactNo: string;
  regNo: string;

  constructor() {
    this.clientId = 0;
    this.contactPersonName = '';
    this.companyName = '';
    this.address = '';
    this.city = '';
    this.contactNo = '';
    this.pincode = '';
    this.state = '';
    this.employeeStrenght = 0;
    this.gstNo = '';
    this.regNo = '';
  }

}
