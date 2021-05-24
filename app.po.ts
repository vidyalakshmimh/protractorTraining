import {browser, element, by} from 'protractor';
export class LoginPage {
 get signin() {
    return element(by.xpath("//*[@id='nav-link-accountList-nav-line-1']"));
 }
 get email() {
   return element(by.xpath("//input[@name = 'email']"));
 }

 get emailContinue() {
     return element(by.xpath("//input[@id = 'continue']"));
 }

 get password() {
   return element(by.xpath("//input[@id='ap_password']"));
 }

 get submit() {
   return element(by.xpath("//input[@id = 'signInSubmit']"));
 }

};