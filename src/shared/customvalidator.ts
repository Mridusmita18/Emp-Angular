import { AbstractControl } from '@angular/forms';

export class CustomValidator{
    static emailDomain (domainName: string)
{
return (control: AbstractControl): { [key: string]: any } | null => {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1)
  if(domain.toLowerCase()===domainName.toLowerCase()|| email==='') return null;
  else return {'emailDomain': true}
}
}

static matchEmail(emailGroup : AbstractControl): {[key:string]: any} | null
{
const email=emailGroup.get('email');
const confirmEmail=emailGroup.get('ConfirmEmail');
if(email===confirmEmail || confirmEmail.pristine) return null;
else return {'matchEmail': true}
}
}