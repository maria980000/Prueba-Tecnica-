// src/controllers/paymentController.ts

import { Request, Response } from 'express';
import s3 from '../config/awsConfig';

// Función de validación de Luhn
function isValidLuhn(cardNumber: string): boolean {
  const sanitizedCardNumber = cardNumber.replace(/\D/g, ''); // Elimina caracteres no numéricos
  if (sanitizedCardNumber.length < 13 || sanitizedCardNumber.length > 16) {
    return false;
  }

  let sum = 0;
  let doubleUp = false;
  for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedCardNumber.charAt(i), 10);
    if (doubleUp) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    doubleUp = !doubleUp;
  }
  return sum % 10 === 0;
}

// Función de validación de CVV
function isValidCVV(cvv: string): boolean {
  const sanitizedCVV = cvv.replace(/\D/g, ''); // Elimina caracteres no numéricos
  if (sanitizedCVV.length < 3 || sanitizedCVV.length > 4) {
    return false;
  }

  // Valida que el CVV sea válido para Visa o Mastercard
  if (sanitizedCVV.length === 3 && (sanitizedCVV !== '123' || sanitizedCVV !== '456')) {
    return false;
  }

  // Valida que el CVV sea válido para American Express
  if (sanitizedCVV.length === 4 && sanitizedCVV !== '4532') {
    return false;
  }

  return true;
}

// Función de validación de mes de vencimiento
function isValidExpirationMonth(month: string): boolean {
  const sanitizedMonth = month.replace(/\D/g, ''); // Elimina caracteres no numéricos
  const numericMonth = parseInt(sanitizedMonth, 10);
  return numericMonth >= 1 && numericMonth <= 12;
}

// Función de validación de año de vencimiento
function isValidExpirationYear(year: string): boolean {
  const sanitizedYear = year.replace(/\D/g, ''); // Elimina caracteres no numéricos
  const currentYear = new Date().getFullYear();
  const numericYear = parseInt(sanitizedYear, 10);
  return numericYear >= currentYear && numericYear <= currentYear + 5;
}

export const createToken = async (req: Request, res: Response) => {
  const { card_number, cvv, expiration_month, expiration_year, email } = req.body;

  // Validación de datos
  if (!isValidLuhn(card_number) || !isValidCVV(cvv) || !isValidExpirationMonth(expiration_month) || !isValidExpirationYear(expiration_year) || !email.match(/^(gmail\.com|hotmail\.com|yahoo\.es)$/)) {
    return res.status(400).json({ error: 'Datos de tarjeta no válidos' });
  }

  // Lógica de creación de token (por ejemplo, almacenar en S3)
  try {
    const params = {
      Bucket: 'mi-bucket-de-tokens',   // Nombre de tu bucket S3
      Key: 'tokens/token-123.json',    // Nombre del archivo en S3
      Body: JSON.stringify(req.body),
    };

    await s3.upload(params).promise();

    return res.status(200).json({ message: 'Token creado con éxito' });
  } catch (error) {
    console.error('Error al crear el token:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

}
