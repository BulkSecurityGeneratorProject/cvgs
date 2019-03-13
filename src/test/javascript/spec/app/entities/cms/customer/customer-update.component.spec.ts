/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CvgsTestModule } from '../../../../test.module';
import { CustomerUpdateComponent } from 'app/entities/cms/customer/customer-update.component';
import { CustomerService } from 'app/entities/cms/customer/customer.service';
import { Customer } from 'app/shared/model/cms/customer.model';

describe('Component Tests', () => {
    describe('Customer Management Update Component', () => {
        let comp: CustomerUpdateComponent;
        let fixture: ComponentFixture<CustomerUpdateComponent>;
        let service: CustomerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CvgsTestModule],
                declarations: [CustomerUpdateComponent]
            })
                .overrideTemplate(CustomerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Customer(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.customer = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Customer();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.customer = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
