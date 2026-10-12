const Revisar_JSON_Crear_User = {
  type: 'object',
  required: ['user', 'password', 'name', 'email'],
  properties: {
    user: { type: 'string', minLength: 5, maxLength: 18 },
    password: { type: 'string', minLength: 6, maxLength: 25 },
    rol: { type: 'string', default: 'user' },
    name: { type: 'string', minLength: 3, maxLength: 25 },
    email: { type: 'string', format: 'email' },
    phone_number: { type: ['string', 'null'], default: null }
  }
};

const Revisar_JSON_Editar_User = {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: { type: 'string', minLength: 3, maxLength: 25 },
    email: { type: 'string', format: 'email' },
    phone_number: { type: ['string', 'null'] }
  }
};

const Revisar_JSON_Login = {
  type: 'object',
  required: ['user', 'password'],
  properties: {
    user: { type: 'string', minLength: 5, maxLength: 18 },
    password: { type: 'string', minLength: 6, maxLength: 25 }
  }
};

export {
  Revisar_JSON_Crear_User,
  Revisar_JSON_Editar_User,
  Revisar_JSON_Login
};
