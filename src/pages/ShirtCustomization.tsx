// src/components/ShirtCustomization.tsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, PanInfo } from "framer-motion";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/AddItemCart";

export interface PictureItem {
  id: number;
  url: string;
  top: number;
  left: number;
  x: number; // Added for x-coordinate
  y: number; // Added for y-coordinate
}

const ShirtCustomization: React.FC = () => {
  const { shirtType } = useParams<{ shirtType: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shirtContainerRef = useRef<HTMLDivElement>(null);
  const [nextId, setNextId] = useState<number>(1);
  const [board, setBoard] = useState<PictureItem | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedBoard = localStorage.getItem("board");
    if (savedBoard) {
      const parsedBoard: PictureItem | null = JSON.parse(savedBoard);
      setBoard(parsedBoard);
      setNextId(parsedBoard ? parsedBoard.id + 1 : 1);
    }
  }, []);

  useEffect(() => {
    if (board) {
      localStorage.setItem("board", JSON.stringify(board));
    }
  }, [board]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPicture: PictureItem = {
          id: nextId,
          url: e.target?.result as string,
          top: 40,
          left: 40,
          x: 0, // Default x-coordinate
          y: 0, // Default y-coordinate
        };
        setNextId(nextId + 1);
        setBoard(newPicture);
        event.target.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImg = () => {
    setBoard(null);
    localStorage.removeItem("board");
  };

  const handleAddToCart = () => {
    if (board) {
      const cartItem = {
        ...board,
        shirtType: shirtType || "white",
      };

      // Dispatch to Redux
      dispatch(addItemToCart(cartItem));

      // Save to localStorage as well
      const existingCart = localStorage.getItem("cart");
      const cart = existingCart ? JSON.parse(existingCart) : [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      setBoard(null);
      localStorage.removeItem("board");
    }
  };

  const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
    if (board) {
      const newBoard = {
        ...board,
        x: info.offset.x,
        y: info.offset.y,
      };
      setBoard(newBoard);
      localStorage.setItem("board", JSON.stringify(newBoard));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto w-full p-4">
      <h1 className="text-3xl sm:text-5xl font-semibold mb-4 pt-[100px] text-center">
        Customize Your {shirtType === "white" ? "White" : "Black"} Shirt
      </h1>
      <div className="relative w-full max-w-lg">
        <div ref={shirtContainerRef} className="relative w-full h-[500px]">
          <img
            src={
              shirtType === "white" ? "/T-shirt/aa.png" : "/T-shirt/a (1).png"
            }
            alt={`Selected ${shirtType} Shirt`}
            className=" object-contain lg:w-full h-full sm:object-cover"
          />
          {board && (
            <motion.img
              key={board.id}
              src={board.url}
              alt={`Uploaded ${board.id}`}
              style={{
                position: "absolute",
                top: `${board.top}%`,
                left: `${board.left}%`,
                width: "100px",
                height: "100px",
                transform: `translate(${board.x}px, ${board.y}px)`,
              }}
              drag
              dragConstraints={shirtContainerRef}
              whileDrag={{ cursor: "pointer" }}
              onDragEnd={handleDragEnd}
            />
          )}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-center col-span-full">
        <button
          onClick={triggerFileInput}
          className="px-4 py-2 text-sm md:text-base lg:text-lg bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Upload Image
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          aria-label="Upload image"
        />
        <button
          onClick={removeImg}
          className="px-4 py-2 text-sm md:text-base lg:text-lg bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Remove Image
        </button>
        <Link
          to={"/customDesignToCart"}
          onClick={handleAddToCart}
          className="px-4 py-2 text-sm md:text-base lg:text-lg bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
};

export default ShirtCustomization;
