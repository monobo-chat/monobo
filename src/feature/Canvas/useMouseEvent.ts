import { useRef } from "react";
import { Point2D } from "../common/type/point";

type Param = {
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}

type ReturnType = {
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: (e: React.MouseEvent) => void;
}

export default function useMouseEvent(param: Param): ReturnType {
  const { ctxRef } = param;

  let penGroundedRef = useRef(false);

  const getCanvasPositionFromClientPosition = (x: number, y: number): Point2D => {
    return {
      x: ~~(x + window.scrollX),
      y: ~~(y + window.scrollY)
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // 主ボタンのクリック時しか反応しない
    if(e.button === 0) {
      const position = getCanvasPositionFromClientPosition(e.clientX, e.clientY);
      // ペンを接地状態にする
      penGroundedRef.current = true;

      if(!ctxRef.current) return;
      console.log("Draw", position);
      ctxRef.current.lineWidth = 1;
      ctxRef.current.strokeStyle = "#000";
      // onStrokeStart(position.x, position.y, mouseForce);
      ctxRef.current.moveTo(position.x, position.y);
      ctxRef.current.beginPath();
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if(e.button === 0 && penGroundedRef.current) {
      const position = getCanvasPositionFromClientPosition(e.clientX, e.clientY);

      if(!ctxRef.current) return;
      console.log("move", position);
      ctxRef.current.lineTo(position.x, position.y);
      ctxRef.current.stroke();
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    // 主ボタンのクリック時しか反応しない
    if(e.button === 0) {
      const position = getCanvasPositionFromClientPosition(e.clientX, e.clientY);
      // ペンの接地状態を解除
      penGroundedRef.current = false;
      // onStrokeEnd(position.x, position.y, mouseForce);

      if(!ctxRef.current) return;
      ctxRef.current.stroke();
    }
  }

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
}
