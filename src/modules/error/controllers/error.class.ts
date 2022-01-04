class ErrorHandler {
  public async ErrorHandler(
    error: any | Error,
    FuncionError: string,
    GuardarError: boolean = false
  ): Promise<object> {
    if (error instanceof Error) {
      return await this.Crear(error.toString(), error.name, FuncionError);
    } else {
      error.Funcion = `${FuncionError} -> ${error.Funcion}`;
      if (GuardarError) {
      }
      return error;
    }
  }

  public async Crear(
    MensajeError: string,
    TipoError: string,
    FuncionError: string = "Error personalizado**."
  ): Promise<object> {
    return {
      error: true,
      Mensaje: MensajeError,
      Tipo: TipoError,
      Funcion: FuncionError,
    };
  }
}

const errorHandlerObject = new ErrorHandler();
export default errorHandlerObject;
