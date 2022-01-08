-- CreateTable
CREATE TABLE "producto" (
    "id" TEXT NOT NULL,
    "nombre_producto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "registro_invima" TEXT NOT NULL,
    "fechafabricacion" TIMESTAMP(3) NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
    "lote" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);
