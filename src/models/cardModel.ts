// src/models/cardModel.ts

import mongoose, { Schema, Document } from 'mongoose';

interface ICard extends Document {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
  token: string;
}

const CardSchema: Schema = new Schema({
  card_number: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        // Validación de longitud (entre 13 y 16 caracteres)
        const isValidLength = value.length >= 13 && value.length <= 16;
        
        // Validación con algoritmo de LUHN
        const isValidLuhn = (cardNumber: string) => {
          // Implementa aquí el algoritmo de LUHN
          // Devuelve true si es válido, false si no lo es
        };
        
        return isValidLength && isValidLuhn(value);
      },
      message: 'Número de tarjeta no válido'
    }
  },
  cvv: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        // Validación de longitud (3 o 4 caracteres)
        const isValidLength = value.length === 3 || value.length === 4;
        
        // Validación de CVV para Visa/Mastercard (123) o Amex (4532)
        const isValidVisaMastercard = value === '123';
        const isValidAmex = value === '4532';
        
        return isValidLength && (isValidVisaMastercard || isValidAmex);
      },
      message: 'CVV no válido'
    }
  },
  expiration_month: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        // Validación de longitud (1 o 2 caracteres)
        const isValidLength = value.length === 1 || value.length === 2;
        
        // Validación de rango (1 a 12)
        const numericValue = parseInt(value, 10);
        const isValidRange = numericValue >= 1 && numericValue <= 12;
        
        return isValidLength && isValidRange;
      },
      message: 'Mes de vencimiento no válido'
    }
  },
  expiration_year: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        // Validación de longitud (4 caracteres)
        const isValidLength = value.length === 4;
        
        // Validación de año máximo (5 años en el futuro)
        const currentYear = new Date().getFullYear();
        const numericValue = parseInt(value, 10);
        const isValidYear = numericValue >= currentYear && numericValue <= currentYear + 5;
        
        return isValidLength && isValidYear;
      },
      message: 'Año de vencimiento no es válido'
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        // Validación de longitud (entre 5 y 100 caracteres)
        const isValidLength = value.length >= 5 && value.length <= 100;
        
        // Validación de dominios de correo electrónico permitidos
        const validEmailDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];
        const domain = value.split('@')[1];
        const isValidDomain = validEmailDomains.includes(domain);
        
        return isValidLength && isValidDomain;
      },
      message: 'Correo electrónico no  es válido'
    }
  },
  token: { type: String, required: true },
});

const CardModel = mongoose.model<ICard>('Card', CardSchema);

export default CardModel;
