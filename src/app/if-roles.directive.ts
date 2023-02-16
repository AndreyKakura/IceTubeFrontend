import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { AuthService } from "./service/auth.service";

@Directive({
  selector: '[ifRoles]'
})
export class IfRolesDirective implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  @Input() public ifRoles!: Array<string>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.roleChanges.subscribe((roles) => {
      this.updateView(roles);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateView(currentUserRoles: string[]) {
    const show = this.ifRoles.some(role => currentUserRoles.includes(role));
    this.viewContainerRef.clear();
    if (show) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
