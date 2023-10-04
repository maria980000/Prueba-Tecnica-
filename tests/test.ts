// test.ts

import { createToken, getToken } from './controllers/paymentController';

// Prueba para la creación de un token válido
test('Crea un token válido', async () => {
  const req = {
    body: {
      card_number: 'ValidCardNumber',
      cvv: '123',
      expiration_month: '01',
      expiration_year: '2025',
      email: 'correo@gmail.com',
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  await createToken(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: 'Token creado con éxito' });
});

// Prueba para obtener datos de tarjeta válidos
test('Obtiene datos de tarjeta válidos', async () => {
  const req = {
    params: {
      token: 'ValidToken',
    },
  };

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  await getToken(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  // Asegúrate de ajustar este resultado según lo que retorne tu función getToken
  expect(res.json).toHaveBeenCalledWith({ /* Datos de tarjeta válidos */ });
});
