import Service from "../axios.common";

export const GetAllOrders = async () => {
  try {
    const response = await Service.get(`/orders`);
    console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        message: "İşlem Başarılı",
        data: response.data,
      };
    }
    return {
      status: false,
      message: "İşlem Başarısız",
      data: [],
    };
  } catch (err) {
    const errorMessage = err.message;
    console.log(errorMessage);
    return {
      status: false,
      message: errorMessage,
      data: [],
    };
  }
};

export const GetOrdersByCustomerIdService = async (id) => {
  try {
    const response = await Service.get(
      `/orders/get_orders_by_customer_id/${id}`
    );
    console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        message: "İşlem Başarılı",
        data: response.data,
      };
    }
    return {
      status: false,
      message: "İşlem Başarısız",
      data: [],
    };
  } catch (err) {
    const errorMessage = err.message;
    console.log(errorMessage);
    return {
      status: false,
      message: errorMessage,
      data: [],
    };
  }
};

export const AddOrderService = async (payload) => {
  try {
    const response = await Service.post(`/orders/`, payload);
    console.log(response);
    if (response.status === 200) {
      return {
        status: true,
        message: "İşlem Başarılı",
        data: response.data,
      };
    }
    return {
      status: false,
      message: "İşlem Başarısız",
      data: [],
    };
  } catch (err) {
    const errorMessage = err.message;
    console.log(errorMessage);
    return {
      status: false,
      message: errorMessage,
      data: [],
    };
  }
};
