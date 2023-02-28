import {Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "./service/auth.service";

@Directive({
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  @Input() public ifAuthenticated!: boolean;


  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationChanged.subscribe((isAuthenticated) => {
      this.updateView(isAuthenticated);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateView(isAuthenticated: boolean) {
    const show = this.ifAuthenticated == isAuthenticated;

    this.viewContainerRef.clear();
    if (show) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
