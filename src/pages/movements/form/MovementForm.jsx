

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
import SubclasificationService from '../../../services/subclasifications/SubclasificationService';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import MoneyService from '../../../services/moneys/MoneyService';

export const MovementForm = () => {

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
  });

  const toast = useRef();
  const navigate = useNavigate();
  const { movementId } = useParams();


  const [clasifications, setClasifications] = useState(null)
  const [subclasifications, setSubclasifications] = useState(null);
  const [categories, setCategories] = useState(null)
  const [methodPayments, setMethodPayments] = useState(null)
  const [moneys, setMoneys] = useState(null)

  const [movement, setMovement] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [clasification, setClasification] = useState(null);
  const [subclasification, setSubclasification] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [category, setCategory] = useState(null);
  const [typeBill, setTypeBill] = useState(null);
  const [lastDate,setLastDate] = useState(new Date())
  const [money,setMoney] = useState(1)

  useEffect(() => {
    const fetchMovement = async () => {
      try {
        await MovementService.getMovement(movementId).then(({ data: { data: data } }) => {
          setMovement(data);
          setAmount(data.amount);
          setClasification(data.clasification?.id);
          setSubclasification(data.subclasification?.id);
          setPaymentMethod(data.waypay?.id);
          setCategory(data.category?.id);
          setDescription(data.description)
          setTypeBill(data.typebill?.id)
          setLastDate(new Date(data.lastDate));
          setMoney(data?.money_id)
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
    const fetchMoneys = async () => {
      try {
        const { data: response } = await MoneyService.allMoneys();
        setMoneys(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchMoneys();

  }, []);

  useEffect(() => {
    const fetchsubclasifcations = async () => {
      const params = { clasification_id: clasification }
      try {

        const { data: response } = await SubclasificationService.allSubclasifications(params);
        setSubclasifications(response.data);

      } catch (error) {
        console.error(error);
      }
    };
    if (clasification) {
      fetchsubclasifcations();
    }


  }, [clasification]);


  useEffect(() => {
    const fetchCategories = async () => {
      const params = { subclasification_id: subclasification }
      try {

        const { data: {data:clasificationResponse} }  = await ClasificationService.getClasification(clasification);
        setTypeBill(clasificationResponse.typebill_id);

        const { data: response } = await CaterogyService.allCategories(params);
        setCategories(response.data);

      } catch (error) {
        console.error(error);
      }
    };
    if (subclasification) {
      fetchCategories();
    }

  }, [subclasification]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!amount && !clasification && !subclasification && !category && !paymentMethod) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos obligatorios',
        life: 3000,
      });
      return;
    }

    const yearEnd = lastDate.getFullYear();
    const monthEnd = (lastDate.getMonth() + 1).toString().padStart(2, '0');
    const dayEnd = lastDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${yearEnd}-${monthEnd}-${dayEnd} 00:00:00`;

    const body = {
      amount: parseFloat(amount),
      description: description,
      category_id: category,
      paymentMethod_id: paymentMethod,
      clasification_id: clasification ,
      subclasification_id: subclasification ,
      lastDate: formattedDate,
      typebill_id: typeBill,
      money_id: money
    };

    try {
      if (movement) {
        await MovementService.updateMovement(movement.id, body);
        toast.current.show({
          severity: 'success',
          summary: 'Exito',
          detail: `Movimiento actualizado`,
          life: 3000,
        });
      } else {
        await MovementService.createMovement(body);
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
                    <label htmlFor="name">Fecha</label>
                    <Calendar value={lastDate} onChange={(e) => setLastDate(e.value)} showIcon  dateFormat="dd/mm/yy"  locale="es" />
                  </div>
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
                  <div className='field'>
                    <label htmlFor="money">Moneda</label>
                    <Dropdown value={money} optionValue="id" onChange={(e) => setMoney(e.value)} options={moneys} optionLabel="symbol" placeholder="-- Seleccionar moneda --" />
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
                    <label htmlFor="typeBill">Tipo</label>
                    <Dropdown value={clasification} optionValue="id" onChange={(e) => setClasification(e.value)} options={clasifications} optionLabel="name" placeholder="-- Seleccionar tipo de movimiento --" />
                  </div>
                  <div className='field'>
                    <label htmlFor="typeBill">Clasificación</label>
                    <Dropdown value={subclasification} optionValue="id" onChange={(e) => setSubclasification(e.value)} options={subclasifications} optionLabel="name" placeholder="-- Seleccionar clasificación --" />
                  </div>              
                  <div className='field'>
                    <label htmlFor="category">Categoría</label>
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
