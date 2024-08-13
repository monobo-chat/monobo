"use client";

import React, { useEffect, useRef } from "react";
import { Point2D } from "../common/type/point";
import useMouseEvent from "./useMouseEvent";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useMouseEvent({ ctxRef });

  useEffect(() => {
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctxRef.current = ctx;
    }
  }, [])

  return (
    <canvas ref={canvasRef} width="2048" height="2048"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
