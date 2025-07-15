import { getTableLink } from "@/lib/utils";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";

export default function QRCodeTable({
  token,
  tableNumber,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  width = 250,
}: {
  token: string;
  tableNumber: number;
  width?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;

    QRCode.toCanvas(
      canvas,
      getTableLink({
        token: token,
        tableNumber: tableNumber,
      }),
      function (error) {
        if (error) console.error(error);
        console.log("success!");
      }
    );
  }, [token, tableNumber]);
  return <canvas ref={canvasRef} />;
}
