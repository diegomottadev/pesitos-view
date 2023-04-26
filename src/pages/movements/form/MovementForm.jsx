

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../components/_pesitos/AppBreadcrumb';
import CaterogyService from '../../../services/categories/CaterogyService';
import ClasificationService from '../../../services/clasifications/ClasificationService';
import MovementService from '../../../services/movements/MovementService';
import PaymentMethodService from '../../../services/PaymentMethods/PaymentMethodService';

export const MovementForm = () => {
  const toast = useRef();
  const navigate = useNavigate();
  const { movementId } = useParams();


  const [clasifications, setClasifications] = useState(null)
  const [categories, setCategories] = useState(null)
  const [methodPayments, setMethodPayments] = useState(null)

  const [movement, setMovement] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [clasification, setClasification] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [category, setCategory] = useState(null);
  const [typeBill, setTypeBill] = useState(null);

  useEffect(() => {
    const fetchMovement = async () => {
      try {
        await MovementService.getMovement(movementId).then(({ data: { data: data } }) => {
          setMovement(data);
          setAmount(data.amount);
          setClasification(data.clasification.id);
          setPaymentMethod(data.waypay.id);
          setCategory(data.category.id);
          setDescription(data.description)
          setTypeBill(data.typebill?.id)
        });

      } catch (error) {
        console.error(error);
      }
    };

    if (movementId) {
      fetchMovement();
    }
  }, [movementId]);


  useEffect(() => {
    const fetchClasifications = async () => {
      try {
        const { data: response } = await ClasificationService.allClasifications();
        setClasifications(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchClasifications();

  }, []);



  useEffect(() => {
    const fetchMethodPayments = async () => {
      try {
        const { data: response } = await PaymentMethodService.allPaymentMethods();
        setMethodPayments(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchMethodPayments();

  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const params = { clasification_id: clasification }
      try {

        const { data: {data:clasificationResponse} }  = await ClasificationService.getClasification(clasification);
        setTypeBill(clasificationResponse.id);

        const { data: response } = await CaterogyService.allCategories(params);
        setCategories(response.data);

      } catch (error) {
        console.error(error);
      }
    };
    if (clasification) {
      fetchCategories();
    }


  }, [clasification]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!amount && !clasification && !category && !paymentMethod) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos obligatorios',
        life: 3000,
      });
      return;
    }

    const body = {
      amount: parseFloat(amount),
      description: description,
      category_id: category,
      paymentMethod_id: paymentMethod,
      clasification_id: clasification ,
      typebill_id: typeBill
    };

    try {
      let response;
      if (movement) {
        response = await MovementService.updateMovement(movement.id, body);
        toast.current.show({
          severity: 'success',
          summary: 'Exito',
          detail: `Movimiento actualizado`,
          life: 3000,
        });
      } else {
        response = await MovementService.createMovement(body);
        toast.current.show({
          severity: 'success',
          summary: 'Exito',
          detail: `Movimiento creado`,
          life: 3000,
        });
      }

    } catch (error) {
      console.error(error);
    }
  };

  const goBackPaymentMethodList = () => {
    navigate('/movements');
  };

  return (
    <div>
      {movementId ?
        <AppBreadcrumb meta={'Movimientos / Editar'} /> : <AppBreadcrumb meta={'Movimientos / Nuevo'} />}
      <div className="layout-content">

        <Toast ref={toast} onHide={() => navigate('/movements')} />
        <div className="grid">
          <div className="col-12">
            <div className="card">
              {/* user_id: user_id,
                    category_id: bill.category_id,
                    waypay_id: bill.waypay_id,
                    clasification_id: bill.clasification_id,
                    amount: bill.amount,
                    description: bill.description,
                    lastDate: new Date(), */}
              <h5>{movementId ? 'Editar movimiento' : 'Nuevo movimiento'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="card p-fluid">
                  <div className="field">
                    <label htmlFor="name">Monto</label>
                    <InputText
                      id="name"
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        const regex = /^\d{1,8}((\.|\,)\d{0,2})?$/; // Expresión regular para permitir cualquier cantidad con coma o punto y 2 decimales
                        const value = e.target.value;
                        if (regex.test(value)) {
                          setAmount(value);
                        }
                      }
                      }
                      maxLength="12"
                      pattern="\d{0,12}"
                      placeholder='0'
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="description">Descripción</label>
                    <InputTextarea
                      id="description"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className='field'>
                    <label htmlFor="typeBill">Transacción</label>
                    <Dropdown value={clasification} optionValue="id" onChange={(e) => setClasification(e.value)} options={clasifications} optionLabel="name" placeholder="-- Seleccionar tipo de movimiento --" />
                  </div>
                                
                  <div className='field'>
                    <label htmlFor="category">Categorias</label>
                    <Dropdown value={category} optionValue="id" onChange={(e) => setCategory(e.value)} options={categories} optionLabel="name" placeholder="-- Seleccionar categoría --" />
                  </div>
                  <div className='field'>
                    <label htmlFor="paymentMethod">Forma de pago</label>
                    <Dropdown value={paymentMethod} optionValue="id" onChange={(e) => setPaymentMethod(e.value)} options={methodPayments} optionLabel="name" placeholder="-- Seleccionar forma de pago --" />
                  </div>

                </div>

                <div className="flex justify-content-end mt-2">
                  <div className="p-d-flex">
                    <Button
                      label="Volver"
                      icon="pi pi-arrow-circle-left"
                      className="p-button-raised p-button-secondary mr-2 mb-2"
                      onClick={goBackPaymentMethodList}
                    />
                  </div>
                  <div className="p-d-flex">
                    <Button
                      type="submit"
                      label={movement ? 'Actualizar' : 'Guardar'}
                      icon="pi pi-save"
                      className="p-button-raised p-button-success"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementForm;
