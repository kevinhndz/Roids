class Users {
  constructor(datos) {
    this.id = datos.id;
    this.user = datos.user;
    this.password = datos.password;
    this.rol = datos.rol;
    this.name = datos.name;
    this.email = datos.email;
    this.phone_number = datos.phone_number;
  }
}

module.exports = { Users };
