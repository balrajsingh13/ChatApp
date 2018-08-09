import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwigioComponent } from './twigio.component';

describe('TwigioComponent', () => {
  let component: TwigioComponent;
  let fixture: ComponentFixture<TwigioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwigioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwigioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
