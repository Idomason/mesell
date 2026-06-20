import { AppError } from "@/middleware/errorHandler";
import { Cart } from "@/models/CartModel";
import { catchAsync } from "@/utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const calculateTotals = (items: any[], coupon: any) => {
  const subtotal = items.reduce(
    (acc, item) => acc + (item.unitPrice ?? item.price ?? 0) * item.quantity,
    0,
  );
  const discount = coupon?.discountAmount ?? 0;
  return { subtotal, total: Math.max(subtotal - discount, 0) };
};

export const getCartItems = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return next(new AppError("Item found in the cart", 404));
    }
    res.status(200).json({
      status: "success",
      data: cart ?? { items: [], subtotal: 0, total: 0, currency: "NGN" },
    });
  },
);

export const createCartItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { items, coupon } = req.body;

    if (!Array.isArray(items)) {
      return next(new AppError("Cart items must be an array", 400));
    }

    const normalizedItems = items.map((item: any) => ({
      productId: item.productId || item.product || item.id || item._id,
      sku: item.sku,
      quantity: item.quantity,
      priceAtAdd: item.priceAtAdd ?? item.price ?? 0,
      images: item.images,
      heading: item.heading,
      color: item.color,
      size: item.size,
      price: item.price,
      name: item.name,
      description: item.description,
      totalSold: item.totalSold,
      isLive: item.isLive,
      seller: item.seller,
      category: item.category,
    }));

    const totals = calculateTotals(normalizedItems, coupon);

    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        items: normalizedItems,
        coupon,
        subtotal: totals.subtotal,
        total: totals.total,
        currency: "NGN",
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    res.status(200).json({ status: "success", data: cart });
  },
);

export const mergeCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return next(new AppError("Cart items must be an array", 400));
    }

    const cart = await Cart.findOne({ userId });
    const existingItems = cart?.items ?? [];
    const mergedItems = [...existingItems];

    for (const item of items) {
      const productId = item.productId || item.id || item._id;
      const existingIndex = mergedItems.findIndex(
        (cartItem: any) =>
          cartItem.productId?.toString() === productId?.toString(),
      );

      if (existingIndex >= 0) {
        mergedItems[existingIndex].quantity += item.quantity;
        mergedItems[existingIndex].priceAtAdd =
          mergedItems[existingIndex].priceAtAdd ??
          item.priceAtAdd ??
          item.price ??
          0;
      } else {
        mergedItems.push({
          productId,
          sku: item.sku,
          quantity: item.quantity,
          priceAtAdd: item.priceAtAdd ?? item.price ?? 0,
          images: item.images,
          heading: item.heading,
          color: item.color,
          size: item.size,
          price: item.price,
          name: item.name,
          description: item.description,
          totalSold: item.totalSold,
          isLive: item.isLive,
          seller: item.seller,
          category: item.category,
        });
      }
    }

    const totals = calculateTotals(mergedItems, cart?.coupon);

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      {
        items: mergedItems,
        subtotal: totals.subtotal,
        total: totals.total,
        currency: "NGN",
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    res.status(200).json({ status: "success", data: { updatedCart } });
  },
);

export const updateCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    const cartItems = !Array.isArray(req.body) ? [req.body] : req.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      { userId },
      { cartItems },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
  },
);

export const deleteCartItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const itemId = req.params.itemId;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    cart.items = cart.items.filter(
      (item: any) =>
        item._id.toString() !== itemId && item.productId?.toString() !== itemId,
    );

    const totals = calculateTotals(cart.items, cart.coupon);
    cart.subtotal = totals.subtotal;
    cart.total = totals.total;

    await cart.save();

    res.status(200).json({ status: "success", data: cart });
  },
);
