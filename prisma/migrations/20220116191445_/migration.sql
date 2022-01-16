-- CreateTable
CREATE TABLE "errores" (
    "codigo" TEXT NOT NULL,
    "error" BOOLEAN NOT NULL,
    "funcion" TEXT NOT NULL,
    "reporte" TEXT NOT NULL,
    "solucion" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "errores_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "venta" (
    "codigo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "valor" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venta_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "pedido" (
    "codigo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "valor" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "cliente" (
    "cedula" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("cedula")
);
