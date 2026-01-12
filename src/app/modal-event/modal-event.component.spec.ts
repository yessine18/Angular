import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEventComponent } from './modal-event.component';

describe('ModalEventComponent', () => {
  let component: ModalEventComponent;
  let fixture: ComponentFixture<ModalEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEventComponent]
    });
    fixture = TestBed.createComponent(ModalEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
