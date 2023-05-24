export interface OrderKeys {
	/** @description Order ID */
	OrderID: int;
}

export interface OrderItemKeys {
	/** @description Order ID */
	OrderID: int;
	/** @description Product ID */
	ProductID: string;
}

export interface OrderItemCompoundKeys {
	/** @description Order ID */
	OrderID: int;
	/** @description Product ID */
	ProductID: string;
	/** @description Compound ID */
	CompoundID: string;
}

export interface ProductKeys {
	/** @description Product ID */
	ProductID: string;
}

export interface ProductCompoundKeys {
	/** @description Product ID */
	ProductID: string;
	/** @description Compound ID */
	CompoundID: string;
}

export interface Order extends OrderKeys {
	/** @description Created at */
	CreatedAt: Date;
	/** @description Status */
	State: string;
	/** @description Description */
	Description: string;
	/** @description Vendor */
	Vendor: string;
	OrderItems?: { results: OrderItem[] };
}

export interface OrderItem extends OrderItemKeys {
	/** @description Created at */
	CreatedAt: Date;
	/** @description Updated at */
	UpdatedAt: Date;
	/** @description Status */
	State: string;
	/** @description Quantity */
	Quantity: string;
	Product?: Product;
	OrderItemCompounds?: { results: OrderItemCompound[] };
}

export interface OrderItemCompound extends OrderItemCompoundKeys {
	/** @description Quantity */
	Quantity: string;
	Compound?: ProductCompound;
}

export interface Product extends ProductKeys {
	/** @description Product name */
	ProductName: string;
	/** @description Unit */
	Unit: string;
	/** @description Price */
	Price: string;
	/** @description Currency */
	Currency: string;
	ProductCompounds?: { results: ProductCompound[] };
}

export interface ProductCompound extends ProductCompoundKeys {
	/** @description Compound name */
	CompoundName: string;
	/** @description Price */
	Price: string;
	/** @description Currency */
	Currency: string;
	/** @description Unit */
	Unit: string;
	
}

export type EntitySets = {
	"Orders": {
		keys: OrderKeys;
		type: Order;
		typeName: "Order";
		navigations: {
			"OrderItems": {
				type: OrderItem[]
			};
		};
	};
	"OrderItems": {
		keys: OrderItemKeys;
		type: OrderItem;
		typeName: "OrderItem";
		navigations: {
			"Product": {
				type: Product
			};
			"OrderItemCompounds": {
				type: OrderItemCompound[]
			};
		};
	};
	"OrderItemCompounds": {
		keys: OrderItemCompoundKeys;
		type: OrderItemCompound;
		typeName: "OrderItemCompound";
		navigations: {
			"Compound": {
				type: ProductCompound
			};
		};
	};
	"Products": {
		keys: ProductKeys;
		type: Product;
		typeName: "Product";
		navigations: {
			"ProductCompounds": {
				type: ProductCompound[]
			};
		};
	};
	"ProductCompounds": {
		keys: ProductCompoundKeys;
		type: ProductCompound;
		typeName: "ProductCompound";
		navigations: {

		};
	};
};