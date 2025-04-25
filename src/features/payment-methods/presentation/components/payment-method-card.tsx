import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PaymentMethod,
  PAYMENT_METHOD_TYPES,
} from "../../interfaces/payment-methods.interface";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
}

export function PaymentMethodCard({
  paymentMethod,
  onDelete,
  isDeleting = false,
}: PaymentMethodCardProps) {
  const typeLabel =
    PAYMENT_METHOD_TYPES.find((type) => type.value === paymentMethod.type)
      ?.label || paymentMethod.type;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{paymentMethod.name}</CardTitle>

            <CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{typeLabel}</Badge>
              </div>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {paymentMethod.last_four_digits && (
            <p className="text-sm text-muted-foreground">
              Últimos 4 dígitos:{" "}
              <span className="font-semibold">
                {paymentMethod.last_four_digits}
              </span>
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href={`/management/payment-methods/edit/${paymentMethod.id}`}
          passHref
        >
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
        {onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(paymentMethod.id)}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
