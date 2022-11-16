import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  searchMethod(txt: string) {
    txt = txt.trim();
    if (txt.length == 0) {
      return;
    } else {
      this.router.navigateByUrl(`/search/${txt}`);
    }
  }
}
