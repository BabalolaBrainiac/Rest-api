class Apierror {
  constructor(code, message) {
    (this.code = code), (this.message = message);
  }

  static badRequest(message) {
    return new Apierror(400, message);
  }

  static internal(message) {
    return new Apierror(500, message);
  }
  static notFound(message) {
    return new Apierror(404, message);
  }
}

module.exports = Apierror;
